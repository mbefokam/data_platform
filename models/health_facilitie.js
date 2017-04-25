'use strict';
module.exports = function(sequelize, DataTypes) {
  var healthFacilities = sequelize.define('FACILITIES', {
    id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false

        },
        name_1: { type: DataTypes.STRING,
               allowNull: false, unique: true},
        name_2: { type: DataTypes.STRING},
        Quartet: { type: DataTypes.STRING}
        

  }, {
    freezeTableName: true,
    tableName:'healthfacilities',
    timestamps: false,
    classMethods: {
      associate: function(models) {
       healthFacilities.hasMany(models.LOCATIONS,{
           foreignKey:'hf_id'
       })
      }
    },

    instanceMethods: {


        createFacilities: function(req, onSuccess, onError){

           healthFacilities.create(req,{

           }).then(onSuccess).error(onError);
        }
        ,


        create: function(req, onSuccess, onError){

           healthFacilities.create(req.body,{
               include:[
                   {
                       model: sequelize.import('./locations.js')
                   }
               ]

           }).then(onSuccess).error(onError);
        },

        retrieveAll : function(onSuccess, onError){
           healthFacilities.findAll({
               include:[
                   {
                       model: sequelize.import('./locations.js')
                   }

           ]}).then(onSuccess).error(onError);
        },

        readby_fields : function(req, onSuccess, onError){
            
           healthFacilities.find({

                 where:{
                     name_1 : req.name_1
                 }

           }).then(onSuccess).error(onError);
        },

        update: function(req, onSuccess, onError){

           healthFacilities.update({

                 where:{
                     id: req.param.id
                 }

           }).then(onSuccess).error(onError);
        },

        delete: function( onSuccess, onError){
           healthFacilities.destroy({

                 where:{
                     id:{
                      $ne: null
                     }
                 }

           }).then(onSuccess).error(onError);
        }

    }
  });
  return healthFacilities;
};
