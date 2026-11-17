phonebook = {}
line = input()
while "-" in line:
    name, number = line.split("-", 1)
    phonebook[name] = number
    line = input()

for _ in range(int(line)):
    name = input()
    print(
        f"{name} -> {phonebook[name]}" if name in phonebook else f"Contact {name} does not exist."
    )
