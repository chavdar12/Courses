# Workshop: Petstagram – Part V, Users

- `accounts` app with `UserProfile` (`profile_picture`, default `media/profiles/default.png`), created automatically for every new user
- `accounts/` includes `django.contrib.auth.urls`, plus `accounts/signup` and `accounts/profile/<pk>` (GET view, POST change picture, owner only)
- `Pet`, `Like` and `Comment` belong to a `UserProfile`
- The owner sees Edit/Delete; other users see the heart (filled when liked, click again to unlike) and the comment form
- Every pet page requires login

## Run

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py test
python manage.py runserver
```

