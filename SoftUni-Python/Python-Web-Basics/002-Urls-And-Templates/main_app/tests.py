from django.test import TestCase
from django.urls import reverse


class MainAppViewsTests(TestCase):
    def test_getIndex_shouldRenderMainTemplateWithLinkToSecondaryApp(self):
        response = self.client.get('/main_app/')

        self.assertTemplateUsed(response, 'main_app/index.html')
        self.assertContains(response, f'href="{reverse("secondary index")}"')
