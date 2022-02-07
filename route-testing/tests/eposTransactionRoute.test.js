const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');
chai.use(chaiHttp);

// Test the /GET route

describe('/read all epos transaction data', () => {
    it('it should GET all the epos data', (done) => {
      chai.request(server)
          .get('/readAll')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
          });
    });
});
