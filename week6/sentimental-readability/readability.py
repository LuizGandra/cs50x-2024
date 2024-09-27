def main():
    text = input("Text: ")

    letters = count_letters(text)
    words = count_words(text)
    sentences = count_sentences(text)

    # COLEMAN LIAU INDEX
    L = letters / words * 100
    S = sentences / words * 100
    index = round(0.0588 * L - 0.296 * S - 15.8)

    if index < 1:
        print("Before Grade 1")
    elif index >= 16:
        print("Grade 16+")
    else:
        print(f"Grade {index}")


def count_letters(text):
    letters = 0

    for c in text:
        if c.isalpha():
            letters += 1

    return letters


def count_words(text):
    words = 1

    for c in text:
        if c == " ":
            words += 1

    return words


def count_sentences(text):
    sentences = 0

    for c in text:
        if c == "." or c == "!" or c == "?":
            sentences += 1

    return sentences


main()