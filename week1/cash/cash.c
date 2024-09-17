#include <cs50.h>
#include <stdio.h>

int getChange(void);
int countCoins(int cents, int coinValue);

int main(void)
{
    int cents = getChange();
    int coinsQuantity = 0;

    int quarter = 25;
    int dime = 10;
    int nickel = 5;
    int pennies = 1;

    // get the lowest amount of coins possible
    while (cents > 0)
		{
        int coinValue = 0;

        // select the biggest coin possible for the cents restant
        if (cents >= quarter)
            coinValue = quarter;
        else if (cents >= dime)
            coinValue = dime;
        else if (cents >= nickel)
            coinValue = nickel;
        else if (cents >= pennies)
            coinValue = pennies;

        int coins = countCoins(cents, coinValue);
        coinsQuantity += coins;
        cents -= coins * coinValue;
    }

    printf("%i\n", coinsQuantity);
}

// get the cents owed from user's input
int getChange(void)
{
    int cents;

    do {
        cents = get_int("Change owed: ");
    } while (cents < 0);

    return cents;
}

// count the max amount of coins of a specific value can be used
int countCoins(int cents, int coinValue)
{
    int coinsQuantity = 0;

    while (cents >= coinValue)
		{
        coinsQuantity++;
        cents -= coinValue;
    }

    return coinsQuantity;
}