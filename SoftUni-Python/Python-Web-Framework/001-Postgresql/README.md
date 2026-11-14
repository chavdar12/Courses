# Lab: PostgreSQL – Pet Hotel

Tables `pet_owners`, `dogs`, `cats`, `hotels`, `dog_rooms`, `cat_rooms` with the length/range restrictions as `CHECK` constraints and `ON DELETE CASCADE` for pets, owners and hotels.

- `sql/pet_hotel.sql` – the pure SQL solution (create, insert, select, where, sort, count, delete)
- `hotel/models.py` – the same schema as Django models (`db_table` matches the SQL)
- `hotel/migrations/0002_insert_data.py` – task 1, inserts the lab data
- `hotel/queries.py` – tasks 2–6 with the ORM

## Run

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py test
python manage.py runserver
```

Run against PostgreSQL (also runs the raw SQL test):

```bash
docker compose up -d
DB_ENGINE=django.db.backends.postgresql DB_NAME=pet_hotel DB_PASSWORD=postgres python manage.py test
```
