-- Keep a log of any SQL queries you execute as you solve the mystery.

-- Hints
-- [OK] Theft took place on July 28, 2023
-- [OK] Theft took place on Humphrey Street

-- Log
SELECT * FROM crime_scene_reports
WHERE day = 28 AND month = 7 AND year = 2023 AND street = 'Humphrey Street';

-- [OK] The theft took place at 10:15am at the bakery
-- [OK] Three witnesses, each of their interview transcripts mentions the bakery

SELECT name, transcript FROM interviews
WHERE day = 28 AND month = 7 AND year = 2023 AND transcript LIKE '%bakery%';

-- Ruth:
    -- [OK] 10 minutes of the theft, the thief got into a car in the bakery parking lot and drove away
    SELECT license_plate FROM bakery_security_logs
    WHERE day = 28 AND month = 7 AND year = 2023 AND hour = 10
    AND minute >= 15 AND minute <= 25 AND activity = 'exit'

-- Eugene:
    -- [OK] saw the thief withdrawing money from the ATM on Leggett Street the same morning
    SELECT bank_accounts.account_number, people.name, people.passport_number, people.phone_number, people.license_plate FROM bank_accounts
    JOIN people ON people.id = bank_accounts.person_id
    JOIN atm_transactions atm ON bank_accounts.account_number = atm.account_number
    WHERE day = 28 AND month = 7 AND year = 2023 AND atm_location = 'Leggett Street' AND transaction_type = 'withdraw';

    -- [USELESS] the bakery belongs to Emma

-- joining the clues:
SELECT people.name, people.phone_number, people.passport_number, people.license_plate FROM people
JOIN bank_accounts bank ON people.id = bank.person_id
JOIN atm_transactions atm ON bank.account_number = atm.account_number
JOIN bakery_security_logs logs ON people.license_plate = logs.license_plate
WHERE logs.day = 28 AND logs.month = 7 AND logs.year = 2023 AND logs.hour = 10 AND logs.minute >= 15 AND logs.minute <= 25 AND logs.activity = 'exit'
AND atm.day = 28 AND atm.month = 7 AND atm.year = 2023 AND atm.atm_location = 'Leggett Street' AND atm.transaction_type = 'withdraw';

-- output:
-- | name  |  phone_number  | passport_number | license_plate |
-- +-------+----------------+-----------------+---------------+
-- | Bruce | (367) 555-5533 | 5773159633      | 94KL13X       |
-- | Diana | (770) 555-1861 | 3592750733      | 322W7JE       |
-- | Iman  | (829) 555-5269 | 7049073643      | L93JTIZ       |
-- | Luca  | (389) 555-5198 | 8496433585      | 4328GD8       |

-- Raymond:
    -- [OK] the thief called someone who talked to him for less than a minute

    SELECT caller, receiver FROM phone_calls
    WHERE day = 28 AND month = 7 AND year = 2023 AND duration < 60;

    -- joining the clues again:
    SELECT people.name, people.phone_number, people.passport_number, people.license_plate FROM people
    JOIN bank_accounts bank ON people.id = bank.person_id
    JOIN atm_transactions atm ON bank.account_number = atm.account_number
    JOIN bakery_security_logs logs ON people.license_plate = logs.license_plate
    JOIN phone_calls phone ON people.phone_number = phone.caller
    WHERE logs.day = 28 AND logs.month = 7 AND logs.year = 2023 AND logs.hour = 10 AND logs.minute >= 15 AND logs.minute <= 25 AND logs.activity = 'exit'
    AND atm.day = 28 AND atm.month = 7 AND atm.year = 2023 AND atm.atm_location = 'Leggett Street' AND atm.transaction_type = 'withdraw'
    AND phone.day = 28 AND phone.month = 7 AND phone.year = 2023 AND phone.duration < 60;

    -- output:
    -- | name  |  phone_number  | passport_number | license_plate |
    -- +-------+----------------+-----------------+---------------+
    -- | Bruce | (367) 555-5533 | 5773159633      | 94KL13X       |
    -- | Diana | (770) 555-1861 | 3592750733      | 322W7JE       |

    -- [OK] the thief planned to take the earliest flight out of Fiftyville tomorrow

    SELECT flights.id, origin.full_name, origin.city,
    destination.full_name, destination.city,
    flights.hour, flights.minute FROM flights
    JOIN airports origin ON origin.id = flights.origin_airport_id
    JOIN airports destination ON destination.id = flights.destination_airport_id
    JOIN passengers ON flights.id = passengers.flight_id
    WHERE flights.day = 29 AND flights.month = 7 AND flights.year = 2023
    ORDER BY flights.hour, flights.minute LIMIT 1;

    -- joining all the clues:
    SELECT people.name, people.phone_number, people.passport_number, people.license_plate FROM people
    JOIN bank_accounts bank ON people.id = bank.person_id
    JOIN atm_transactions atm ON bank.account_number = atm.account_number
    JOIN bakery_security_logs logs ON people.license_plate = logs.license_plate
    JOIN phone_calls phone ON people.phone_number = phone.caller
    JOIN passengers on passengers.passport_number = people.passport_number
    JOIN flights ON passengers.flight_id = flights.id
    JOIN airports origin ON origin.id = flights.origin_airport_id
    JOIN airports destination ON destination.id = flights.destination_airport_id
    WHERE logs.day = 28 AND logs.month = 7 AND logs.year = 2023 AND logs.hour = 10 AND logs.minute >= 15 AND logs.minute <= 25 AND logs.activity = 'exit'
    AND atm.day = 28 AND atm.month = 7 AND atm.year = 2023 AND atm.atm_location = 'Leggett Street' AND atm.transaction_type = 'withdraw'
    AND phone.day = 28 AND phone.month = 7 AND phone.year = 2023 AND phone.duration < 60
    AND flights.day = 29 AND flights.month = 7 AND flights.year = 2023
    ORDER BY flights.hour, flights.minute LIMIT 1;

    -- output:
    -- | name  |  phone_number  | passport_number | license_plate |
    -- +-------+----------------+-----------------+---------------+
    -- | Bruce | (367) 555-5533 | 5773159633      | 94KL13X       |

    -- The thief is Bruce, he escaped to New York City

    -- [OK] the accomplice was on the phone and bought the plane ticket
    SELECT name FROM people WHERE phone_number = (
        SELECT phone.receiver AS receiver_phone_number FROM people
        JOIN bank_accounts bank ON people.id = bank.person_id
        JOIN atm_transactions atm ON bank.account_number = atm.account_number
        JOIN bakery_security_logs logs ON people.license_plate = logs.license_plate
        JOIN phone_calls phone ON people.phone_number = phone.caller
        JOIN passengers on passengers.passport_number = people.passport_number
        JOIN flights ON passengers.flight_id = flights.id
        JOIN airports origin ON origin.id = flights.origin_airport_id
        JOIN airports destination ON destination.id = flights.destination_airport_id
        WHERE logs.day = 28 AND logs.month = 7 AND logs.year = 2023 AND logs.hour = 10 AND logs.minute >= 15 AND logs.minute <= 25 AND logs.activity = 'exit'
        AND atm.day = 28 AND atm.month = 7 AND atm.year = 2023 AND atm.atm_location = 'Leggett Street' AND atm.transaction_type = 'withdraw'
        AND phone.day = 28 AND phone.month = 7 AND phone.year = 2023 AND phone.duration < 60
        AND flights.day = 29 AND flights.month = 7 AND flights.year = 2023
        ORDER BY flights.hour, flights.minute LIMIT 1
    );

    -- output:
    -- |     caller     |    receiver    |
    -- +----------------+----------------+
    -- | (367) 555-5533 | (375) 555-8161 |

    -- The accomplice is Robin