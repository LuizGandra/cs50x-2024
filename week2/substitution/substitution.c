#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char substitution(char c, string k);

int main(int argc, string argv[]) {
    // check if the number of arguments is valid
    if (argc != 2) {
        printf("Usage: ./substitution key\n");
        return 1;
    } else if (strlen(argv[1]) < 26) { // check if the key length is valid
        printf("Key must contain 26 characters.\n");
        return 1;
    } else {
        char key[26];

        // check if the key contain only alphabetic characters
        for (int i = 0, len = strlen(argv[1]); i < len; i++) {
            if (!isalpha(argv[1][i])) {
                printf("Key must contain only alphabetic characters.\n");
                return 1;
            } else {
                // check if the key contain repeated characters
                for (int j = 0; j < i; j++) {
                    if (toupper(key[j]) == toupper(argv[1][i])) {
                        printf("Key cannot contain repeated characters.\n");
                        return 1;
                    }
                }

                key[i] = argv[1][i];
            }
        }
    }

    // get the key
    string k = argv[1];

    // get the plaintext from the user's input
    string plaintext = get_string("plaintext:  ");
    int length = strlen(plaintext);
    char ciphertext[length + 1];

    // replace the characters of the word
    for (int i = 0; i < length; i++) {
        ciphertext[i] = substitution(plaintext[i], k);
    }

    ciphertext[length] = '\0';

    printf("ciphertext: %s\n", ciphertext);

    return 0;
}

// replace the characters
char substitution(char c, string k) {
    if (!isalpha(c)) {
        return c;
    } else if (isupper(c)) {
        int index = c - 'A';
        c = toupper(k[index]);
    } else if (islower(c)) {
        int index = c - 'a';
        c = tolower(k[index]);
    }

    return c;
}