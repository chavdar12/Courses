from django.test import TestCase
from django.urls import reverse


class SecondaryAppViewsTests(TestCase):
    def test_getIndex_shouldRenderSecondaryTemplateWithLinkToMainApp(self):
        response = self.client.get('/secondary_app/')

        self.assertTemplateUsed(response, 'secondary_app/index.html')
        self.assertContains(response, f'href="{reverse("main index")}"')
