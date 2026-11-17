from django.test import TestCase

from pets.forms import CreatePetForm
from pets.tests.test_models import VALID_PET


class CreatePetFormTests(TestCase):
    def test_createPetForm_whenValid_shouldSavePet(self):
        form = CreatePetForm(data=VALID_PET)

        self.assertTrue(form.is_valid())
        self.assertEqual("Rex", form.save().name)

    def test_createPetForm_whenInvalidImageUrl_shouldBeInvalid(self):
        form = CreatePetForm(data={**VALID_PET, "image_url": "not a url"})

        self.assertFalse(form.is_valid())
        self.assertIn("image_url", form.errors)

    def test_createPetForm_whenUnknownType_shouldBeInvalid(self):
        self.assertFalse(CreatePetForm(data={**VALID_PET, "type": "fish"}).is_valid())

    def test_createPetForm_shouldStyleEveryField(self):
        for name, field in CreatePetForm().fields.items():
            with self.subTest(field=name):
                self.assertIn("form-control", field.widget.attrs["class"])
