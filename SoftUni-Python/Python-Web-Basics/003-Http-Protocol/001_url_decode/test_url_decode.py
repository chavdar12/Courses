from unittest import TestCase, main

from url_decode import decode_url


class DecodeUrlTests(TestCase):
    def test_decodeUrl_whenEncodedHash_shouldDecodeIt(self):
        self.assertEqual(
            "http://www.google.bg/search?q=C#", decode_url("http://www.google.bg/search?q=C%23")
        )

    def test_decodeUrl_whenSeveralEncodedChars_shouldDecodeAll(self):
        self.assertEqual(
            "https://mysite.com/show?n@m3= p3$h0",
            decode_url("https://mysite.com/show?n%40m3= p3%24h0"),
        )

    def test_decodeUrl_whenEncodedPercent_shouldDecodeIt(self):
        self.assertEqual(
            "http://url-decoder.com/i#de%?id=23",
            decode_url("http://url-decoder.com/i%23de%25?id=23"),
        )


if __name__ == "__main__":
    main()
