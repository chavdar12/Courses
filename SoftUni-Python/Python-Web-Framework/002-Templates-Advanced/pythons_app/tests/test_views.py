from django.test import TestCase
from django.urls import reverse

from pythons_app.models import Python


class TestPythonViews(TestCase):
    def test_index_whenPythonsExist_shouldRenderThemWithBaseTemplate(self):
        Python.objects.create(
            name="Ball Python", description="Royal python", image="https://example.com/ball.jpg"
        )

        response = self.client.get(reverse("index"))

        self.assertTemplateUsed(response, "base.html")
        self.assertTemplateUsed(response, "common/header.html")
        self.assertTemplateUsed(response, "common/footer.html")
        self.assertTemplateUsed(response, "python_detail.html")
        self.assertContains(response, "Ball Python")

    def test_create_whenValid_shouldSaveAndRedirect(self):
        response = self.client.post(
            reverse("create"),
            {
                "name": "Green Tree",
                "description": "Green",
                "image": "https://example.com/green.jpg",
            },
        )

        self.assertRedirects(response, reverse("index"))
        self.assertEqual(1, Python.objects.count())

    def test_create_whenInvalid_shouldNotSave(self):
        response = self.client.post(
            reverse("create"), {"name": "", "description": "", "image": "not-url"}
        )

        self.assertEqual(200, response.status_code)
        self.assertTemplateUsed(response, "create.html")
        self.assertEqual(0, Python.objects.count())
