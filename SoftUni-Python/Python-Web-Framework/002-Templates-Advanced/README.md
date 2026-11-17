# Lab: Templates Advanced – Pythons Wiki

Templates refactored to inheritance: `base.html` includes `common/header.html` and `common/footer.html`, `index.html` and `create.html` extend it and every python card is rendered by `python_detail.html`.

## Run

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py test
python manage.py runserver
```

