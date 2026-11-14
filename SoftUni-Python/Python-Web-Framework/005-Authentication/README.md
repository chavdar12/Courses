# Lab: Authentication – Pythons Wiki

- Group `User` with *add python* and *view python* permissions, created by a data migration
- Navbar shows **Login**, or **Hello, {username}!** with **Logout**
- `login_view` / `logout_view`
- `@group_required(['User'])` decorator lets only that group and superusers create pythons, everyone else gets the custom **401 Unauthorized!** page

Create the lab user with `python manage.py createsuperuser`, or in the admin add a user to the `User` group.

## Run

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py test
python manage.py runserver
```

