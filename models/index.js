'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);


var env       = process.env.JAWSDB_URL || 'local';


var config    = require('../config/config.json')[env];
var db        = {};


var password = config.password ? config.password : null;
var sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password,
    config/*,{
       pool: {
           max: 5,
            min: 0,
        idle: 10000
       }   
    }*/
   
    
);


fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//Checking connection status
sequelize.authenticate().then(function (err){
    if(err){
        console.log('There is connection ERROR');
    }else{
        console.log('Connection to '+ JSON.stringify({"database": config.database}));
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
