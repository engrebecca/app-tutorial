# An Application Tutorial

## Purpose
This is a Node.js application that uses [Sequelize](https://sequelize.org/) and [Passport](http://www.passportjs.org/) to manage member sign ins and sign ups at a website. Passport is used to authenticate a member's username and password. Sequelize is used to retrieve and gather member information from a database. It is also used to create new entries in the database for new member sign ups.

## How It Works
### Config
* The *config.json* file stores details about the environment the database will run in. If it is a production environment, the database referenced will be one that is deployed (ie. Heroku). Otherwise, the database will be a localhost database for development or testing.
* The *passport.js* file includes the db that is exported from the models directory. It uses Passport to authenticate a user's email and password and verifies they are in the database. It will send a message to the user if they have an incorrect email or password. Otherwise, it will return the user. The passport object is then exported to be used in other files.
* The *isAuthenticated.js* file is middleware that restricts routes a user can visit based on if they are logged in or not. If they are not logged in, they cannot continue to the restricted route and are redirected to the login page.

### Models
* The *index.js* file determines which database from the *config.json* file should be used. If in a production environment, it will use the deployed database (i.e. Heroku). Otherwise, it will run the local database for development or testing. It then reads through all the JavaScript files in the models directory and runs them through Sequelize. This gives all the models access to Sequelize's methods. It also sets up any associations between models to ensure they link properly. All of this is then exported as "db" to be used in other files.
* The *user.js* file is a model for this application. Through Sequelize it creates a "User" table in the database. The table has fields for email and password. Bcrypt is used to encrypt the password before it is stored in the database. The User model also has a method for validating passwords through bcrypt. The model is exported to be used in other files.

### Routes
* xxxx

### Public Files
* xxxx

### Server
* xxxx

## Updates for Future Development