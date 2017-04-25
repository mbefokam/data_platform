var express = require('express');
var router = express.Router();
var request = require("request");
var health_facilities = require('../controllers/health_facilitie')

router.get('/health/facilities/active', function (req, res) {
    
     health_facilities.retrieveAllactive(function (healthData) {
         if (healthData) {
             res.json(healthData);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });

router.delete('/data', function (req, res) {
    
     health_facilities.delete(function (healthData) {
         if (healthData) {
             res.json(healthData);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });

router.get('/data', function (req, res) {
    var resObj = {
        url: "https://data.cityofnewyork.us/resource/8nqg-ia7v.json"
        , method: 'GET'
        , json: req.body
    };
    request(resObj, function (error, response, body) {
        if (error) {
            res.send(response.statusCode);
        }
        else {
            health_facilities.insertData(body, function (success) {
                if (success) {
                    res.json(success);
                }
                else {
                    res.json(401, "not data to return.");
                }
            }, function (err) {
                res.status(500).json(err);
            });
            
        }
    });
});
router.get('/health/facilities', function (req, res) {
    
     health_facilities.data(function (healthData) {
         if (healthData) {
             res.json(healthData);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });
module.exports = router;