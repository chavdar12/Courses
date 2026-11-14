# Lab: Media Files – Pythons Wiki with Image Upload

`Python.image` is an `ImageField` saved in `media/images`, the form uses `multipart/form-data` and the bootstrap `custom-file` input, media is served in development.

## Run

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py test
python manage.py runserver
```

