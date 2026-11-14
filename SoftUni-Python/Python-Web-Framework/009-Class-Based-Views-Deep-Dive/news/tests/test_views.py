from django.test import TestCase
from django.urls import reverse

from news.models import Source, Article


class TestNewsViews(TestCase):
    def setUp(self):
        self.bbc = Source.objects.create(name='BBC', url='https://bbc.com')
        self.cnn = Source.objects.create(name='CNN', url='https://cnn.com')
        Article.objects.create(title='BBC story', description='d', image_url='https://bbc.com/a.jpg', source=self.bbc)
        Article.objects.create(title='CNN story', description='d', image_url='https://cnn.com/a.jpg', source=self.cnn)

    def test_home_shouldListAllArticles(self):
        response = self.client.get(reverse('home'))

        self.assertContains(response, 'BBC story')
        self.assertContains(response, 'CNN story')

    def test_createSource_whenValid_shouldRedirectToSources(self):
        response = self.client.post(reverse('create source'), {'name': 'Reuters', 'url': 'https://reuters.com'})

        self.assertRedirects(response, reverse('sources'))
        self.assertTrue(Source.objects.filter(name='Reuters').exists())

    def test_createSource_whenInvalidUrl_shouldNotSave(self):
        self.client.post(reverse('create source'), {'name': 'Bad', 'url': 'not a url'})

        self.assertFalse(Source.objects.filter(name='Bad').exists())

    def test_createArticle_whenValid_shouldRedirectHome(self):
        response = self.client.post(reverse('create article'), {
            'title': 'New',
            'description': 'd',
            'image_url': 'https://x.com/a.jpg',
            'source': self.bbc.pk,
        })

        self.assertRedirects(response, reverse('home'))
        self.assertEqual(self.bbc, Article.objects.get(title='New').source)

    def test_createArticle_formShouldHaveBootstrapClasses(self):
        response = self.client.get(reverse('create article'))

        self.assertContains(response, 'class="form-control"')

    def test_sources_shouldOpenSourceUrlInNewTab(self):
        response = self.client.get(reverse('sources'))

        self.assertContains(response, 'href="https://bbc.com" target="_blank"')
        self.assertContains(response, reverse('source details', args=[self.bbc.pk]))

    def test_sourceDetails_shouldListOnlyItsArticles(self):
        response = self.client.get(reverse('source details', args=[self.bbc.pk]))

        self.assertEqual(self.bbc, response.context['source'])
        self.assertContains(response, 'BBC story')
        self.assertNotContains(response, 'CNN story')

    def test_sourceDetails_whenMissing_shouldReturn404(self):
        self.assertEqual(404, self.client.get(reverse('source details', args=[999])).status_code)
