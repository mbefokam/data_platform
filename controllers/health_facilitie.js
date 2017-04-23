var healthFacilitie = require('../models/index').FACILITIES;
var address = require('../models/index').LOCATIONS;
var reference_data = require('../models/index').REFERENCES;
var async = require('async');
var empty = require('is-empty');
var list = require('../models/index').LIST;



module.exports.data = function ( cb) {
   
    var healthData = healthFacilitie.build();
    
    healthData.retrieveAll(function (data) {
        cb(data);
    })

}

module.exports.insertData = function (req, cb) {
    var health_facilitie;
    var data = req;
    var response= [];
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
        console.log(data[i].street_2);
         reference ={
             "flag_saf" : data[i].flag_saf,
             "flag_mhf" : data[i].flag_mhf,
             "flag_mc" :  data[i].flag_mc,
             "flag_md" :  data[i].flag_md,
             "flag_np_ss" : data[i].flag_np_ss,
             "flag_pi" : data[i].flag_pi,
             "flag_gl" : data[i].flag_gl,
             "flag_vet" : data[i].flag_vet,
             "flag_pw" : data[i].flag_pw,
             "flag_hv" : data[i].flag_hv,
             "flag_dv" : data[i].flag_dv,
             "flag_chld" : data[i].flag_chld,
             "flag_yad" : data[i].flag_yad,
             "flag_adlt" : data[i].flag_adlt,
             "flag_snr" : data[i].flag_snr,
             "flag_si" : data[i].flag_si,
             "filter_military" : data[i].filter_military,
             "filter_inpatient_svc" : data[i].filter_inpatient_svc,
             "filter_residential_pgm" : data[i].filter_residential_pgm,
             "vet" : data[i].vet  
         }
        
        async.waterfall([
            function (callback) {
                var facilitie = healthFacilitie.build();
                facilitie.createFacilities(health_facilitie, function (healthFacilitie) {   
                response.push(healthFacilitie);
                callback(null, healthFacilitie);
                });
                
            }
        
            ], function (err, healthFacilitie) {
             
            async.parallel([
             function (callback) {
                 location.hf_id= healthFacilitie.id;
                 
                var locations = address.build();
                locations.createAddress(location, function (locationData) {   
                callback(locationData);
                });
            }, 
            function (callback) {
                reference.hf_id= healthFacilitie.id;    
                var references = reference_data.build();
                references.createReference(reference, function (referenceData) {   
                callback(referenceData);
                });
            }
         ], function (res) {
               response.push(res);
            })
        })
    };
    cb(response);
   
}
