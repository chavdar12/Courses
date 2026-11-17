from pathlib import Path
from unittest import skipUnless

from django.db import connection
from django.test import TestCase

SQL_FILE = Path(__file__).resolve().parents[2] / "sql" / "pet_hotel.sql"


@skipUnless(connection.vendor == "postgresql", "the raw SQL lab is PostgreSQL only")
class TestPetHotelSql(TestCase):
    def test_sqlFile_shouldProduceExpectedResults(self):
        statements = [s.strip() for s in SQL_FILE.read_text().split(";") if s.strip()]
        results = []
        with connection.cursor() as cursor:
            # own schema so the lab tables don't clash with the Django ones; TestCase rolls it back
            cursor.execute("CREATE SCHEMA lab; SET LOCAL search_path TO lab")
            for statement in statements:
                cursor.execute(statement)
                if cursor.description:
                    results.append(cursor.fetchall())
            cursor.execute("SELECT COUNT(*) FROM cats")
            cats_left = cursor.fetchone()[0]

        dog_rooms, cat_ids, owners, cats_count = results
        self.assertEqual(3, len(dog_rooms))
        self.assertListEqual([(2,), (3,)], sorted(cat_ids))
        self.assertListEqual(["Amy", "George", "Peter"], [row[1] for row in owners])
        self.assertEqual([(2,)], cats_count)
        self.assertEqual(2, cats_left)
