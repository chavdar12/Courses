from django.contrib.auth.models import User
from django.urls import reverse

from common.models import Comment
from pets.models import Pet, Like
from pets.tests import MediaTestCase, make_image


class TestPetViews(MediaTestCase):
    def setUp(self):
        self.owner = self.create_profile('owner')
        self.visitor = self.create_profile('visitor')
        self.pet = Pet.objects.create(
            type='dog', name='Rex', age=3, description='Good boy', image=make_image(), user=self.owner,
        )

    @staticmethod
    def create_profile(username):
        return User.objects.create_user(username=username, password='pass12345').userprofile

    def login(self, profile):
        self.client.force_login(profile.user)

    def test_petAll_whenAnonymous_shouldRedirectToLogin(self):
        response = self.client.get(reverse('list pets'))

        self.assertEqual(302, response.status_code)
        self.assertIn(reverse('login'), response.url)

    def test_createPet_shouldAssignCurrentUser(self):
        self.login(self.visitor)

        response = self.client.post(reverse('create pet'), {
            'type': 'cat', 'name': 'Tom', 'age': 2, 'description': 'Cat', 'image': make_image(),
        })

        self.assertRedirects(response, reverse('list pets'))
        self.assertEqual(self.visitor, Pet.objects.get(name='Tom').user)

    def test_petDetail_whenOwner_shouldShowEditAndHideCommentForm(self):
        self.login(self.owner)

        response = self.client.get(reverse('pet details', args=[self.pet.pk]))

        self.assertContains(response, reverse('edit pet', args=[self.pet.pk]))
        self.assertNotContains(response, 'Add comment')
        self.assertNotContains(response, reverse('like pet', args=[self.pet.pk]))

    def test_petDetail_whenNotOwner_shouldShowLikeAndCommentForm(self):
        self.login(self.visitor)

        response = self.client.get(reverse('pet details', args=[self.pet.pk]))

        self.assertNotContains(response, reverse('edit pet', args=[self.pet.pk]))
        self.assertContains(response, 'Add comment')
        self.assertContains(response, 'far fa-heart')

    def test_likePet_whenNotOwner_shouldToggleLike(self):
        self.login(self.visitor)
        url = reverse('like pet', args=[self.pet.pk])

        self.client.post(url)
        self.assertContains(self.client.get(reverse('pet details', args=[self.pet.pk])), 'fas fa-heart')
        self.client.post(url)

        self.assertFalse(Like.objects.exists())

    def test_likePet_whenOwner_shouldReturn403(self):
        self.login(self.owner)

        self.assertEqual(403, self.client.post(reverse('like pet', args=[self.pet.pk])).status_code)

    def test_comment_whenNotOwner_shouldSaveWithUser(self):
        self.login(self.visitor)

        self.client.post(reverse('pet details', args=[self.pet.pk]), {'comment': 'Cute!'})

        self.assertEqual(self.visitor, Comment.objects.get().user)

    def test_comment_whenOwner_shouldReturn403(self):
        self.login(self.owner)

        response = self.client.post(reverse('pet details', args=[self.pet.pk]), {'comment': 'Mine'})

        self.assertEqual(403, response.status_code)

    def test_editPet_whenNotOwner_shouldReturn403(self):
        self.login(self.visitor)

        self.assertEqual(403, self.client.get(reverse('edit pet', args=[self.pet.pk])).status_code)

    def test_deletePet_whenOwner_shouldDelete(self):
        self.login(self.owner)

        response = self.client.post(reverse('delete pet', args=[self.pet.pk]))

        self.assertRedirects(response, reverse('list pets'))
        self.assertFalse(Pet.objects.exists())

    def test_deletePet_whenNotOwner_shouldReturn403(self):
        self.login(self.visitor)

        self.assertEqual(403, self.client.post(reverse('delete pet', args=[self.pet.pk])).status_code)
        self.assertTrue(Pet.objects.exists())

    def test_petDetail_whenInvalidComment_shouldRerenderWithErrors(self):
        self.login(self.visitor)

        response = self.client.post(reverse('pet details', args=[self.pet.pk]), {'comment': ''})

        self.assertEqual(200, response.status_code)
        self.assertFalse(Comment.objects.exists())

    def test_admin_petChangelist_shouldRender(self):
        self.client.force_login(User.objects.create_superuser(username='admin', password='admin12345'))

        response = self.client.get(reverse('admin:pets_pet_changelist'))

        self.assertContains(response, 'Rex')
