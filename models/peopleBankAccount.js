const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require("../utils/database");


const BankAccount = sequelize.define("bankAccount", {
    
    bankAccountID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    accountNumber: {
        type: DataTypes.INTEGER,
    },
    bank: {
        type: DataTypes.STRING,
    },
    forenames: {
        type: DataTypes.STRING,
    },
    surename: {
        type: DataTypes.STRING, 
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
    },
    homeAddress: {
        type: DataTypes.STRING
    },
},
{
    timestamps: false,
    tableName: 'peoplebankaccount'
},
{
    timeStamps: false, 
    tableName: 'peoplebankaccount',
},

);


module.exports = BankAccount;