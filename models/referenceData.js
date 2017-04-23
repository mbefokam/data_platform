'use strict';
module.exports = function(sequelize, DataTypes) {
  var reference_data = sequelize.define('REFERENCES', {
     id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false

        },
      hf_id: {
            type: DataTypes.INTEGER
            , allowNull: false
        },
    flag_saf: DataTypes.INTEGER, 
    flag_mhf: DataTypes.INTEGER,
    flag_mc: DataTypes.INTEGER,
    flag_md: DataTypes.INTEGER,
    flag_np_ss: DataTypes.INTEGER, 
    flag_pi: DataTypes.INTEGER,
    flag_gl: DataTypes.INTEGER,
    flag_vet: DataTypes.INTEGER, 
    flag_pw: DataTypes.INTEGER, 
    flag_hv: DataTypes.INTEGER,
    flag_dv: DataTypes.INTEGER,
    flag_chld: DataTypes.INTEGER, 
    flag_yad: DataTypes.INTEGER, 
    flag_adlt: DataTypes.INTEGER,
    flag_snr: DataTypes.INTEGER,
    flag_si: DataTypes.INTEGER, 
    filter_military: DataTypes.INTEGER, 
    filter_inpatient_svc: DataTypes.INTEGER,
    filter_residential_pgm: DataTypes.INTEGER,
    vet: DataTypes.INTEGER 
      
  }, {
    freezeTableName: true,
    tableName:'references',
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
      instanceMethods: {       
  
       
        createReference: function (req, onSuccess, onError) {
                reference_data.create(req, {}).then(onSuccess).error(onError);
            }  
      
      
    }
  });
  return reference_data;
};