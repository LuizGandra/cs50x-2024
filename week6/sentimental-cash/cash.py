from cs50 import get_float

def main():
    cents = getChange() * 100
    coinsQuantity = 0

    quarter = 25
    dime = 10
    nickel = 5
    pennies = 1

    while cents > 0:
        coinValue = 0

        if cents >= quarter:
            coinValue = quarter
        elif cents >= dime:
            coinValue = dime
        elif cents >= nickel:
            coinValue = nickel
        elif cents >= pennies:
            coinValue = pennies

        coins = countCoins(cents, coinValue)
        coinsQuantity += coins
        cents -= coins * coinValue

    print(coinsQuantity)


def countCoins(cents, coinValue):
    coinsQuantity = 0

    while True:
        coinsQuantity += 1
        cents -= coinValue
        if cents < coinValue:
            break

    return coinsQuantity


def getChange():
    dollars = 0

    while True:
        dollars = get_float("Change owed: ")
        if dollars > 0:
            break

    return dollars


main()