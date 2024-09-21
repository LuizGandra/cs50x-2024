// Implements a dictionary's functionality

#include <ctype.h>
#include <stdbool.h>
#include <string.h>
#include <strings.h>
#include <stdio.h>
#include <stdlib.h>

#include "dictionary.h"

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
} node;

const unsigned int N = (LENGTH * ('Z' + 1));
unsigned int table_size = 0;
bool isLoaded = false;

// Hash table
node *table[N];

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    int hash_code = hash(word);
    node *ptr = table[hash_code];

    if (ptr == NULL)
		{
        return false;
    }
		else
		{
        do {
            if (strcasecmp(ptr->word, word) == 0)
                return true;
						else
                ptr = ptr->next;
        } while (ptr != NULL);
    }

    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    int hash_code = 0, value = 0;

    // get the ASCII value of the char
    for (int i = 0, len = strlen(word); i < len; i++)
		{
        if (isalpha(word[i]))
            value = toupper(word[i]) - 'A';
				else
            value = 'A' - word[i];

        hash_code += value * (i + 1);
    }

    return hash_code % N;
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    // set hash table positions pointing to NULL
    for (int i = 0; i < N; i++)
        table[i] = NULL;

    // open the dictionary file
    FILE *source = fopen(dictionary, "r");
    if (source == NULL)
		{
        printf("Could not load %s.\n", dictionary);
        return 1;
    }

    // read each word in the file
    char word[LENGTH + 1];
    int hash_code;

    while(fscanf(source, "%s", word) == 1)
		{
        // create a new node
        node *n = malloc(sizeof(node));
        if (n == NULL)
				{
            printf("Could not create a new node.\n");
            return false;
        }

        strcpy(n->word, word);

        // add each word to the hash table
        hash_code = hash(word);

        n->next = table[hash_code];
        table[hash_code] = n;
        table_size++;
    }

    // close the dictionary file
    fclose(source);

    isLoaded = true;
    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    if (isLoaded)
        return table_size;
    return 0;
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    node *ptr = NULL;

    for (int i = 0; i < N; i++)
		{
        if (table[i] != NULL)
				{
            do {
                ptr = table[i]->next;

                free(table[i]);

                table[i] = ptr;
            } while (ptr != NULL);
        }
    }

    return true;
}