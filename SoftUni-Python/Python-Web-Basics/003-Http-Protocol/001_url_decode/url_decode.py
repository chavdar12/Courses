from urllib.parse import unquote


def decode_url(url):
    return unquote(url)


if __name__ == '__main__':
    print(decode_url(input()))
