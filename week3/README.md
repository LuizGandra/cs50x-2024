# Problem Set 3
All exercises in Problem Set 3.

## Sort
In this problem, you'll analyze three compiled sorting programs to determine which algorithms they use. In a file called answers.txt, record your answers, along with an explanation for each program.

*More details: https://cs50.harvard.edu/x/2024/psets/3/sort/*

## Plurality
Implement a program in C that runs a plurality election, the simplest way to hold an election. In the plurality vote, every voter gets to vote for one candidate. At the end of the election, whichever candidate has the greatest number of votes is declared the winner of the election. Example:

```
$ make plurality
$ ./plurality Alice Bob Charlie
Number of voters: 3
Vote: Alice
Vote: Alice
Vote: Bob
Alice
```

*More details: https://cs50.harvard.edu/x/2024/psets/3/plurality/*

## Runoff
Implement a program in C that simulates a runoff election. In a runoff election, voters rank candidates in order of preference. If no candidate has more than 50% of the first-choice votes, the candidate with the fewest votes is eliminated, and voters who selected the eliminated candidate will have their next preference counted. This process repeats until one candidate receives a majority of the votes, ensuring that the winner represents a broader consensus among voters. Example:

```
$ make runoff
$ ./runoff Alice Bob Charlie
Number of voters: 3
Rank 1: Alice
Rank 2: Bob
Rank 3: Charlie

Rank 1: Bob
Rank 2: Alice
Rank 3: Charlie

Rank 1: Alice
Rank 2: Bob
Rank 3: Charlie

Alice
```

*More details: https://cs50.harvard.edu/x/2024/psets/3/runoff/*

## Tideman
Implement a program in C that simulates an election by the Tideman voting method. The Tideman method is a ranked-choice voting system that guarantees the selection of the Condorcet winner if one exists, meaning the candidate who would win against every other candidate in a head-to-head competition. Voters rank candidates in order of preference, and pairs of candidates are compared to determine who wins each head-to-head matchup. These pairs are then sorted by the strength of their victory, and the strongest pairs are locked into a directed graph without creating cycles, ensuring that the final winner represents the broadest voter support. CheckExample:

```
$ make runoff
$ ./runoff Alice Bob Charlie
Number of voters: 3
Rank 1: Alice
Rank 2: Bob
Rank 3: Charlie

Rank 1: Bob
Rank 2: Charlie
Rank 3: Alice

Rank 1: Alice
Rank 2: Bob
Rank 3: Charlie

Alice
```

*More details: https://cs50.harvard.edu/x/2024/psets/3/tideman/*