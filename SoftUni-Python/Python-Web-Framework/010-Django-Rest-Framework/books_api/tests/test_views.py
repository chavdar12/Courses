from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from books_api.models import Book


class TestBooksApi(APITestCase):
    def setUp(self):
        self.book = Book.objects.create(
            title="Harry Potter", pages=223, description="Wizard", author="J. K. Rowling"
        )

    def test_listBooks_shouldReturnBooksKey(self):
        response = self.client.get(reverse("list books"))

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual("Harry Potter", response.data["books"][0]["title"])

    def test_createBook_whenValid_shouldReturn201(self):
        response = self.client.post(
            reverse("list books"), {"title": "Dune", "pages": 412, "author": "Herbert"}
        )

        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertTrue(Book.objects.filter(title="Dune").exists())

    def test_createBook_whenTitleTooLong_shouldReturn400(self):
        response = self.client.post(reverse("list books"), {"title": "x" * 21, "author": "Herbert"})

        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertIn("title", response.data)

    def test_detailBook_shouldReturnBookKey(self):
        response = self.client.get(reverse("detail book", args=[self.book.pk]))

        self.assertEqual("J. K. Rowling", response.data["book"]["author"])

    def test_detailBook_whenMissing_shouldReturn404(self):
        response = self.client.get(reverse("detail book", args=[999]))

        self.assertEqual(status.HTTP_404_NOT_FOUND, response.status_code)

    def test_updateBook_whenValid_shouldSaveChanges(self):
        response = self.client.post(
            reverse("detail book", args=[self.book.pk]),
            {
                "title": "Harry Potter 2",
                "pages": 251,
                "author": "J. K. Rowling",
            },
        )

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.book.refresh_from_db()
        self.assertEqual("Harry Potter 2", self.book.title)

    def test_deleteBook_shouldRemoveIt(self):
        response = self.client.delete(reverse("detail book", args=[self.book.pk]))

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertFalse(Book.objects.exists())
