# Lab: Intro to Class-Based Views – Pythons Wiki

- `IndexView(ListView)`
- `CreatePythonView(GroupRequiredMixin, FormView)` (`pythons_app/mixins.py` raises `PermissionDenied`, so the response is 403)
- `RegisterView(CreateView)`

## Run

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py test
python manage.py runserver
```

