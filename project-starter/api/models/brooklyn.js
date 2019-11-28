'use strict';
const { Model } = require('sequelize');

// This file just describes how the brooklyns table should look like 
// in the database.
// When i created this File and ran the backend terminal, this table was 
// created. NEED TO FIND OUT IF IT WILL DO THAT WITH ALL MODEL FILES CREATED

module.exports = (sequelize, DataTypes) => {
  class Brooklyn extends Model {}

  Brooklyn.init({
    activity: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 250],
        notEmpty: true,
      }
    },
    price: {
        type: DataTypes.STRING,
        validate: {
          len: [3, 250],
          notEmpty: true,
        }
      },
  }, {
    sequelize,
    modelName: 'brooklyn'
  });

  Brooklyn.associate = (models) => {
    // associations can be defined here
  };

  return Brooklyn;
};