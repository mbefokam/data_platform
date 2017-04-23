var mysql = require('mysql');
var env = process.env.MODE_ENV || "local";

var config = require('./config.json')[env];
config["user"] = "root";
var pool = mysql.createPool(config);


var getConnection = function (callback){
    
    
    pool.getConnection (function(err, connection){

        
        callback(err, connection);
    })
}


module.exports.numberConnections = function(){

    
    return pool._freeConnections.length;

}

module.exports.getConnection = getConnection;