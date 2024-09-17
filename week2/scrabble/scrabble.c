#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>

const int PLAYERS_COUNT = 2;
const char POINTS[] = {1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10};
int playersScores[PLAYERS_COUNT];

int calculate_score(string p);
void print_winner(void);

int main(void)
{
    string playersWords[PLAYERS_COUNT];

    // prompt the user
    playersWords[0] = get_string("Player 1: ");
    playersWords[1] = get_string("Player 2: ");

    // get the scores
    playersScores[0] = calculate_score(playersWords[0]);
    playersScores[1] = calculate_score(playersWords[1]);

    // check and print the winner
    print_winner();
}

// calculate the player's score
int calculate_score(string word)
{
    int score = 0;

    // check the score of each character
    for (int i = 0, len = strlen(word); i < len; i++)
		{
        if (isupper(word[i]))
            score += POINTS[word[i] - 'A'];
        else if (islower(word[i]))
            score += POINTS[word[i] - 'a'];
    }

    return score;
}

// check and print the player with the highest score
void print_winner(void)
{
    if (playersScores[0] > playersScores[1])
        printf("Player 1 wins!\n");
    else if (playersScores[0] < playersScores[1])
        printf("Player 2 wins!\n");
    else
        printf("Tie!\n");
}