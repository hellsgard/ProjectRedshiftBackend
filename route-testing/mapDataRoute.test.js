// Map Data Route
const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Map Data route tests', function(){

    let token;
    let testPerson = {
        surname: "smith",
        forenames: "john",
        dateOfBirth: "1991-10-01"
    }

    before(function(done){
    chai.request(server).post('/users/login')
    .send({
        "username": "katie",
        "password": "katie"
    })
    .end((err, res) => {
    token=res.text;
    done();
    })
    })
    
        // ---- /MAP TEST ---- //
    it('It should complete 3 queries on MYSQL and read the data', (done) => {
    // Arrange
    chai.request(server)
    // Act
    .get('/login')
    .query(testPerson)  
    .set("Authorization", "Bearer " + token)
    .end((err, res) => {
    if(err){
    done(err);            
    }
    // Assert
    const body = res.body;
    expect(res).to.have.status(200);
    expect(body).to.not.be.null;
    body.map((queryPersonRoute) => {
    expect(userRoute).to.contain.keys('surname');
    expect(userRoute).to.contain.keys('forenames');
    expect(userRoute.forenames).to.be.a('String');
    expect(userRoute.surname).to.be.a('String');
    })
    })
    done();
    })

    it('It should read all known associates and get the basic information', (done) => {
        chai.request(server)
        .get('/queryPerson/atmData/')
        .query(testPerson)  
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
        if(err){
        done(err);            
        }
        // Assert
        const callRecordsOutboundBody = res.body;
        expect(res).to.have.status(200);
        expect(callRecordsOutboundBody).to.not.be.null;
        callRecordsOutboundBody.map((queryCallRecordOutboundRoute) => {
        expect(queryCallRecordOutboundRoute).to.contain.keys('latitude');
        expect(queryCallRecordOutboundRoute).to.contain.keys('longitude');
        expect(queryCallRecordOutboundRoute).to.contain.keys('streetName');
        expect(queryCallRecordOutboundRoute).to.contain.keys('vehicleRegistrationNumber');
        expect(queryCallRecordOutboundRoute).to.contain.keys('make');
        expect(queryCallRecordOutboundRoute).to.contain.keys('model');
        expect(queryCallRecordOutboundRoute).to.contain.keys('colour');
        expect(queryCallRecordOutboundRoute).to.contain.keys('driverLicenceID');
        expect(queryCallRecordOutboundRoute).to.contain.keys('timestamp');

        expect(queryCallRecordOutboundRoute.latitude).to.be.a('string');
        expect(queryCallRecordOutboundRoute.longitude).to.be.a('string');
        expect(queryCallRecordOutboundRoute.streetName).to.be.a('string');
        expect(queryCallRecordOutboundRoute.vehicleRegistrationNumber).to.be.a('string');
        expect(queryCallRecordOutboundRoute.make).to.be.a('string');
        expect(queryCallRecordOutboundRoute.model).to.be.a('string');
        expect(queryCallRecordOutboundRoute.colour).to.be.a('string');
        expect(queryCallRecordOutboundRoute.driverLicenceID).to.be.a('string');
        expect(queryCallRecordOutboundRoute.timestamp).to.be.a('string');
        })
        done();
        })
    })



})