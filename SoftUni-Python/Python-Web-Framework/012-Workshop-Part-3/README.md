# Workshop: Petstagram – Part VI, Class-Based Views

The Part V project refactored to CBVs (`ListView`, `DetailView` with comment POST, `CreateView`, `UpdateView`, `DeleteView` with an `OwnerRequiredMixin`, `TemplateView`).

Bonus: admin classes with list display, filters, search and comment inlines, plus tests.

## Run

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py test
python manage.py runserver
```

