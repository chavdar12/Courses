# Lab: Class-Based Views Deep Dive – News App

`Source` and `Article` models, `ListView`/`CreateView` pages for home, sources, create source and create article. The source details page is `SingleObjectMixin` + `ListView` and shows only that source's articles. Source links open in a new tab.

## Run

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py test
python manage.py runserver
```

