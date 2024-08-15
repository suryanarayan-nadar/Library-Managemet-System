# Library-Management-System

Server >> Storing certain book data >> User Register >> Subscriber

This is a Book Record Management API Server / Backend for the library system or management of records or manuals or books .

Fine System :
User : 06/03/2024 - 06/06/2024
09/06/2024 => 50\*3=150/-

## Subscriptions Types

3 Months (Basic)
6 Months (Standard)
12 Months (Premium)

If the Subscription type is standard && if the subscription date is 06/03/2024
=> then subscription valid till 06/09/2024

within subscription date >> if we miss the renewal >> 50/- day
subscription date is also been missed >> and also missed the renewal >> 100 + 50/- day

> > book1
> > Basic
> > 06/03/2024 -> subscription date
> > 07/03/2024 -> borrowed a book from library
> > book1 renewal date is on 21/03/2024
> > 23/03/2024 -> we need to pay a fine of 50\*2=100/-

> > book2
> > Basic
> > 06/03/2024 -> subscription date
> > 07/03/2024 -> borrowed a book from library
> > book1 renewal date is on 21/03/2024
> > 23/06/2024 -> we need to pay a fine of 100 + (no of days \*50)

missed by renewal date >> 50/-
missed by subscription date >> 100/-
missed by renewal && subscription date >> 150/-

# Routes and Endpoints

## /users

POST : Creating a new user
GET : Get all the user info

## /users/{id}

GET : Get a user by ID
PUT : Update a user bu their ID
DELETE : Delete a user by ID (Check if He/ She still have an issued book) && (Is there any fine to be paid)

## /users/subscription-details/{id}

GET : Get user subscription details >> Date of subscription >> Valid till >> Is there any fine

## /books

GET : G et all the books
POST : Create / Add a new book

## /books/{id0}

GET : Get a book by ID
PUT : Update a book by ID

## /books/issued

GET : Get all issued books

## /books/issued/withFine

GET : Get all the
