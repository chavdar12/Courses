# Workshop: Petstagram – Parts I–IV

Landing page (`common`), pets list/details/like, create/edit/delete pet, comments (Part III), image upload to `media/pets` and template inheritance (Part IV).

## Run

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py test
python manage.py runserver
```

