from io import BytesIO

from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image


def make_image(name='python.png'):
    buffer = BytesIO()
    Image.new('RGB', (10, 10)).save(buffer, 'PNG')
    return SimpleUploadedFile(name, buffer.getvalue(), content_type='image/png')
