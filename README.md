# An Application Tutorial

## Purpose
This is a Node.js application that uses [Sequelize](https://sequelize.org/) and [Passport](http://www.passportjs.org/) to manage member sign ins and sign ups at a website. Passport is used to authenticate a member's username and password. Sequelize is used to retrieve and gather member information from a database. It is also used to create new entries in the database for new member sign ups.

## How It Works
### Config
* The *config.json* file stores details about the environment the database will run in. If it is a production environment, the database referenced will be one that is deployed (ie. Heroku). Otherwise, the database will be a localhost database for development or testing.
* The *passport.js* file uses Passport to authenticate a user's email and password and verifies they are in the database. It includes the db that is exported from the models directory. It will send a message to the user if they have an incorrect email or password. Otherwise, it will return the user. Passport is then exported to be used in other files.
* The *isAuthenticated.js* file is middleware that restricts routes a user can visit based on if they are logged in or not. If they are not logged in, they cannot continue to the restricted route and are redirected to the login page.

### Models
* The *index.js* file determines which database from the *config.json* file should be used. If in a production environment, it will use the deployed database (i.e. Heroku). Otherwise, it will run the local database for development or testing. It then reads through all the JavaScript files in the models directory and runs them through Sequelize. This gives all the models access to Sequelize's methods. It also sets up any associations between models to ensure they link properly. All of this is then exported as "db" to be used in other files.
* The *user.js* file is a model for this application. Through Sequelize it creates a "User" table in the database. The table has fields for email and password. Bcrypt is used to encrypt the password before it is stored in the database. The User model also has a method for validating passwords through bcrypt. The model is exported to be used in other files.

### Routes
* The *api-routes.js* file sets up the back-end server routes for the application. It requires all the models that are imported from the *index.js* file as db. It also requires passport which is imported from *passport.js*. All the routes are exported to be used in other files.
    * In the login route, the passport authenticate middleware is used to validate a user's login credentials before logging them in.
    * In the signup route, a user's email and password are stored as new entries in the database through Sequelize. The password is automatically hashed due to how the User model was configured. 
    * In the logout route, a user is logged out of their account.
    * In the user_data route, a user's email and id will be returned through Sequelize if they are signed in. 
* The *html-routes.js* file contains routes that determine which HTML file to render depending on the URL. It requires the isAuthenticated middleware from the config directory. The routes are exported to be used in other files.
    * In the "/" route, a user is redirected to the *members.html* page if they already have an account. Otherwise, the *signup.html* page is rendered.
    * In the "/login" route, a user is redirected to the *members.html* page if they already have an account. Otherwise, the *login.html* page is rendered.
    * In the "/members" route, the isAuthenticated middlware verifies if a user is logged in before they can access the route. If they are logged in, the *members.html* page will render. Otherwise, they will be redirected to the *signup.html* page.

### Public Files
* xxxx

### Server
* xxxx

## Updates for Future Development