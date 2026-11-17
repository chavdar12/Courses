# SoftUni Python Web Basics

Solutions for the SoftUni Python Web Basics course (Django): URLs and templates, the HTTP protocol, models and the MTV
pattern, forms, model forms, testing, the Petstagram workshop and an exam-prep project. Every Django lecture is a
self-contained project with its own `requirements.txt` and tests.

## Lectures

| #   | Lecture | Exercises |
| --- | ------- | --------- |
| 002 | URLS and Templates | [Django project](002-Urls-And-Templates) with two apps: [main_app](002-Urls-And-Templates/main_app) · [secondary_app](002-Urls-And-Templates/secondary_app) – URL routing, path converters, templates |
| 003 | HTTP Protocol | [URL Decode](003-Http-Protocol/001_url_decode) · [Validate URL](003-Http-Protocol/002_validate_url) · [Request Parser](003-Http-Protocol/003_request_parser) |
| 004 | Workshop: Petstagram, part 1 | [Petstagram](004-Workshop-Petstagram-Part-1): project setup, base template, static files, home page |
| 006 | Models and MTV Pattern | [To-do app](006-Models-And-Mtv-Pattern): `Todo` model, views and templates (MTV) |
| 007 | Workshop: Petstagram, part 2 | [Petstagram](007-Workshop-Petstagram-Part-2): pets app, `Pet` model and pages |
| 008 | Forms | [Forms demo](008-Forms/forms_demo) · [To-dos with forms](008-Forms/todos_app) |
| 009 | Model Forms | [Books](009-Model-Forms/books): `ModelForm` create / edit / delete |
| 010 | Unit and Integration Testing | [Posts](010-Unit-And-Integration-Testing/posts) · [Lost and Found](010-Unit-And-Integration-Testing/lost_and_found) · [testing](010-Unit-And-Integration-Testing/testing) – model, form and view tests |
| 011 | Workshop: Petstagram, part 3 | [Petstagram](011-Workshop-Petstagram-Part-3): pet pages with likes and comments |
| 012 | Exam Preparation: Expenses Tracker | [Expenses Tracker](012-Exam-Preparation-Expenses-Tracker): profile + expenses CRUD |

## Run

Needs Python 3.14.

```bash
cd 011-Workshop-Petstagram-Part-3
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver    # http://localhost:8000
python manage.py test
```

The HTTP Protocol lecture is plain Python: `cd 003-Http-Protocol/001_url_decode && python -m unittest`.

## License

[MIT](LICENSE)

## Course materials

Slides, task sheets and lecture videos for each lesson.

| Lesson | Materials | Video |
| ------ | --------- | ----- |
| [001-Introduction-To-Django](001-Introduction-To-Django) | [Intro-To-Django.pdf](001-Introduction-To-Django/Resources/Intro-To-Django.pdf) | [Video](https://youtu.be/W_B7IHKYO-0) |
| [002-Urls-And-Templates](002-Urls-And-Templates) | [Url-S-And-Templates-Lab.pdf](002-Urls-And-Templates/Resources/Url-S-And-Templates-Lab.pdf) · [Url-S-And-Templates.pdf](002-Urls-And-Templates/Resources/Url-S-And-Templates.pdf) | [Video](https://youtu.be/hEVubF_ZhZE) |
| [003-Http-Protocol](003-Http-Protocol) | [Http-Protocol-Lab.pdf](003-Http-Protocol/Resources/Http-Protocol-Lab.pdf) · [Http-Protocol.pdf](003-Http-Protocol/Resources/Http-Protocol.pdf) | [Video](https://youtu.be/E5WTLL_lUFM) |
| [004-Workshop-Petstagram-Part-1](004-Workshop-Petstagram-Part-1) | [Workshop-Part-.pdf](004-Workshop-Petstagram-Part-1/Resources/Workshop-Part-.pdf) | — |
| 004-Workshop-Part-1 | — | [Video](https://youtu.be/PqLxTRymfoI) |
| [005-Database-Basics](005-Database-Basics) | [Database-Basics.pdf](005-Database-Basics/Resources/Database-Basics.pdf) | [Video](https://youtu.be/tyjPWjcXYOM) |
| [006-Models-And-Mtv-Pattern](006-Models-And-Mtv-Pattern) | [Models-And-Mtv-Pattern-Lab.pdf](006-Models-And-Mtv-Pattern/Resources/Models-And-Mtv-Pattern-Lab.pdf) · [Models-And-Mtv-Pattern.pdf](006-Models-And-Mtv-Pattern/Resources/Models-And-Mtv-Pattern.pdf) | [Video](https://youtu.be/R3lHaM824Sg) |
| [007-Workshop-Petstagram-Part-2](007-Workshop-Petstagram-Part-2) | [Workshop-Part-.pdf](007-Workshop-Petstagram-Part-2/Resources/Workshop-Part-.pdf) | — |
| 007-Workshop-Part-2 | — | [Video](https://youtu.be/drlzYSzHT4E) |
| [008-Forms](008-Forms) | [Forms-Lab.pdf](008-Forms/Resources/Forms-Lab.pdf) · [Forms.pdf](008-Forms/Resources/Forms.pdf) | [Video](https://youtu.be/DqTuo4R1WHo) |
| [009-Model-Forms](009-Model-Forms) | [Model-Forms-Lab.pdf](009-Model-Forms/Resources/Model-Forms-Lab.pdf) · [Model-Forms.pdf](009-Model-Forms/Resources/Model-Forms.pdf) | [Video](https://youtu.be/2CrqbwjO7uo) |
| [010-Unit-And-Integration-Testing](010-Unit-And-Integration-Testing) | [Unit-And-Integration-Testing-Lab.pdf](010-Unit-And-Integration-Testing/Resources/Unit-And-Integration-Testing-Lab.pdf) · [Unit-And-Integration-Testing.pdf](010-Unit-And-Integration-Testing/Resources/Unit-And-Integration-Testing.pdf) | [Video](https://youtu.be/CORCgJbApa0) |
| [011-Workshop-Petstagram-Part-3](011-Workshop-Petstagram-Part-3) | [Workshop-Part-.pdf](011-Workshop-Petstagram-Part-3/Resources/Workshop-Part-.pdf) | — |
| 011-Workshop-Part-3 | — | [Video](https://youtu.be/oAV9vAEDPOQ) |
| [012-Exam-Preparation-Expenses-Tracker](012-Exam-Preparation-Expenses-Tracker) | [Python-Web-Basics-Exam-Preparation.pdf](012-Exam-Preparation-Expenses-Tracker/Resources/Python-Web-Basics-Exam-Preparation.pdf) | — |
| 012-Exam-Preparation | — | [Video](https://youtu.be/SkQlGi3QVHQ) |
