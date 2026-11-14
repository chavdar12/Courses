from unittest import TestCase, main

from validate_url import validate_url


class ValidateUrlTests(TestCase):
    def test_validateUrl_whenOnlyHost_shouldUseDefaultPortAndPath(self):
        expected = ['Protocol: http', 'Host: softuni.bg', 'Port: 80', 'Path: /']
        self.assertEqual(expected, validate_url('http://softuni.bg/'))

    def test_validateUrl_whenAllParts_shouldPrintQueryAndFragment(self):
        expected = [
            'Protocol: https',
            'Host: softuni.bg',
            'Port: 447',
            'Path: /search',
            'Query: Query=pesho&Users=true',
            'Fragment: go',
        ]
        self.assertEqual(expected, validate_url('https://softuni.bg:447/search?Query=pesho&Users=true#go'))

    def test_validateUrl_whenHttpsWithoutPort_shouldUse443(self):
        self.assertIn('Port: 443', validate_url('https://my-site.bg'))

    def test_validateUrl_whenEncoded_shouldDecodeFirst(self):
        self.assertIn('Query: q=1', validate_url('http%3A%2F%2Fsoftuni.bg%2Fsearch%3Fq%3D1'))

    def test_validateUrl_whenInvalid_shouldReturnInvalidUrl(self):
        for url in ('http://google:443/', 'https://mysite:80/demo/index.aspx', 'somesite.com:80/search?', 'https/mysite.bg?id=2'):
            with self.subTest(url=url):
                self.assertEqual(['Invalid URL'], validate_url(url))


if __name__ == '__main__':
    main()
