import re

with open("Files/even_lines.txt") as file:
    text = file.readlines()

for idx, line in enumerate(text):
    if idx % 2 == 0:
        line = re.sub("[-,.!?]", "@", line.strip("\n"))
        print(*list(reversed(line.split())))
