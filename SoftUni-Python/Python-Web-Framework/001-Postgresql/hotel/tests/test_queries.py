from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.test import TestCase

from hotel import queries
from hotel.models import PetOwner, Dog, Cat, Hotel, DogRoom, CatRoom


class TestPetHotelQueries(TestCase):
    """The data comes from migration 0002, so every test starts from the lab's tables."""

    def test_insert_shouldHaveAllLabData(self):
        self.assertEqual(3, PetOwner.objects.count())
        self.assertEqual(3, Dog.objects.count())
        self.assertEqual(3, Cat.objects.count())
        self.assertEqual(2, Hotel.objects.count())
        self.assertEqual(3, DogRoom.objects.count())
        self.assertEqual(3, CatRoom.objects.count())

    def test_selectDogRooms_shouldReturnAllColumns(self):
        rooms = list(queries.select_dog_rooms())

        self.assertEqual(3, len(rooms))
        self.assertSetEqual(
            {'room_id', 'dog_id', 'hotel_id', 'register_date', 'unregister_date'},
            set(rooms[0]),
        )

    def test_catIdsInHotel2_shouldBeJessyAndBubbles(self):
        expected = set(Cat.objects.filter(cat_name__in=['Jessy', 'Bubbles']).values_list('cat_id', flat=True))

        self.assertSetEqual(expected, set(queries.cat_ids_in_hotel(2)))

    def test_ownersByAgeDesc_shouldStartWithOldest(self):
        names = [owner.owner_name for owner in queries.owners_by_age_desc()]

        self.assertListEqual(['Amy', 'George', 'Peter'], names)

    def test_countCatsAtLeast3_shouldBe2(self):
        self.assertEqual(2, queries.count_cats_at_least(3))

    def test_deletePetsUpTo2_shouldDeletePetsAndTheirRooms(self):
        queries.delete_pets_up_to(2)

        self.assertFalse(Cat.objects.filter(cat_name='Tommy').exists())
        self.assertFalse(Dog.objects.filter(dog_name='Fluffy').exists())
        self.assertEqual(2, DogRoom.objects.count())
        self.assertEqual(2, CatRoom.objects.count())

    def test_deleteOwner_shouldDeleteHisPets(self):
        PetOwner.objects.get(owner_name='Peter').delete()

        self.assertFalse(Dog.objects.filter(dog_name__in=['Fluffy', 'Rousey']).exists())

    def test_deleteHotel_shouldDeleteItsRooms(self):
        Hotel.objects.get(hotel_name='Pets Heaven').delete()

        self.assertEqual(1, DogRoom.objects.count())
        self.assertEqual(1, CatRoom.objects.count())

    def test_ownerAge_whenOutOfRange_shouldFailValidation(self):
        with self.assertRaises(ValidationError):
            PetOwner(owner_name='Old', owner_age=111).full_clean()

    def test_hotelStars_whenOutOfRange_shouldViolateDbConstraint(self):
        with self.assertRaises(IntegrityError):
            Hotel.objects.create(hotel_name='Bad', hotel_stars=6)

    def test_dogName_whenLongerThan15_shouldFailValidation(self):
        with self.assertRaises(ValidationError):
            Dog(owner=PetOwner.objects.first(), dog_name='x' * 16, dog_age=2).full_clean()
