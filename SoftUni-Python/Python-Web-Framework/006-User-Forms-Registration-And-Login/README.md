# Lab: Login and Register – Pythons Wiki

- Register with `UserCreationForm`: the new user joins the `User` group and gets a `Profile`
- `LoginForm` (username + password) that authenticates in `clean()`
- `Profile` extends the user with `picture_url`, `description` and `website`
- Bootstrap classes are added by a small form mixin (no `django-bootstrap4` needed)

## Run

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py test
python manage.py runserver
```

