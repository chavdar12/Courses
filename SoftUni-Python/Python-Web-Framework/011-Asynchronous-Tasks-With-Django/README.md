# Asynchronous Tasks with Django – Celery and Redis Thumbnailer

Upload an image, a Celery task zips it together with a 128x128 thumbnail into `media/images/<name>.zip`, and the page polls `task/<id>/` until the download is ready.

Tests run the task inline (`task_always_eager`), so they need neither Redis nor a worker.

## Run

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py test
python manage.py runserver
```

Run for real (Redis plus a worker in a second terminal):

```bash
docker run -d -p 6379:6379 redis
celery -A image_parroter worker -l info
```
