from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


def between(field, low, high):
    return models.CheckConstraint(
        condition=models.Q(**{f"{field}__gte": low, f"{field}__lte": high}),
        name=f"%(class)s_{field}_between_{low}_and_{high}",
    )


class PetOwner(models.Model):
    owner_id = models.AutoField(primary_key=True)
    owner_name = models.CharField(max_length=15)
    owner_age = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(110)])

    class Meta:
        db_table = "pet_owners"
        constraints = [between("owner_age", 1, 110)]

    def __str__(self):
        return self.owner_name


class Dog(models.Model):
    dog_id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(PetOwner, on_delete=models.CASCADE, db_column="owner_id")
    dog_name = models.CharField(max_length=15)
    dog_age = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(25)])

    class Meta:
        db_table = "dogs"
        constraints = [between("dog_age", 1, 25)]

    def __str__(self):
        return self.dog_name


class Cat(models.Model):
    cat_id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(PetOwner, on_delete=models.CASCADE, db_column="owner_id")
    cat_name = models.CharField(max_length=15)
    cat_age = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(25)])

    class Meta:
        db_table = "cats"
        constraints = [between("cat_age", 1, 25)]

    def __str__(self):
        return self.cat_name


class Hotel(models.Model):
    hotel_id = models.AutoField(primary_key=True)
    hotel_name = models.CharField(max_length=25)
    hotel_stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    class Meta:
        db_table = "hotels"
        constraints = [between("hotel_stars", 1, 5)]

    def __str__(self):
        return self.hotel_name


class DogRoom(models.Model):
    room_id = models.AutoField(primary_key=True)
    dog = models.ForeignKey(Dog, on_delete=models.CASCADE, db_column="dog_id")
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, db_column="hotel_id")
    register_date = models.DateField()
    unregister_date = models.DateField()

    class Meta:
        db_table = "dog_rooms"


class CatRoom(models.Model):
    room_id = models.AutoField(primary_key=True)
    cat = models.ForeignKey(Cat, on_delete=models.CASCADE, db_column="cat_id")
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, db_column="hotel_id")
    register_date = models.DateField()
    unregister_date = models.DateField()

    class Meta:
        db_table = "cat_rooms"
