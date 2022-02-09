// Query Person
const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { DOUBLE } = require('sequelize/types');
const server = require('../server');

chai.use(chaiHttp);

describe('queryPerson route tests', function(){
    
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

    // ---- /PERSON TEST ---- //
    it('It should readAll from are queries and build a basic profile for the user', (done) => {
    // Arrange
    chai.request(server)
    // Act
    .get('/queryPerson/person')
    .query(testPerson)  
    .set("Authorization", "Bearer " + token)
    .end((err, res) => {
    if(err){
    done(err);            
    }
    // Assert
    const PersonBody = res.body;
    expect(res).to.have.status(200);
    expect(PersonBody).to.not.be.null;
    PersonBody.map((queryPersonRoute) => {
    expect(queryPersonRoute).to.include.keys('surname');
    // expect(queryPersonRoute).to.contain.keys('citizenID');
    // expect(queryPersonRoute).to.contain.keys('placeOfBirth');
    // expect(queryPersonRoute).to.contain.keys('forenames');
    // expect(queryPersonRoute).to.contain.keys('dateOfBirth');
    // expect(queryPersonRoute).to.contain.keys('sex');

    expect(queryPersonRoute.forenames).to.be.a('string');
    expect(queryPersonRoute.surname).to.be.a('string');
    expect(queryPersonRoute.placeOfBirth).to.be.a('string');
    expect(queryPersonRoute.dateOfBirth).to.be.a('string');
    })
    done();
    })



})
    // ---- /MOBILE TEST ---- //
    it('It should readAll mobile data from the queries and build a basic profile', (done) => {
        chai.request(server)
        .get('/queryPerson/mobile')
        .query(testPerson)  
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
        if(err){
        done(err);            
        }
        // Assert
        const MobileBody = res.body;
        expect(res).to.have.status(200);
        expect(MobileBody).to.not.be.null;
        MobileBody.map((queryMobilePersonRoute) => {
        expect(queryMobilePersonRoute).to.contain.keys('surname');
        expect(queryMobilePersonRoute).to.contain.keys('forenames');
        expect(queryMobilePersonRoute).to.contain.keys('dateofBirth');
        expect(queryMobilePersonRoute.forenames).to.be.a('string');
        expect(queryMobilePersonRoute.surname).to.be.a('string');
        expect(queryMobilePersonRoute.dateofBirth).to.be.a(date);
        })
        done();
        })
    })

        // ---- /callRecords TEST ---- //
        it('It should readAll callRecords data from the queries and build a basic profile', (done) => {
            chai.request(server)
            .get('/queryPerson/callRecords')
            .query(testPerson)  
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
            if(err){
            done(err);            
            }
            // Assert
            const callRecordBody = res.body;
            expect(res).to.have.status(200);
            expect(callRecordBody).to.not.be.null;
            callRecordBody.map((queryCallRecordRoute) => {
            expect(queryCallRecordRoute).to.contain.keys('timestamp');
            expect(queryCallRecordRoute).to.contain.keys('callMSISDN');
            expect(queryCallRecordRoute).to.contain.keys('callCellTowerId');
            expect(queryCallRecordRoute).to.contain.keys('receieverMSISDN');
            expect(queryCallRecordRoute).to.contain.keys('receieverTowerId');

            expect(queryCallRecordRoute.timestamp).to.be.a(date);
            expect(queryCallRecordRoute.callMSISDN).to.be.a('string');
            expect(queryCallRecordRoute.callCellTowerId).to.be.a(BigInt);
            expect(queryCallRecordRoute.receieverMSISDN).to.be.a('string');
            expect(queryCallRecordRoute.receieverTowerId).to.be.a(float);
            })
            done();
            })
        })

        // ---- /callRecordsOutbound TEST ---- //
        it('It should readAll OutboundcallRecords data via a queries and build a outbound call records list', (done) => {
            chai.request(server)
            .get('/queryPerson/callRecordsOutbound')
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
            expect(queryCallRecordOutboundRoute).to.contain.keys('timestamp');
            expect(queryCallRecordOutboundRoute).to.contain.keys('callMSISDN');
            expect(queryCallRecordOutboundRoute).to.contain.keys('callCellTowerId');
            expect(queryCallRecordOutboundRoute).to.contain.keys('receieverMSISDN');
            expect(queryCallRecordOutboundRoute).to.contain.keys('receieverTowerId');

            expect(queryCallRecordOutboundRoute.timestamp).to.be.a(date);
            expect(queryCallRecordOutboundRoute.callMSISDN).to.be.a('string');
            expect(queryCallRecordOutboundRoute.callCellTowerId).to.be.a(BigInt);
            expect(queryCallRecordOutboundRoute.receieverMSISDN).to.be.a('string');
            expect(queryCallRecordOutboundRoute.receieverTowerId).to.be.a(float);
            })
            done();
            })
        })

        // ---- /byID TEST ---- //
        it('It should read byID and get the data from people mobile and citizen ', (done) => {
            chai.request(server)
            .get('/queryPerson/callRecordsOutbound')
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
            expect(queryCallRecordOutboundRoute).to.contain.keys('citizenID');
            expect(queryCallRecordOutboundRoute).to.contain.keys('forenames');
            expect(queryCallRecordOutboundRoute).to.contain.keys('surname');
            expect(queryCallRecordOutboundRoute).to.contain.keys('homeAddress');
            expect(queryCallRecordOutboundRoute).to.contain.keys('dateOfBirth');
            expect(queryCallRecordOutboundRoute).to.contain.keys('placeOfBirth');
            expect(queryCallRecordOutboundRoute).to.contain.keys('sex');

            expect(queryCallRecordOutboundRoute.citizenID).to.be.a(BigInt);
            expect(queryCallRecordOutboundRoute.forenames).to.be.a('string');
            expect(queryCallRecordOutboundRoute.surname).to.be.a('string');
            expect(queryCallRecordOutboundRoute.homeAddress).to.be.a('string');
            expect(queryCallRecordOutboundRoute.dateOfBirth).to.be.a(date);
            expect(queryCallRecordOutboundRoute.placeOfBirth).to.be.a('string');
            expect(queryCallRecordOutboundRoute.sex).to.be.a('string');
            })
            done();
            })
        })

        // ---- /associates TEST ---- //
        it('It should read byID and get the data from people mobile and citizen ', (done) => {
            chai.request(server)
            .get('/queryPerson/associates/')
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
            expect(queryCallRecordOutboundRoute).to.contain.keys('citizenID');
            expect(queryCallRecordOutboundRoute).to.contain.keys('forenames');
            expect(queryCallRecordOutboundRoute).to.contain.keys('surname');
            expect(queryCallRecordOutboundRoute).to.contain.keys('homeAddress');
            expect(queryCallRecordOutboundRoute).to.contain.keys('dateOfBirth');
            expect(queryCallRecordOutboundRoute).to.contain.keys('placeOfBirth');
            expect(queryCallRecordOutboundRoute).to.contain.keys('sex');

            expect(queryCallRecordOutboundRoute.citizenID).to.be.a(BigInt);
            expect(queryCallRecordOutboundRoute.forenames).to.be.a('string');
            expect(queryCallRecordOutboundRoute.surname).to.be.a('string');
            expect(queryCallRecordOutboundRoute.homeAddress).to.be.a('string');
            expect(queryCallRecordOutboundRoute.dateOfBirth).to.be.a(date);
            expect(queryCallRecordOutboundRoute.placeOfBirth).to.be.a('string');
            expect(queryCallRecordOutboundRoute.sex).to.be.a('string');
            })
            done();
            })
        })
        // ---- /associatesHome TEST ---- //
        it('It should read all known associates and get the basic information', (done) => {
            chai.request(server)
            .get('/queryPerson/associatesHome/')
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
            expect(queryCallRecordOutboundRoute).to.contain.keys('citizenID');
            expect(queryCallRecordOutboundRoute).to.contain.keys('forenames');
            expect(queryCallRecordOutboundRoute).to.contain.keys('surname');
            expect(queryCallRecordOutboundRoute).to.contain.keys('homeAddress');
            expect(queryCallRecordOutboundRoute).to.contain.keys('dateOfBirth');
            expect(queryCallRecordOutboundRoute).to.contain.keys('placeOfBirth');
            expect(queryCallRecordOutboundRoute).to.contain.keys('sex');

            expect(queryCallRecordOutboundRoute.citizenID).to.be.a(BigInt);
            expect(queryCallRecordOutboundRoute.forenames).to.be.a('string');
            expect(queryCallRecordOutboundRoute.surname).to.be.a('string');
            expect(queryCallRecordOutboundRoute.homeAddress).to.be.a('string');
            expect(queryCallRecordOutboundRoute.dateOfBirth).to.be.a(date);
            expect(queryCallRecordOutboundRoute.placeOfBirth).to.be.a('string');
            expect(queryCallRecordOutboundRoute.sex).to.be.a('string');
            })
            done();
            })
        })

        // ---- /eposData TEST ---- //
        it('It should read all known associates and get the basic information', (done) => {
            chai.request(server)
            .get('/queryPerson/eposData/')
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
            expect(queryCallRecordOutboundRoute).to.contain.keys('citizenID');
            expect(queryCallRecordOutboundRoute).to.contain.keys('forenames');
            expect(queryCallRecordOutboundRoute).to.contain.keys('surname');
            expect(queryCallRecordOutboundRoute).to.contain.keys('homeAddress');
            expect(queryCallRecordOutboundRoute).to.contain.keys('dateOfBirth');
            expect(queryCallRecordOutboundRoute).to.contain.keys('placeOfBirth');
            expect(queryCallRecordOutboundRoute).to.contain.keys('sex');
            expect(queryCallRecordOutboundRoute).to.contain.keys('accountNumber');
            expect(queryCallRecordOutboundRoute).to.contain.keys('bank');
            expect(queryCallRecordOutboundRoute).to.contain.keys('cardNumber');
            expect(queryCallRecordOutboundRoute).to.contain.keys('eposId');
            expect(queryCallRecordOutboundRoute).to.contain.keys('timestamp');
            expect(queryCallRecordOutboundRoute).to.contain.keys('amount');
            expect(queryCallRecordOutboundRoute).to.contain.keys('vendor');
            expect(queryCallRecordOutboundRoute).to.contain.keys('latitude');
            expect(queryCallRecordOutboundRoute).to.contain.keys('longitude');


            expect(queryCallRecordOutboundRoute.citizenID).to.be.a(BigInt);
            expect(queryCallRecordOutboundRoute.forenames).to.be.a('string');
            expect(queryCallRecordOutboundRoute.surname).to.be.a('string');
            expect(queryCallRecordOutboundRoute.homeAddress).to.be.a('string');
            expect(queryCallRecordOutboundRoute.dateOfBirth).to.be.a('string');
            expect(queryCallRecordOutboundRoute.placeOfBirth).to.be.a('string');
            expect(queryCallRecordOutboundRoute.sex).to.be.a('string');

            expect(queryCallRecordOutboundRoute.accountNumber).to.be.a('string');
            expect(queryCallRecordOutboundRoute.bank).to.be.a('string');
            expect(queryCallRecordOutboundRoute.cardNumber).to.be.a('string');
            expect(queryCallRecordOutboundRoute.eposId).to.be.a('string');
            expect(queryCallRecordOutboundRoute.timestamp).to.be.a(date);
            expect(queryCallRecordOutboundRoute.amount).to.be.a(DOUBLE);
            expect(queryCallRecordOutboundRoute.vendor).to.be.a('string');
            expect(queryCallRecordOutboundRoute.latitude).to.be.a('string');
            expect(queryCallRecordOutboundRoute.longitude).to.be.a('string');

            })
            done();
            })
        })

        // ---- /atmData TEST ---- //
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
            expect(queryCallRecordOutboundRoute).to.contain.keys('cardNumber');
            expect(queryCallRecordOutboundRoute).to.contain.keys('atmId');
            expect(queryCallRecordOutboundRoute).to.contain.keys('timestamp');
            expect(queryCallRecordOutboundRoute).to.contain.keys('operator');
            expect(queryCallRecordOutboundRoute).to.contain.keys('streetName');
            expect(queryCallRecordOutboundRoute).to.contain.keys('postcode');
            expect(queryCallRecordOutboundRoute).to.contain.keys('latitude');
            expect(queryCallRecordOutboundRoute).to.contain.keys('longitude');

            expect(queryCallRecordOutboundRoute.cardNumber).to.be.a('string');
            expect(queryCallRecordOutboundRoute.atmId).to.be.a('string');
            expect(queryCallRecordOutboundRoute.timestamp).to.be.a('string');
            expect(queryCallRecordOutboundRoute.operator).to.be.a('string');
            expect(queryCallRecordOutboundRoute.streetName).to.be.a(date);
            expect(queryCallRecordOutboundRoute.postcode).to.be.a(DOUBLE);
            expect(queryCallRecordOutboundRoute.latitude).to.be.a('string');
            expect(queryCallRecordOutboundRoute.longitude).to.be.a('string');
            })
            done();
            })
        })

        // ---- /ANPR TEST ---- //
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

});