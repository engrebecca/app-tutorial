# An Application Tutorial

## Purpose
This is a Node.js application that uses [Sequelize](https://sequelize.org/) and [Passport](http://www.passportjs.org/) to manage member sign ins and sign ups at a website. Passport is used to authenticate a member's username and password. Sequelize is used to retrieve and gather member information from a database. It is also used to create new entries in the database for new member sign ups.

## How It Works
### Config
The config directory contains files that set up the database connection and 
* The config.json file stores details about the environment the database will run in. If it is a production environment, the database referenced will be one that is deployed (ie. Heroku). Otherwise, the database will be a localhost database for development or testing.
* The passport.js file includes the db that is exported from the models directory. It uses Passport to authenticate a user's email and password and verifies they are in the database. It will send a message to the user if they have an incorrect email or password. Otherwise, it will return the user. The passport object is then exported to be used in other files.
* The isAuthenticated.js file is middleware that restricts routes a user can visit based on if they are logged in or not. If they are not logged in, they cannot continue to the restricted route and are redirected to the login page.

### Models
* xxxx

### Routes
* xxxx

### Public Files
* xxxx

### Server
* xxxx

## Updates for Future Development