# Python Web Framework

Solutions for the SoftUni **Python Web Framework** course (Django 5.2).
Every folder is a self-contained Django project with its own `requirements.txt` and tests.

| Folder | Task | Project |
|--------|------|---------|
| [001-Postgresql](001-Postgresql) | Lab: Pet Hotel database | `pet_hotel` + raw `sql/pet_hotel.sql` |
| [002-Templates-Advanced](002-Templates-Advanced) | Lab: Pythons Wiki, template inheritance | `pythons_wiki` |
| [003-Media-Files](003-Media-Files) | Lab: Pythons Wiki, image upload | `pythons_wiki` |
| [004-Workshop-Part-1](004-Workshop-Part-1) | Workshop: Petstagram I–IV | `petstagram` |
| [005-Authentication](005-Authentication) | Lab: Pythons Wiki, login/logout, group decorator, 401 page | `pythons_wiki` |
| [006-User-Forms-Registration-And-Login](006-User-Forms-Registration-And-Login) | Lab: Pythons Wiki, register/login forms, Profile | `pythons_wiki` |
| [007-Workshop-Part-2](007-Workshop-Part-2) | Workshop: Petstagram V, users and profiles | `petstagram` |
| [008-Intro-To-Class-Based-Views](008-Intro-To-Class-Based-Views) | Lab: Pythons Wiki refactored to CBVs | `pythons_wiki` |
| [009-Class-Based-Views-Deep-Dive](009-Class-Based-Views-Deep-Dive) | Lab: News app with CBVs | `news_project` |
| [010-Django-Rest-Framework](010-Django-Rest-Framework) | Lab: Books API | `django_rest` |
| [011-Asynchronous-Tasks-With-Django](011-Asynchronous-Tasks-With-Django) | Demo: Celery + Redis thumbnails | `image_parroter` |
| [012-Workshop-Part-3](012-Workshop-Part-3) | Workshop: Petstagram VI, CBVs, admin, tests | `petstagram` |
| [013-Deployment](013-Deployment) | Petstagram ready for Heroku | `petstagram` |

## Run any project

```bash
cd 002-Templates-Advanced
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py test
python manage.py runserver
```

SQLite is used by default. To use PostgreSQL set the environment variables
`DB_ENGINE=django.db.backends.postgresql`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`
(and `pip install "psycopg[binary]"`).

## License

[MIT](LICENSE)
