#include <cs50.h>
#include <math.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>

int count_letters(string text);
int count_words(string text);
int count_sentences(string text);

int main(void)
{
    // get text from user's input
    string text = get_string("Text: ");

    // count letters, words and sentences
    int letters = count_letters(text);
    int words = count_words(text);
    int sentences = count_sentences(text);

    // COLEMAN LIAU INDEX
    float L = ((float) letters / words) * 100.0;
    float S = ((float) sentences / words) * 100.0;
    int index = round(0.0588 * L - 0.296 * S - 15.8);

    // print readability
    if (index < 1)
        printf("Before Grade 1\n");
    else if (index >= 16)
        printf("Grade 16+\n");
    else
        printf("Grade %i\n", index);
}

int count_letters(string text)
{
    int letters = 0;

    for (int i = 0, len = strlen(text); i < len; i++)
		{
        if (isalpha(text[i]))
            letters++;
    }
    return letters;
}

int count_words(string text)
{
    int words = 1;

    for (int i = 0, len = strlen(text); i < len; i++)
		{
        if (text[i] == ' ')
            words++;
    }
    return words;
}

int count_sentences(string text)
{
    int sentences = 0;

    for (int i = 0, len = strlen(text); i < len; i++)
		{
        if (text[i] == '.' || text[i] == '!' || text[i] == '?')
            sentences++;
    }
    return sentences;
}