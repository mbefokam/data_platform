'use strict';
module.exports = function (sequelize, DataTypes) {
    var locations = sequelize.define('LOCATIONS', {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , autoIncrement: true
            ,allowNull: false
        }
        , hf_id: {
            type: DataTypes.INTEGER
            , allowNull: false
        }
        , street_1: {
            type: DataTypes.STRING
        }
        , street_2: {
            type: DataTypes.STRING
        }
        , city: {
            type: DataTypes.STRING
        }
        , zip: {
            type: DataTypes.STRING
        }
        ,phone: { type: DataTypes.STRING}
        ,website: { type: DataTypes.STRING}
        , latitude: {
            type: DataTypes.STRING
        }, longitude: {
            type: DataTypes.STRING
        }
        
    }, {
        freezeTableName: true
        , tableName: 'locations'
        , timestamps: false
        , classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
        , instanceMethods: {
            createAddress: function (req, onSuccess, onError) {
                locations.create(req, {}).then(onSuccess).error(onError);
            },
            update: function (req, onSuccess, onError) {
                locations.update({
                    where: {
                        hf_id: req.param.id
                    }
                }).then(onSuccess).error(onError);
            },
        readby_fields : function(req, onSuccess, onError){
            
           locations.find({

                 where:{
                     $and: [{hf_id: req.hf_id}, {street_1: req.street_1}, {city: req.city}, {zip: req.zip}]
                 }

           }).then(onSuccess).error(onError);
         },
             delete: function( onSuccess, onError){
           locations.destroy({
               where: {
                        hf_id: {$ne:null}
                    }
           }).then(onSuccess).error(onError); 
        }  
        }
    });
    return locations;
};