from django.test import TestCase

from common.forms import CommentForm


class CommentFormTests(TestCase):
    def test_commentForm_whenEmpty_shouldBeInvalid(self):
        self.assertFalse(CommentForm(data={'comment': ''}).is_valid())

    def test_commentForm_shouldOnlyExposeComment(self):
        self.assertEqual(['comment'], list(CommentForm().fields))
