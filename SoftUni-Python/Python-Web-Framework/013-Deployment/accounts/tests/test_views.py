from django.contrib.auth.models import User
from django.urls import reverse

from accounts.models import UserProfile
from pets.tests import MediaTestCase, make_image


class TestAccountViews(MediaTestCase):
    def test_signup_whenValid_shouldCreateProfileWithDefaultPictureAndLogin(self):
        response = self.client.post(reverse('signup'), {
            'username': 'peter',
            'password1': 'Str0ngPass!word',
            'password2': 'Str0ngPass!word',
        })

        self.assertRedirects(response, reverse('list pets'))
        profile = UserProfile.objects.get(user__username='peter')
        self.assertEqual('profiles/default.png', profile.profile_picture.name)

    def test_login_shouldUseDjangoAuthUrls(self):
        User.objects.create_user(username='peter', password='pass12345')

        response = self.client.post(reverse('login'), {'username': 'peter', 'password': 'pass12345'})

        self.assertRedirects(response, reverse('list pets'))

    def test_userProfile_whenOwnerPostsPicture_shouldUpdateIt(self):
        user = User.objects.create_user(username='peter', password='pass12345')
        profile = user.userprofile
        self.client.force_login(user)

        response = self.client.post(reverse('user profile', args=[profile.pk]), {'profile_picture': make_image()})

        self.assertRedirects(response, reverse('user profile', args=[profile.pk]))
        profile.refresh_from_db()
        self.assertNotEqual('profiles/default.png', profile.profile_picture.name)

    def test_userProfile_whenOtherUserPosts_shouldReturn403(self):
        owner = User.objects.create_user(username='peter', password='x').userprofile
        other = User.objects.create_user(username='george', password='x')
        self.client.force_login(other)

        response = self.client.post(reverse('user profile', args=[owner.pk]), {'profile_picture': make_image()})

        self.assertEqual(403, response.status_code)

    def test_userProfile_whenAnonymous_shouldRedirectToLogin(self):
        response = self.client.get(reverse('user profile', args=[1]))

        self.assertEqual(302, response.status_code)
        self.assertIn(reverse('login'), response.url)
