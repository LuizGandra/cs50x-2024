#include <cs50.h>
#include <stdio.h>

int getHeight(void);
void printRow(int spaces, int bricks);

int main(void) {
    int height = getHeight();
    int spaces = height;

    for (int i = 0; i < height; i++) {
        printRow(--spaces, i + 1);
    }
}

int getHeight(void) {
    int height;

    do {
        height = get_int("What's the height of the pyramid? ");
    } while (height < 1);

    return height;
}

void printRow(int spaces, int bricks) {
    for (int i = 0; i < spaces; i++) {
        printf(" ");
    }

    for (int i = 0; i < bricks; i++) {
        printf("#");
    }

    printf("\n");
}