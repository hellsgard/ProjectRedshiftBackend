const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require("../utils/database");

const UserSchema = sequelize.define("user",{
    
    username:{
        type: String,
        required: true
    },

    password:{
        type: String,
        require: true,
        minLength: 8
    }
});

module.exports= UserSchema;