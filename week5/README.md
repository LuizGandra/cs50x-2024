# Problem Set 5
All exercises in Problem Set 5.

## Speller
Implement a program in C that spell-checks a file, a la the below, using a hash table. Example:
*To test this code, download the remaining files from the link below.*

```
$ ./speller dictionaries/large texts/grimm.txt

...
have
been
an
...
Grimm
Brothers

WORDS MISSPELLED:     103614
WORDS IN DICTIONARY:  0
WORDS IN TEXT:        103614
TIME IN load:         0.00
TIME IN check:        0.12
TIME IN size:         0.00
TIME IN unload:       0.00
TIME IN TOTAL:        0.12
```

*More details: https://cs50.harvard.edu/x/2024/psets/5/speller/*

## Inheritance
Implement a program in C that simulates the inheritance of blood types for each member of a family. Example:

```
$ ./inheritance
Child (Generation 0): blood type AO
    Parent (Generation 1): blood type AA
        Grandparent (Generation 2): blood type AA
        Grandparent (Generation 2): blood type AA
    Parent (Generation 1): blood type AO
        Grandparent (Generation 2): blood type AO
        Grandparent (Generation 2): blood type OO
```

*More details: https://cs50.harvard.edu/x/2024/psets/5/inheritance/*