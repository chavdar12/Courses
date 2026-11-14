from django.test import TestCase
from django.urls import reverse

from pets.models import Pet, Like
from pets.tests.test_models import VALID_PET


class PetViewsTests(TestCase):
    def setUp(self):
        self.pet = Pet.objects.create(**VALID_PET)

    def test_getPetAll_shouldListPets(self):
        response = self.client.get(reverse('pet-list'))

        self.assertTemplateUsed(response, 'pets/pet_list.html')
        self.assertEqual([self.pet], list(response.context['pets']))
        self.assertContains(response, reverse('pet-details', args=[self.pet.pk]))

    def test_getPetDetail_shouldRenderPetWithLikes(self):
        Like.objects.create(pet=self.pet)

        response = self.client.get(reverse('pet-details', args=[self.pet.pk]))

        self.assertTemplateUsed(response, 'pets/pet_detail.html')
        self.assertEqual(self.pet, response.context['pet'])
        self.assertEqual(1, response.context['likes_count'])

    def test_getPetDetail_whenMissingPet_shouldReturn404(self):
        self.assertEqual(404, self.client.get(reverse('pet-details', args=[self.pet.pk + 1])).status_code)

    def test_postLike_shouldCreateLikeAndRedirectToDetails(self):
        response = self.client.post(reverse('pet-like', args=[self.pet.pk]))

        self.assertRedirects(response, reverse('pet-details', args=[self.pet.pk]))
        self.assertEqual(1, self.pet.like_set.count())

    def test_getLike_shouldNotBeAllowed(self):
        self.assertEqual(405, self.client.get(reverse('pet-like', args=[self.pet.pk])).status_code)
        self.assertFalse(Like.objects.exists())

    def test_navigation_shouldLinkHomeAndAllPets(self):
        response = self.client.get(reverse('landing page'))

        self.assertContains(response, f'href="{reverse("landing page")}"')
        self.assertContains(response, f'href="{reverse("pet-list")}"')
