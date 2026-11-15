import shutil
import tempfile

from django.test import TestCase, override_settings
from django.urls import reverse

from pythons_app.models import Python
from pythons_app.tests import make_image

MEDIA_ROOT = tempfile.mkdtemp()


@override_settings(MEDIA_ROOT=MEDIA_ROOT)
class TestPythonViews(TestCase):
    @classmethod
    def tearDownClass(cls):
        shutil.rmtree(MEDIA_ROOT, ignore_errors=True)
        super().tearDownClass()

    def test_create_whenImageUploaded_shouldSaveItInImagesFolder(self):
        response = self.client.post(
            reverse("create"),
            {
                "name": "Ball Python",
                "description": "Royal python",
                "image": make_image(),
            },
        )

        self.assertRedirects(response, reverse("index"))
        python = Python.objects.get()
        self.assertTrue(python.image.name.startswith("images/"))

    def test_create_whenNoImage_shouldBeInvalid(self):
        response = self.client.post(
            reverse("create"), {"name": "Ball Python", "description": "Royal python"}
        )

        self.assertEqual(200, response.status_code)
        self.assertEqual(0, Python.objects.count())

    def test_index_shouldRenderImageUrl(self):
        python = Python.objects.create(
            name="Ball Python", description="Royal python", image=make_image()
        )

        response = self.client.get(reverse("index"))

        self.assertContains(response, python.image.url)
        self.assertTemplateUsed(response, "python_detail.html")
