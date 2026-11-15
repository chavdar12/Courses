import os
from zipfile import ZipFile

from celery import shared_task
from django.conf import settings
from PIL import Image


@shared_task
def make_thumbnails(file_path, thumbnails=()):
    images_dir = settings.IMAGES_DIR
    file_name, ext = os.path.splitext(os.path.basename(file_path))
    zip_file = f"{file_name}.zip"
    results = {"archive_path": f"{settings.MEDIA_URL}images/{zip_file}"}

    try:
        with (
            Image.open(file_path) as img,
            ZipFile(os.path.join(images_dir, zip_file), "w") as zipper,
        ):
            zipper.write(file_path, os.path.basename(file_path))
            for w, h in thumbnails:
                img_copy = img.copy()
                img_copy.thumbnail((w, h))
                thumbnail_file = os.path.join(images_dir, f"{file_name}_{w}x{h}{ext}")
                img_copy.save(thumbnail_file)
                zipper.write(thumbnail_file, os.path.basename(thumbnail_file))
                os.remove(thumbnail_file)
        os.remove(file_path)
    except IOError as e:
        results["error"] = str(e)

    return results
