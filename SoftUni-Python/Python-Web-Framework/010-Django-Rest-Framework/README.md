# Lab: Django REST Framework – Books API

- `GET/POST /api/books/` – `ListBooksView`
- `GET/POST/DELETE /api/books/<id>` – `DetailBookView` (POST updates, as in the lab)

Missing books return 404 instead of a server error.

## Run

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py test
python manage.py runserver
```

