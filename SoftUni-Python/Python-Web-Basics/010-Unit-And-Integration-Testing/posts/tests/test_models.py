from django.core.exceptions import ValidationError
from django.test import TestCase

from posts.models import Post


class PostModelTests(TestCase):
    def test_createPost_whenNoIsFound_shouldDefaultToNotFound(self):
        post = Post.objects.create(title='Keys', description='Car keys', location='Sofia')

        self.assertFalse(post.is_found)
        self.assertEqual('Keys', str(post))

    def test_fullClean_whenTitleLongerThan50_shouldRaise(self):
        post = Post(title='a' * 51, description='d', location='Sofia')

        with self.assertRaises(ValidationError) as context:
            post.full_clean()

        self.assertIn('title', context.exception.message_dict)

    def test_fullClean_whenLocationMissing_shouldRaise(self):
        with self.assertRaises(ValidationError):
            Post(title='Keys', description='d').full_clean()
