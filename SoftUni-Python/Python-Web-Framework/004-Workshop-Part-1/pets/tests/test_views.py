from django.urls import reverse

from common.models import Comment
from pets.models import Pet, Like
from pets.tests import MediaTestCase, make_image


class TestPetViews(MediaTestCase):
    def create_pet(self, **kwargs):
        data = {
            "type": "dog",
            "name": "Rex",
            "age": 3,
            "description": "Good boy",
            "image": make_image(),
        }
        data.update(kwargs)
        return Pet.objects.create(**data)

    def test_landingPage_shouldRender(self):
        response = self.client.get(reverse("landing page"))

        self.assertTemplateUsed(response, "landing_page.html")
        self.assertTemplateUsed(response, "base.html")

    def test_petAll_shouldListPets(self):
        self.create_pet(name="Rex")

        response = self.client.get(reverse("list pets"))

        self.assertContains(response, "Rex")
        self.assertTemplateUsed(response, "pets/pet_card.html")

    def test_createPet_whenValid_shouldSaveImageInMediaAndRedirect(self):
        response = self.client.post(
            reverse("create pet"),
            {
                "type": "cat",
                "name": "Tom",
                "age": 2,
                "description": "Cat",
                "image": make_image(),
            },
        )

        self.assertRedirects(response, reverse("list pets"))
        self.assertTrue(Pet.objects.get().image.name.startswith("pets/"))

    def test_createPet_whenNameTooLong_shouldBeInvalid(self):
        self.client.post(
            reverse("create pet"),
            {
                "type": "cat",
                "name": "Tommy Lee",
                "age": 2,
                "description": "Cat",
                "image": make_image(),
            },
        )

        self.assertEqual(0, Pet.objects.count())

    def test_editPet_whenNoNewImage_shouldKeepOldImage(self):
        pet = self.create_pet()
        old_image = pet.image.name

        response = self.client.post(
            reverse("edit pet", args=[pet.pk]),
            {
                "type": "dog",
                "name": "Max",
                "age": 4,
                "description": "Changed",
            },
        )

        self.assertRedirects(response, reverse("pet details", args=[pet.pk]))
        pet.refresh_from_db()
        self.assertEqual("Max", pet.name)
        self.assertEqual(old_image, pet.image.name)

    def test_deletePet_whenGet_shouldNotDelete(self):
        pet = self.create_pet()

        self.client.get(reverse("delete pet", args=[pet.pk]))

        self.assertTrue(Pet.objects.filter(pk=pet.pk).exists())

    def test_deletePet_whenPost_shouldDeleteAndRedirect(self):
        pet = self.create_pet()

        response = self.client.post(reverse("delete pet", args=[pet.pk]))

        self.assertRedirects(response, reverse("list pets"))
        self.assertFalse(Pet.objects.exists())

    def test_likePet_shouldCreateLike(self):
        pet = self.create_pet()

        self.client.get(reverse("like pet", args=[pet.pk]))

        self.assertEqual(1, Like.objects.filter(pet=pet).count())

    def test_petDetail_whenCommentPosted_shouldCreateComment(self):
        pet = self.create_pet()

        response = self.client.post(reverse("pet details", args=[pet.pk]), {"comment": "Cute!"})

        self.assertRedirects(response, reverse("pet details", args=[pet.pk]))
        self.assertEqual("Cute!", Comment.objects.get(pet=pet).comment)
        self.assertContains(self.client.get(reverse("pet details", args=[pet.pk])), "Cute!")

    def test_petDetail_whenMissing_shouldReturn404(self):
        self.assertEqual(404, self.client.get(reverse("pet details", args=[999])).status_code)
