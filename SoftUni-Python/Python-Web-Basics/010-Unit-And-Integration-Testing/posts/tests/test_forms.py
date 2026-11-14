from django.test import TestCase

from posts.forms import PostForm


class PostFormTests(TestCase):
    def test_postForm_whenValid_shouldSaveAsNotFound(self):
        form = PostForm(data={'title': 'Keys', 'description': 'Car keys', 'location': 'Sofia'})

        self.assertTrue(form.is_valid())
        self.assertFalse(form.save().is_found)

    def test_postForm_whenEmpty_shouldHaveErrorsForEveryField(self):
        form = PostForm(data={})

        self.assertFalse(form.is_valid())
        self.assertEqual({'title', 'description', 'location'}, set(form.errors))

    def test_postForm_shouldNotExposeIsFound(self):
        self.assertNotIn('is_found', PostForm().fields)
