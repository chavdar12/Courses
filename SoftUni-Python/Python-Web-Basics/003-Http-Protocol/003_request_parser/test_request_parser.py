from unittest import TestCase, main

from request_parser import parse_request


class ParseRequestTests(TestCase):
    def test_parseRequest_whenPathAndMethodAllowed_shouldReturn200(self):
        expected = 'HTTP/1.1 200 OK\nContent-Length: 2\nContent-Type: text/plain\n\nOK'
        self.assertEqual(expected, parse_request(['/register/get', '/register/post'], 'GET /register HTTP/1.1'))

    def test_parseRequest_whenMethodNotAllowed_shouldReturn404(self):
        expected = 'HTTP/1.1 404 Not Found\nContent-Length: 9\nContent-Type: text/plain\n\nNot Found'
        self.assertEqual(expected, parse_request(['/login/get', '/register/get'], 'POST /register HTTP/1.1'))

    def test_parseRequest_whenPathUnknown_shouldReturn404(self):
        self.assertIn('404 Not Found', parse_request(['/index/get', '/index/post'], 'POST /login HTTP/1.1'))

    def test_parseRequest_whenNestedPath_shouldSplitOnLastSlash(self):
        self.assertIn('200 OK', parse_request(['/users/profile/get'], 'GET /users/profile HTTP/1.1'))


if __name__ == '__main__':
    main()
