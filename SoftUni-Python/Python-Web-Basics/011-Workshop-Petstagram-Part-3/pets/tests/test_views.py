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


class PetCrudViewsTests(TestCase):
    def setUp(self):
        self.pet = Pet.objects.create(**VALID_PET)

    def test_getCreate_shouldRenderEmptyForm(self):
        response = self.client.get(reverse('pet-create'))

        self.assertTemplateUsed(response, 'pets/pet_create.html')
        self.assertIsNone(response.context['form'].instance.pk)

    def test_postCreate_whenValid_shouldCreateAndRedirectToAllPets(self):
        response = self.client.post(reverse('pet-create'), data={**VALID_PET, 'name': 'Tom', 'type': 'cat'})

        self.assertRedirects(response, reverse('pet-list'))
        self.assertTrue(Pet.objects.filter(name='Tom').exists())

    def test_postCreate_whenInvalid_shouldRenderErrors(self):
        response = self.client.post(reverse('pet-create'), data={**VALID_PET, 'age': ''})

        self.assertTemplateUsed(response, 'pets/pet_create.html')
        self.assertIn('age', response.context['form'].errors)
        self.assertEqual(1, Pet.objects.count())

    def test_getEdit_shouldPrefillForm(self):
        response = self.client.get(reverse('pet-edit', args=[self.pet.pk]))

        self.assertTemplateUsed(response, 'pets/pet_edit.html')
        self.assertContains(response, 'value="Rex"')

    def test_postEdit_whenValid_shouldUpdateAndRedirectToDetails(self):
        response = self.client.post(reverse('pet-edit', args=[self.pet.pk]), data={**VALID_PET, 'age': 4})

        self.assertRedirects(response, reverse('pet-details', args=[self.pet.pk]))
        self.pet.refresh_from_db()
        self.assertEqual(4, self.pet.age)

    def test_getDelete_shouldRenderConfirmationWithoutDeleting(self):
        response = self.client.get(reverse('pet-delete', args=[self.pet.pk]))

        self.assertTemplateUsed(response, 'pets/pet_delete.html')
        self.assertTrue(Pet.objects.exists())

    def test_postDelete_shouldDeleteAndRedirectToAllPets(self):
        response = self.client.post(reverse('pet-delete', args=[self.pet.pk]))

        self.assertRedirects(response, reverse('pet-list'))
        self.assertFalse(Pet.objects.exists())

    def test_getDetail_whenNoComments_shouldShowEmptyMessageAndActions(self):
        response = self.client.get(reverse('pet-details', args=[self.pet.pk]))

        self.assertContains(response, 'There are no comments for this pet.')
        self.assertContains(response, reverse('pet-edit', args=[self.pet.pk]))
        self.assertContains(response, reverse('pet-delete', args=[self.pet.pk]))

    def test_postDetail_whenValidComment_shouldCreateCommentAndRedirect(self):
        response = self.client.post(reverse('pet-details', args=[self.pet.pk]), data={'comment': 'So cute!'})

        self.assertRedirects(response, reverse('pet-details', args=[self.pet.pk]))
        self.assertEqual(['So cute!'], [c.comment for c in self.pet.comment_set.all()])
        self.assertContains(self.client.get(reverse('pet-details', args=[self.pet.pk])), 'So cute!')

    def test_postDetail_whenEmptyComment_shouldRenderErrors(self):
        response = self.client.post(reverse('pet-details', args=[self.pet.pk]), data={'comment': ''})

        self.assertEqual(200, response.status_code)
        self.assertTrue(response.context['comment_form'].errors)
        self.assertFalse(self.pet.comment_set.exists())
