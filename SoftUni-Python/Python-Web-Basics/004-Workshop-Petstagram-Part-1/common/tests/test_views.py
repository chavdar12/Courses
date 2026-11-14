from django.test import TestCase
from django.urls import reverse


class LandingPageViewTests(TestCase):
    def test_getLandingPage_shouldRenderLandingTemplate(self):
        response = self.client.get(reverse('landing page'))

        self.assertTemplateUsed(response, 'landing_page.html')
        self.assertTemplateUsed(response, 'base.html')
        self.assertContains(response, 'Welcome to Petstagram!')
