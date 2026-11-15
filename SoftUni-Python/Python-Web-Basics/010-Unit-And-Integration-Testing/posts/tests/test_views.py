from django.test import TestCase
from django.urls import reverse

from posts.models import Post

VALID_DATA = {
    "title": "Keys",
    "description": "Car keys",
    "location": "Sofia",
}


class IndexViewTests(TestCase):
    def test_getIndex_whenNoPosts_shouldRenderCreateButton(self):
        response = self.client.get(reverse("index"))

        self.assertTemplateUsed(response, "posts/index.html")
        self.assertContains(response, f'href="{reverse("create post")}"')
        self.assertContains(response, "Create")

    def test_getIndex_whenNotFoundPost_shouldShowFoundItButton(self):
        Post.objects.create(**VALID_DATA)

        response = self.client.get(reverse("index"))

        self.assertContains(response, "Not Found")
        self.assertContains(response, "Found it!")

    def test_getIndex_whenFoundPost_shouldHideFoundItButton(self):
        Post.objects.create(**VALID_DATA, is_found=True)

        response = self.client.get(reverse("index"))

        self.assertContains(response, '<span class="badge bg-success">Found</span>', html=True)
        self.assertNotContains(response, "Found it!")
        self.assertNotContains(response, "Not Found")


class CreateViewTests(TestCase):
    def test_getCreate_shouldRenderForm(self):
        response = self.client.get(reverse("create post"))

        self.assertTemplateUsed(response, "posts/create.html")
        self.assertIsNone(response.context["form"].instance.pk)

    def test_postCreate_whenValid_shouldCreateAndRedirect(self):
        response = self.client.post(reverse("create post"), data=VALID_DATA)

        self.assertRedirects(response, reverse("index"))
        self.assertEqual(1, Post.objects.count())

    def test_postCreate_whenInvalid_shouldRenderErrors(self):
        response = self.client.post(reverse("create post"), data={})

        self.assertTemplateUsed(response, "posts/create.html")
        self.assertTrue(response.context["form"].errors)
        self.assertFalse(Post.objects.exists())


class EditViewTests(TestCase):
    def setUp(self):
        self.post = Post.objects.create(**VALID_DATA)

    def test_getEdit_shouldPrefillForm(self):
        response = self.client.get(reverse("edit post", args=[self.post.pk]))

        self.assertTemplateUsed(response, "posts/edit.html")
        self.assertEqual(self.post, response.context["form"].instance)

    def test_postEdit_whenValid_shouldUpdateAndRedirect(self):
        response = self.client.post(
            reverse("edit post", args=[self.post.pk]), data={**VALID_DATA, "title": "Wallet"}
        )

        self.assertRedirects(response, reverse("index"))
        self.post.refresh_from_db()
        self.assertEqual("Wallet", self.post.title)

    def test_getEdit_whenMissingPost_shouldReturn404(self):
        self.assertEqual(
            404, self.client.get(reverse("edit post", args=[self.post.pk + 1])).status_code
        )


class DeleteAndFoundViewsTests(TestCase):
    def setUp(self):
        self.post = Post.objects.create(**VALID_DATA)

    def test_postDelete_shouldDeleteAndRedirect(self):
        response = self.client.post(reverse("delete post", args=[self.post.pk]))

        self.assertRedirects(response, reverse("index"))
        self.assertFalse(Post.objects.exists())

    def test_getDelete_shouldNotBeAllowed(self):
        response = self.client.get(reverse("delete post", args=[self.post.pk]))

        self.assertEqual(405, response.status_code)
        self.assertTrue(Post.objects.exists())

    def test_postFound_shouldMarkFoundAndRedirect(self):
        response = self.client.post(reverse("found post", args=[self.post.pk]))

        self.assertRedirects(response, reverse("index"))
        self.post.refresh_from_db()
        self.assertTrue(self.post.is_found)
