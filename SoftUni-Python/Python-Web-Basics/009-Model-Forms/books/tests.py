from django import forms
from django.test import TestCase
from django.urls import reverse

from books.forms import BookForm
from books.models import Book

VALID_DATA = {
    "title": "Dune",
    "pages": 412,
    "author": "Frank Herbert",
    "description": "Spice",
}


class BookModelTests(TestCase):
    def test_createBook_whenOnlyRequired_shouldUseDefaults(self):
        book = Book.objects.create(title="Dune", author="Frank Herbert")

        self.assertEqual(0, book.pages)
        self.assertEqual("", book.description)


class BookFormTests(TestCase):
    def test_bookForm_whenValid_shouldBeValid(self):
        self.assertTrue(BookForm(data=VALID_DATA).is_valid())

    def test_bookForm_whenZeroPages_shouldBeInvalid(self):
        form = BookForm(data={**VALID_DATA, "pages": 0})

        self.assertFalse(form.is_valid())
        self.assertIn("pages", form.errors)

    def test_bookForm_whenTitleLongerThan20_shouldBeInvalid(self):
        self.assertFalse(BookForm(data={**VALID_DATA, "title": "a" * 21}).is_valid())

    def test_bookForm_shouldUseStyledWidgets(self):
        fields = BookForm().fields
        expected = {
            "title": forms.TextInput,
            "pages": forms.NumberInput,
            "author": forms.TextInput,
            "description": forms.Textarea,
        }

        for name, widget in expected.items():
            with self.subTest(field=name):
                self.assertIsInstance(fields[name].widget, widget)
                self.assertEqual("form-control", fields[name].widget.attrs["class"])


class BookViewsTests(TestCase):
    def test_getIndex_shouldListBooks(self):
        Book.objects.create(**VALID_DATA)

        response = self.client.get(reverse("index"))

        self.assertTemplateUsed(response, "books/index.html")
        self.assertContains(response, "Dune")

    def test_postCreate_whenValid_shouldCreateAndRedirect(self):
        response = self.client.post(reverse("create book"), data=VALID_DATA)

        self.assertRedirects(response, reverse("index"))
        self.assertEqual(1, Book.objects.count())

    def test_postCreate_whenInvalid_shouldRenderCreateWithErrors(self):
        response = self.client.post(reverse("create book"), data={**VALID_DATA, "pages": -5})

        self.assertTemplateUsed(response, "books/create.html")
        self.assertFalse(Book.objects.exists())

    def test_getEdit_shouldPrefillFormWithBook(self):
        book = Book.objects.create(**VALID_DATA)

        response = self.client.get(reverse("edit book", args=[book.pk]))

        self.assertTemplateUsed(response, "books/edit.html")
        self.assertContains(response, 'value="Dune"')

    def test_postEdit_whenValid_shouldUpdateAndRedirect(self):
        book = Book.objects.create(**VALID_DATA)

        response = self.client.post(
            reverse("edit book", args=[book.pk]), data={**VALID_DATA, "pages": 500}
        )

        self.assertRedirects(response, reverse("index"))
        book.refresh_from_db()
        self.assertEqual(500, book.pages)

    def test_getEdit_whenMissingBook_shouldReturn404(self):
        self.assertEqual(404, self.client.get(reverse("edit book", args=[1])).status_code)
