#include <cs50.h>
#include <stdio.h>

long getNumber(void);
int checkCardValidity(long number);
string checkCardFlag(long number);

int main(void)
{
    long number = getNumber();
    string result = checkCardFlag(number);
    printf("%s\n", result);
}

// get the user's card number
long getNumber(void)
{
    long number;

    do {
        number = get_long("Number: ");
    } while (number < 0);

    return number;
}

// check card validity by Lunh's Algorithm
int checkCardValidity(long number)
{
    int controller = 1;
    int sumFromLast = 0;
    int sumFromSecondToLast = 0;

    // LUHN'S ALGORITHM
    sumFromLast += number % 10;

    while (number > 0)
		{
        number /= 10;

        if (controller == 1)
				{
            int digit = number % 10;
            int n = digit * 2;

            if (n > 8)
						{
                while (n > 0)
								{
                    sumFromSecondToLast += n % 10;
                    n /= 10;
                }
            }
						else
						{
                sumFromSecondToLast += n;
            }

            controller = 0;
        }
				else if (controller == 0)
				{
            sumFromLast += number % 10;
            controller = 1;
        }
    }

    int totalSum = sumFromLast + sumFromSecondToLast;

    if (totalSum % 10 == 0)
        return 1;
    return 0;
}

// check what is the card flag
string checkCardFlag(long number)
{
    int isValid = checkCardValidity(number);

    if (isValid == 1)
		{
        // check the flag by the last two numbers
        int numberCount = 0;
        while (number >= 100)
				{
            number /= 10;
            numberCount++;
        }
        numberCount += 2;

        if (numberCount == 15 && (number == 34 || number == 37))
            return "AMEX";
        else if (numberCount == 16 && (number == 51 || number == 52 || number == 53 || number == 54 || number == 55))
            return "MASTERCARD";
        else if ((numberCount == 13 || numberCount == 16) && (number / 10 == 4))
            return "VISA";
        else
            return "INVALID";
    }
		else
		{
        return "INVALID";
    }
}