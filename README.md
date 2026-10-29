# fakemon-api
A site where creative pokemon lovers post, view, and like fakemon creations from anyone

Available requests:
    GET /health
        Gets the server statistics
    GET api/v1/fakemon
        Gets all the objects
    GET api/v1/fakemon/:id
        Gets a specific object
    POST api/v1/fakemon + token
        Creates a new object from the body
    PATCH api/v1/fakemon/:id + token
        Updates an object's aspects from the body
    DELETE api/v1/fakemon/:id + token
        Deletes an object from the database
    POST api/v1/auth/register
        Registers a new user's information
    POST api/v1/auth/login
        Logs a user in
    GET api/v1/auth/me + token
        Gives user information if they have a token

How to install:

npm init
npm i

Create a .env file and put in MONGODB_URI='the mongodb uri', PORT=5500, and NODE_ENV

Run with:
npm run dev

Chosen filters:
name, ownerId

Reflection:
    The user's password is never meant to be in any response even if it is hashed because it is not necessary to be revealed in the first place. If the limit cap was too high or didn't exist at all, the api would quickly be overloaded with huge responses and be unusable. In stage 3, it will be necessary to actually check records and owners so that unauthorized users are limited.