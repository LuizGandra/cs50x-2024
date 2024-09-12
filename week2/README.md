# Problem Set 2
All exercises in Problem Set 2.

## Scrabble
Implement a program in C that determines the winner of a short Scrabble-like game. Your program should prompt for input twice, once for each player. Then, depending on which player scores the most points, your program should either print "Player 1 wins!", "Player 2 wins!" or "Tie!".

Scrabble is a game where players create words to score points, and the number of points is the sum of the point values of each letter in the word.

| Letter |  A  |  B  |  C  |  D  |  E  |  F  |  G  |  H  |  I  |  J  |  K  |  L  |  M  |  N  |  O  |  P  |  Q  |  R  |  S  |  T  |  U  |  V  |  W  |  X  |  Y  |  Z  |
|:-----:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Value |  1  |  3  |  3  |  2  |  1  |  4  |  2  |  4  |  1  |  8  |  5  |  1  |  3  |  1  |  1  |  3  | 10  |  1  |  1  |  1  |  1  |  4  |  4  |  8  |  4  | 10  |

For example, "CODE" is worth 7 points.

```
$ ./scrabble                                                                    
Player 1: Question?                                                             
Player 2: Question!                                                             
Tie!
```

```
$ ./scrabble                                                                    
Player 1: red                                                                   
Player 2: wheelbarrow                                                           
Player 2 wins!
```

```
$ ./scrabble                                                                    
Player 1: COMPUTER                                                              
Player 2: science                                                               
Player 1 wins!
```

*More details: https://cs50.harvard.edu/x/2024/psets/2/scrabble/*

## Readability
Implement a program that calculates the approximate grade level needed to comprehend some text. Your program should print as output "Grade X" where "X" is the grade level computed, rounded to the nearest integer. If the grave level is 16 or higher, your program should output "Grade 16+" instead of giving the exact number. If the grade level is less than 1, your program should output "Before Grade 1".
*This algorithm uses the Coleman-Liau index, a test designed to output the U.S. grade level that is needed to understand some text. More details in the link below!*

```
$ ./readability
Text: One fish. Two fish. Red fish. Blue fish.
Before Grade 1
```

```
$ ./readability
Text: Congratulations! Today is your day. You're off to Great Places! You're off and away!
Grade 3
```

```
$ ./readability
Text: A large class of computational problems involve the determination of properties of graphs, digraphs, integers, arrays of integers, finite families of finite sets, boolean formulas and elements of other countable domains.
Grade 16+
```

*More details: https://cs50.harvard.edu/x/2024/psets/2/readability/*

## Caesar
Implement a program that enables you to encrypt messages using Caesar's cipher. At the time the user executes the program, they should decide, by providing a command-line argument, what the key should be in the secret message they'll provide at runtime. We shouldn't necessarily assume that the user's key is going to be a number; though you may assume that, if it is a number, it will be a positive integer.

```
$ ./caesar
Usage: ./caesar key
```

```
$ ./caesar HELLO
Usage: ./caesar key
```

```
$ ./caesar 1 2 3
Usage: ./caesar key
```

```
$ ./caesar 13
plaintext:  Hi there!
ciphertext: Uv gurer!
```

*More details: https://cs50.harvard.edu/x/2024/psets/2/caesar/*

## Substitution
Implement a program that enables you to encrypt messages using a substitution cipher. At the time the user executes the program, they should decide, by providing a command-line argument, on what the key should be in the secret message they'll provide at runtime.
*The key is a 26-character string like NQXPOMAFTRHLZGECYJIUWSKDVB. This means that A should be converted into N, B should be converted into Q, and so on.*

```
$ ./substitution
Usage: ./substitution key
```

```
$ ./substitution ABC
Key must contain 26 characters.
```

```
$ ./substitution 1 2 3
Usage: ./substitution key
```

```
$ ./substitution YTNSHKVEFXRBAUQZCLWDMIPGJO
plaintext:  Hello!
ciphertext: Ehbbq!
```

*More details: https://cs50.harvard.edu/x/2024/psets/2/substitution/*
