first, second = input(), input()
for i in range(len(first)):
    if first[i] != second[i]:
        first = first[:i] + second[i] + first[i + 1 :]
        print(first)
