STATUS_TEXTS = {
    200: "OK",
    404: "Not Found",
}


def parse_request(valid_paths, request_line):
    allowed = set()
    for line in valid_paths:
        path, method = line.rsplit("/", 1)
        allowed.add((path, method.upper()))

    method, path, _ = request_line.split()
    status = 200 if (path, method.upper()) in allowed else 404
    text = STATUS_TEXTS[status]

    return (
        f"HTTP/1.1 {status} {text}\nContent-Length: {len(text)}\nContent-Type: text/plain\n\n{text}"
    )


if __name__ == "__main__":
    paths = []
    while (line := input()) != "END":
        paths.append(line)
    print(parse_request(paths, input()))
