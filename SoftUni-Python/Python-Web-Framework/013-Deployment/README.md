# Deployment – Petstagram on Heroku

The Part VI project with `gunicorn`, a `Procfile` (migrations run on release), WhiteNoise for static files and settings from environment variables.

## Run

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py test
python manage.py runserver
```

Deploy:

```bash
heroku create
heroku addons:create heroku-postgresql
heroku config:set SECRET_KEY=<random> DEBUG=False ALLOWED_HOSTS=<app>.herokuapp.com \
    DB_ENGINE=django.db.backends.postgresql DB_NAME=... DB_USER=... DB_PASSWORD=... DB_HOST=...
git push heroku main
```

Uploaded pet photos are only served while `DEBUG=True`, and Heroku's disk is wiped on every restart, so use S3 or Cloudinary for real media.
