const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');

const {Vehicle} = require('../models/users.js');

chai.use(chaiHttp);

const server = require('../../server');

before(function(done){
    console.log("Setup of environment");

    // Generate a Vehicle object
    const testAtmPoint = new AtmPoint({
        "atmid": 1,
        "operator" : "Bank of England",
        "streetName" : "East Street",
        "postcode" : "HP21 9YL",
        "latitude" : 51.794982,
        "longitude" : -0.81463815353918
    });


    // Object that can be used THROUGHOUT testing
    const testAtmPoint = {
        "atmid": 1,
        "operator" : "Bank of England",
        "streetName" : "East Street",
        "postcode" : "HP21 9YL",
        "latitude" : 51.794982,
        "longitude" : -0.81463815353918
    };

// --------------------TEST----------------

    // pass in "done" to let chai know when done
    it('Should respond with "Test path successful"', function(done){

    // ARRANGE
    // Telling chai to use server.js
    chai.request(server)
    
    
    // ACT
    // use server to make a get request with '/test'
    .get('/atmPointRoute/test')
    
    // .end used for asyc saying when ended give a error or response
    .end((err, res) => {

        if(err) {
            console.log("Error occured");
            done(err);
        };
   
    // ASSERTION
    /// whatever the get request returns we test here
    expect(res).to.have.status(201);
    expect(res).to.not.be.null;
    expect(res).to.have.property('text',"it worked!");
    done();
});
});

// --------------------READ ALL : TEST----------------
    
    it('Should return all AtmPoints fields from AtmPoints on the db and limit by 10', function(done){

        // Arrange
        chai.request(server)

        // Act
        .get('/vehicleRoute/readAll')

                // Will be the same for more or less every route
                .end((err, res) => {

                    if(err) {
                        console.log("Error occured");
                        done(err);
                    };
        
                    // Assertion
                    const resBody = res.body;
                    expect(res).to.have.status(200);
                    expect(resBody).to.not.be.null;

                    // .map - Loops through an array and runs a command
                    resBody.map((user) => {
                        expect(user).to.be.a("Object");
                        expect(user).to.contain.keys("atmid");
                        expect(user).to.be.a("Object");
                        expect(user).to.contain.keys("operator");
                        expect(user).to.be.a("Object");
                        expect(user).to.contain.keys("streetName");
                        expect(user).to.be.a("Object");
                        expect(user).to.contain.keys("postcode");
                        expect(user).to.be.a("Object");
                        expect(user).to.contain.keys("latitude");
                        expect(user).to.be.a("Object");
                        expect(user).to.contain.keys("longitude");
                    });
                    done();
                });         
    });
});
