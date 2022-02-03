const {Sequelize, DataTypes, STRING} = require('sequelize');
const sequelize = require("../utils/database");
// const passportMysql = require('passport-local-mysql')


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

}, {timestamps:false});

// UserSchema.methods.authenticate = function ;

// UserSchema.plugin(passportMysql);

module.exports= UserSchema;