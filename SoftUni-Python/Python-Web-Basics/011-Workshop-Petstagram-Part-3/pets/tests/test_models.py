from django.core.exceptions import ValidationError
from django.test import TestCase

from pets.models import Pet, Like

VALID_PET = {
    'type': 'dog',
    'name': 'Rex',
    'age': 3,
    'description': 'Good boy',
    'image_url': 'https://example.com/rex.jpg',
}


class PetModelTests(TestCase):
    def test_fullClean_whenValid_shouldNotRaise(self):
        Pet(**VALID_PET).full_clean()

    def test_fullClean_whenUnknownType_shouldRaise(self):
        with self.assertRaises(ValidationError) as context:
            Pet(**{**VALID_PET, 'type': 'fish'}).full_clean()

        self.assertIn('type', context.exception.message_dict)

    def test_fullClean_whenNameLongerThan6_shouldRaise(self):
        with self.assertRaises(ValidationError):
            Pet(**{**VALID_PET, 'name': 'Rexxxxx'}).full_clean()

    def test_fullClean_whenNegativeAge_shouldRaise(self):
        with self.assertRaises(ValidationError):
            Pet(**{**VALID_PET, 'age': -1}).full_clean()

    def test_deletePet_shouldDeleteItsLikes(self):
        pet = Pet.objects.create(**VALID_PET)
        Like.objects.create(pet=pet)

        pet.delete()

        self.assertFalse(Like.objects.exists())
