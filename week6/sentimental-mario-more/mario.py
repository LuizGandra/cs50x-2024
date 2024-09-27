from cs50 import get_int

while True:
    height = get_int("Height: ")
    if height >= 1 and height <= 8:
        break

count = 1

for _ in range(height):
    print((" " * (height - count)) + ("#" * count), end="")
    print("  ", end="")
    print(("#" * count))
    count += 1