import os
import shutil
import tempfile
from io import BytesIO
from pathlib import Path
from unittest.mock import patch, MagicMock
from zipfile import ZipFile

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from django.urls import reverse
from PIL import Image

from image_parroter.celery import celery_app
from thumbnailer.tasks import make_thumbnails

MEDIA_ROOT = Path(tempfile.mkdtemp())
IMAGES_DIR = MEDIA_ROOT / "images"


def make_image_bytes(size=(300, 200)):
    buffer = BytesIO()
    Image.new("RGB", size, "red").save(buffer, "PNG")
    return buffer.getvalue()


@override_settings(MEDIA_ROOT=MEDIA_ROOT, IMAGES_DIR=IMAGES_DIR)
class TestThumbnailer(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        # run tasks inline so tests need no Redis or worker
        celery_app.conf.task_always_eager = True

    @classmethod
    def tearDownClass(cls):
        celery_app.conf.task_always_eager = False
        shutil.rmtree(MEDIA_ROOT, ignore_errors=True)
        super().tearDownClass()

    def setUp(self):
        IMAGES_DIR.mkdir(parents=True, exist_ok=True)

    def test_makeThumbnails_shouldZipOriginalAndResizedCopy(self):
        file_path = IMAGES_DIR / "parrot.png"
        file_path.write_bytes(make_image_bytes())

        results = make_thumbnails(str(file_path), [(128, 128)])

        self.assertEqual("/media/images/parrot.zip", results["archive_path"])
        self.assertFalse(file_path.exists())
        with ZipFile(IMAGES_DIR / "parrot.zip") as zipper:
            self.assertListEqual(["parrot.png", "parrot_128x128.png"], zipper.namelist())
            with Image.open(zipper.open("parrot_128x128.png")) as thumb:
                self.assertEqual((128, 85), thumb.size)

    def test_makeThumbnails_whenNotAnImage_shouldReturnError(self):
        file_path = IMAGES_DIR / "fake.png"
        file_path.write_text("not an image")

        results = make_thumbnails(str(file_path), [(128, 128)])

        self.assertIn("error", results)

    def test_homePost_whenValidImage_shouldRunTaskAndShowStatus(self):
        upload = SimpleUploadedFile("bird.png", make_image_bytes(), content_type="image/png")

        response = self.client.post(reverse("home"), {"image_file": upload})

        self.assertEqual("SUCCESS", response.context["task_status"])
        self.assertTrue(os.path.exists(IMAGES_DIR / "bird.zip"))

    def test_homePost_whenNotImage_shouldShowFormErrors(self):
        upload = SimpleUploadedFile("bird.png", b"nope", content_type="image/png")

        response = self.client.post(reverse("home"), {"image_file": upload})

        self.assertTrue(response.context["form"].errors)

    @patch("thumbnailer.views.current_app")
    def test_taskView_whenSuccess_shouldReturnResults(self, current_app):
        current_app.AsyncResult.return_value = MagicMock(
            status="SUCCESS",
            id="abc",
            get=MagicMock(return_value={"archive_path": "/media/images/a.zip"}),
        )

        response = self.client.get(reverse("task", args=["abc"]))

        self.assertJSONEqual(
            response.content,
            {
                "task_status": "SUCCESS",
                "task_id": "abc",
                "results": {"archive_path": "/media/images/a.zip"},
            },
        )
