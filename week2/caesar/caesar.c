#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char rotate(char c, int k);

int main(int argc, string argv[])
{
    // check if the number of args is valid
    if (argc != 2)
		{
        printf("Usage: ./caesar key\n");
        return 1;
    }
		else
		{
        // check if all the characteres are digits
        for (int i = 0, len = strlen(argv[1]); i < len; i++)
				{
            if (!isdigit(argv[1][i]))
						{
                printf("Usage: ./caesar key\n");
                return 1;
            }
        }
        // check if the number is a non-negative integer
        if (atoi(argv[1]) < 0)
				{
            printf("Usage: ./caesar key\n");
            return 1;
        }
    }

    // convert the key to int
    int k = atoi(argv[1]);

    // get the plaintext from the user's input
    string plaintext = get_string("plaintext:  ");

    int length = strlen(plaintext);

    char ciphertext[length + 1];

    // rotate all the chars of the word
    for (int i = 0; i < length; i++)
        ciphertext[i] = rotate(plaintext[i], k);

    ciphertext[length] = '\0';

    printf("ciphertext: %s\n", ciphertext);

    return 0;
}

// rotate the char if it's a letter
char rotate (char c, int k)
{
    if (!isalpha(c))
        return c;
    if (isupper(c))
        c = ((c + k - 'A') % 26) + 'A';
    else if (islower(c))
        c = ((c + k - 'a') % 26) + 'a';
    return c;
}