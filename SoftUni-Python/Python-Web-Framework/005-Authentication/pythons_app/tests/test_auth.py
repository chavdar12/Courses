from django.contrib.auth.models import User, Group
from django.test import TestCase
from django.urls import reverse


class TestAuthentication(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="peter", password="pesho123456")

    def test_userGroup_shouldBeCreatedWithAddAndViewPermissions(self):
        group = Group.objects.get(name="User")

        self.assertSetEqual(
            {"add_python", "view_python"},
            set(group.permissions.values_list("codename", flat=True)),
        )

    def test_login_whenValidCredentials_shouldLoginAndRedirect(self):
        response = self.client.post(
            reverse("login"), {"username": "peter", "password": "pesho123456"}
        )

        self.assertRedirects(response, reverse("index"))
        self.assertContains(self.client.get(reverse("index")), "Hello, peter!")

    def test_login_whenInvalidCredentials_shouldShowError(self):
        response = self.client.post(reverse("login"), {"username": "peter", "password": "wrong"})

        self.assertContains(response, "Invalid username or password")

    def test_logout_shouldLogoutAndRedirect(self):
        self.client.force_login(self.user)

        response = self.client.post(reverse("logout"))

        self.assertRedirects(response, reverse("index"))
        self.assertContains(self.client.get(reverse("index")), "Login")

    def test_create_whenAnonymous_shouldReturn401(self):
        response = self.client.get(reverse("create"))

        self.assertEqual(401, response.status_code)
        self.assertTemplateUsed(response, "401.html")

    def test_create_whenUserNotInGroup_shouldReturn401(self):
        self.client.force_login(self.user)

        self.assertEqual(401, self.client.get(reverse("create")).status_code)

    def test_create_whenUserInGroup_shouldOpen(self):
        self.user.groups.add(Group.objects.get(name="User"))
        self.client.force_login(self.user)

        self.assertEqual(200, self.client.get(reverse("create")).status_code)

    def test_create_whenSuperuser_shouldOpen(self):
        admin = User.objects.create_superuser(username="admin", password="admin123456")
        self.client.force_login(admin)

        self.assertEqual(200, self.client.get(reverse("create")).status_code)
