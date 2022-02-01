const {Sequelize, DataTypes, STRING} = require('sequelize');
const sequelize = require("../utils/database");

const UserSchema = sequelize.define("user",{
    
    username:{
        type: DataTypes.STRING,
        required: true
    },

    password:{
        type: DataTypes.STRING,
        require: true,
        minLength: 8
    }
});

module.exports= UserSchema;