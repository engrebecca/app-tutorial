// Declaring to use strict mode which allows for more secure JavaScript
// An error will be thrown for any bad syntax, like attempting to make assignments to non-writeable properties
'use strict';

// Includes the file system module to access the computer's file system
var fs = require('fs');
// Includes the path module which provides access to work with directories and file paths
var path = require('path');
// Includes Sequelize standard library
var Sequelize = require('sequelize');
// Creates a "basename" variable that is the filename of each module  
var basename = path.basename(module.filename);
// Creates an "env" variable that checks and determines if the environment is for production or development 
var env = process.env.NODE_ENV || 'development';
// Creates a "config" variable that includes the environment based on the config.json file
var config = require(__dirname + '/../config/config.json')[env];
// Creates an empty object called "db"
var db = {};

// Figures out wich database to use, either process.env if deployed to Heroku or the local development or testing database
// Creates a MySQL database connection using Sequelize
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Reads the contents of the models directory and returns an array of all the file names within
fs
  .readdirSync(__dirname)
  // Filters the array of files in models directory and creates a new array of the file names
  // Filters to verify there are other files existing that end in .js and excludes the current index.js file 
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  // Creates a new Sequelize model for each file in the new filtered array, this gives them access to Sequelize's methods
  // Adds each model to the db object which is exported
  .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

// For each object in db, if there is an associate property, it will include it in the db so all model relationships are captured
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sequelize database connection and Sequelize library are added to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// The db object is exported so all models can be imported and referenced in other files
// Allows for interfacing with Sequelize in other files
module.exports = db;
