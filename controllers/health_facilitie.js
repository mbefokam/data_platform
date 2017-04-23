var healthFacilitie = require('../models/index').FACILITIES;
var address = require('../models/index').LOCATIONS;
var reference_data = require('../models/index').REFERENCES;
var async = require('async');
var empty = require('is-empty');
var list = require('../models/index').LIST;
var response= new Array();


module.exports.data = function ( cb) {
   
    var healthData = healthFacilitie.build();
    
    healthData.retrieveAll(function (data) {
        cb(data);
    })

}

module.exports.delete = function ( cb) {
   
    /*var healthData = healthFacilitie.build();
    
    healthData.delete(function (data) {
        cb(data);
    })*/
    /*var location = address.build();
    
                location.delete(function (data) {
                    cb(data);
                })*/
    
     async.waterfall([
            function (callback) {
              var location = address.build();
    
                location.delete(function (data) {
                    callback(data);
                })
                
            }
        
            ], function (err, noData) {
              var healthData = healthFacilitie.build();
    
                healthData.delete(function (data) {
                cb(data);
                })
            
        })
 
}

module.exports.insertData = function (req, cb) {
    var health_facilitie;
    var data = req;
    
    var location;
    var reference;
    for (var i = 0; i < data.length; i++) {
       
        health_facilitie = {
            "name_1": data[i].name_1
            , "name_2": data[i].name_2
            , "website": data[i].website
             ,"phone" : data[i].phone
        };
          location = {
                 "street_1": data[i].street_1
                ,"street_2": data[i].street_2
                ,"city" : data[i].city
                ,"zip": data[i].zip
                ,"latitude": data[i].latitude
                ,"longitude" : data[i].longitude
                };
        
        async.waterfall([
            function (callback) {
                var facilitie = healthFacilitie.build();
                facilitie.createFacilities(health_facilitie, function (healthFacilitie) {   
                callback(null, healthFacilitie);
                });
                
            }
        
            ], function (err, healthFacilitie) {
             
            location.hf_id= healthFacilitie.id;
                var locations = address.build();
                locations.createAddress(location, function (locationData) {   
                response.push(locationData);
                
                });
    
        })
    };
    console.log("***************");
    console.log(response);
    console.log("****************");
    cb(response);
   
}
