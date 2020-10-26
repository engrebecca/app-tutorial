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
// Creates a "config" variable for the environment based on the config.json file
var config = require(__dirname + '/../config/config.json')[env];
// Creates an empty object called "db"
var db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
