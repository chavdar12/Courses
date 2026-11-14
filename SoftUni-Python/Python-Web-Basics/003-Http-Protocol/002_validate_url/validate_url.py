from urllib.parse import unquote, urlparse

DEFAULT_PORTS = {
    'http': 80,
    'https': 443,
}


def validate_url(url):
    parsed = urlparse(unquote(url))
    host = parsed.hostname or ''

    if parsed.scheme not in DEFAULT_PORTS or '.' not in host:
        return ['Invalid URL']

    result = [
        f'Protocol: {parsed.scheme}',
        f'Host: {host}',
        f'Port: {parsed.port or DEFAULT_PORTS[parsed.scheme]}',
        f'Path: {parsed.path or "/"}',
    ]
    if parsed.query:
        result.append(f'Query: {parsed.query}')
    if parsed.fragment:
        result.append(f'Fragment: {parsed.fragment}')
    return result


if __name__ == '__main__':
    print('\n'.join(validate_url(input())))
