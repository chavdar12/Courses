from datetime import date

from django.db import migrations

ROOM_DATES = [
    (date(2020, 6, 8), date(2020, 6, 10)),
    (date(2020, 6, 10), date(2020, 6, 15)),
    (date(2020, 6, 20), date(2020, 6, 23)),
]


# 1. Insert
def insert_data(apps, schema_editor):
    PetOwner, Dog, Cat, Hotel, DogRoom, CatRoom = (
        apps.get_model('hotel', name) for name in ('PetOwner', 'Dog', 'Cat', 'Hotel', 'DogRoom', 'CatRoom')
    )
    peter, george, amy = (PetOwner.objects.create(owner_name=name, owner_age=age)
                          for name, age in (('Peter', 26), ('George', 32), ('Amy', 67)))
    dogs = [Dog.objects.create(owner=owner, dog_name=name, dog_age=age)
            for owner, name, age in ((peter, 'Fluffy', 2), (amy, 'Bully', 3), (peter, 'Rousey', 5))]
    cats = [Cat.objects.create(owner=owner, cat_name=name, cat_age=age)
            for owner, name, age in ((george, 'Tommy', 1), (amy, 'Jessy', 7), (george, 'Bubbles', 3))]
    grand, heaven = (Hotel.objects.create(hotel_name=name, hotel_stars=stars)
                     for name, stars in (('Grand Pets Hotel', 5), ('Pets Heaven', 2)))
    hotels = [grand, heaven, heaven]
    for dog, cat, hotel, (start, end) in zip(dogs, cats, hotels, ROOM_DATES):
        DogRoom.objects.create(dog=dog, hotel=hotel, register_date=start, unregister_date=end)
        CatRoom.objects.create(cat=cat, hotel=hotel, register_date=start, unregister_date=end)


class Migration(migrations.Migration):
    dependencies = [
        ('hotel', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(insert_data, migrations.RunPython.noop),
    ]
