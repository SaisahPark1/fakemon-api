# fakemon-api
A site where creative pokemon lovers post, view, and like fakemon creations from anyone

Available requests:
    GET /health
        Gets the server statistics
    GET /fakemon
        Gets all the objects
    GET /fakemon/:id
        Gets a specific object
    POST /fakemon
        Creates a new object from the body
    PATCH /fakemon/:id
        Updates an object's aspects from the body
    DELETE /fakemon/:id
        Deletes an object from the database

How to install:

npm init
npm i dotenv express mongoose

Create a .env file and put in MONGODB_URI='the mongodb uri', PORT=5500, and NODE_ENV

Run with:
npm run dev

MAKE SURE TO NOTE!
You can edit your access inside middleware.js

ROUTES turns the url into the actual functions
CONTROLLERS dfines the functions and calls services
SERVICES defines which roles can do which actions
The DATABASE finally gets updated when all the above things work out.