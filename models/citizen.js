const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require("../utils/database");

const Citizen = sequelize.define("citizen", {
    
    citizenID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    forenames: {
        type: DataTypes.STRING,
    },
    surname: {
        type: DataTypes.STRING,
    },
    homeAddress: {
        type: DataTypes.STRING,
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY, 
    },
    placeOfBirth: {
        type: DataTypes.STRING
    },
    sex: {
        type: DataTypes.STRING
    },
},
{
    timestamps: false,
    tableName: 'citizen'
},
{
    timeStamps: false, 
    tableName: 'citizen',
},

);

module.exports = Citizen;