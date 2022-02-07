const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');
chai.use(chaiHttp);

// Test the /GET route

describe('/read byID and return the data from sequelize query', () => {
    it('it should GET all the suspectProfile data', (done) => {
      chai.request(server)
          .get('/byID/')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
          });
    });
});

