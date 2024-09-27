from cs50 import get_int

def main():
    number = getNumber()
    result = checkCardFlag(number)
    print(result)


def getNumber():
    number = 0

    while True:
        number = get_int("Number: ")
        if number >= 0:
            break

    return number


def checkCardValidity(number):
    controller = 1
    sumFromLast = 0
    sumFromSecondToLast = 0

    # LUHN'S ALGORITHM
    sumFromLast += number % 10

    while number > 0:
        number = int(number / 10)

        if controller == 1:
            digit = number % 10
            n = digit * 2

            if n > 8:
                while n > 0:
                    sumFromSecondToLast += n % 10
                    n = int(n / 10)
            else:
                sumFromSecondToLast += n

            controller = 0
        elif controller == 0:
            sumFromLast += number % 10
            controller = 1

    totalSum = sumFromLast + sumFromSecondToLast

    if totalSum % 10 == 0:
        return 1
    else:
        return 0


def checkCardFlag(number):
    isValid = checkCardValidity(number)

    if isValid == 1:
        numberCount = 0

        while number >= 100:
            number = int(number / 10)
            numberCount += 1

        numberCount += 2

        if numberCount == 15 and (number == 34 or number == 37):
            return "AMEX"
        elif numberCount == 16 and (number == 51 or number == 52 or number == 53 or number == 54 or number == 55):
            return "MASTERCARD"
        elif (numberCount == 13 or numberCount == 16) and (int(number / 10) == 4):
            return "VISA"
        else:
            return "INVALID"
    else:
        return "INVALID"


main()