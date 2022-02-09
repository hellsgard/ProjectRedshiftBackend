// Query Person
const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
// const { DOUBLE } = require('sequelize/types');
const server = require('../server');

chai.use(chaiHttp);

describe('queryPerson route tests', function(){
    this.timeout(60000) // Test timeout. Gives queries enough time to run.

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
            const byIdBody = res.body;
            expect(res).to.have.status(200);
            expect(byIdBody).to.not.be.null;
            byIdBody.map((querybyIdBodyRoute) => {
            expect(querybyIdBodyRoute).to.contain.keys('citizenID');
            expect(querybyIdBodyRoute).to.contain.keys('forenames');
            expect(querybyIdBodyRoute).to.contain.keys('surname');
            expect(querybyIdBodyRoute).to.contain.keys('homeAddress');
            expect(querybyIdBodyRoute).to.contain.keys('dateOfBirth');
            expect(querybyIdBodyRoute).to.contain.keys('placeOfBirth');
            expect(querybyIdBodyRoute).to.contain.keys('sex');

            expect(querybyIdBodyRoute.citizenID).to.be.a(BigInt);
            expect(querybyIdBodyRoute.forenames).to.be.a('string');
            expect(querybyIdBodyRoute.surname).to.be.a('string');
            expect(querybyIdBodyRoute.homeAddress).to.be.a('string');
            expect(querybyIdBodyRoute.dateOfBirth).to.be.a(date);
            expect(querybyIdBodyRoute.placeOfBirth).to.be.a('string');
            expect(querybyIdBodyRoute.sex).to.be.a('string');
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
            const associatesBody = res.body;
            expect(res).to.have.status(200);
            expect(associatesBody).to.not.be.null;
            associatesBody.map((queryAssociatesBodyRoute) => {
            expect(queryAssociatesBodyRoute).to.contain.keys('citizenID');
            expect(queryAssociatesBodyRoute).to.contain.keys('forenames');
            expect(queryAssociatesBodyRoute).to.contain.keys('surname');
            expect(queryAssociatesBodyRoute).to.contain.keys('homeAddress');
            expect(queryAssociatesBodyRoute).to.contain.keys('dateOfBirth');
            expect(queryAssociatesBodyRoute).to.contain.keys('placeOfBirth');
            expect(queryAssociatesBodyRoute).to.contain.keys('sex');

            expect(queryAssociatesBodyRoute.citizenID).to.be.a(BigInt);
            expect(queryAssociatesBodyRoute.forenames).to.be.a('string');
            expect(queryAssociatesBodyRoute.surname).to.be.a('string');
            expect(queryAssociatesBodyRoute.homeAddress).to.be.a('string');
            expect(queryAssociatesBodyRoute.dateOfBirth).to.be.a(date);
            expect(queryAssociatesBodyRoute.placeOfBirth).to.be.a('string');
            expect(queryAssociatesBodyRoute.sex).to.be.a('string');
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
            const associatesHomeBody = res.body;
            expect(res).to.have.status(200);
            expect(associatesHomeBody).to.not.be.null;
            associatesHomeBody.map((queryAssociatesHomeBodyRoute) => {
            expect(queryAssociatesHomeBodyRoute).to.contain.keys('citizenID');
            expect(queryAssociatesHomeBodyRoute).to.contain.keys('forenames');
            expect(queryAssociatesHomeBodyRoute).to.contain.keys('surname');
            expect(queryAssociatesHomeBodyRoute).to.contain.keys('homeAddress');
            expect(queryAssociatesHomeBodyRoute).to.contain.keys('dateOfBirth');
            expect(queryAssociatesHomeBodyRoute).to.contain.keys('placeOfBirth');
            expect(queryAssociatesHomeBodyRoute).to.contain.keys('sex');

            expect(queryAssociatesHomeBodyRoute.citizenID).to.be.a(BigInt);
            expect(queryAssociatesHomeBodyRoute.forenames).to.be.a('string');
            expect(queryAssociatesHomeBodyRoute.surname).to.be.a('string');
            expect(queryAssociatesHomeBodyRoute.homeAddress).to.be.a('string');
            expect(queryAssociatesHomeBodyRoute.dateOfBirth).to.be.a(date);
            expect(queryAssociatesHomeBodyRoute.placeOfBirth).to.be.a('string');
            expect(queryAssociatesHomeBodyRoute.sex).to.be.a('string');
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
            const eposDataBody = res.body;
            expect(res).to.have.status(200);
            expect(eposDataBody).to.not.be.null;
            eposDataBody.map((queryEposDataRoute) => {
            expect(queryEposDataRoute).to.contain.keys('citizenID');
            expect(queryEposDataRoute).to.contain.keys('forenames');
            expect(queryEposDataRoute).to.contain.keys('surname');
            expect(queryEposDataRoute).to.contain.keys('homeAddress');
            expect(queryEposDataRoute).to.contain.keys('dateOfBirth');
            expect(queryEposDataRoute).to.contain.keys('placeOfBirth');
            expect(queryEposDataRoute).to.contain.keys('sex');
            expect(queryEposDataRoute).to.contain.keys('accountNumber');
            expect(queryEposDataRoute).to.contain.keys('bank');
            expect(queryEposDataRoute).to.contain.keys('cardNumber');
            expect(queryEposDataRoute).to.contain.keys('eposId');
            expect(queryEposDataRoute).to.contain.keys('timestamp');
            expect(queryEposDataRoute).to.contain.keys('amount');
            expect(queryEposDataRoute).to.contain.keys('vendor');
            expect(queryEposDataRoute).to.contain.keys('latitude');
            expect(queryEposDataRoute).to.contain.keys('longitude');


            // expect(queryEposDataRoute.citizenID).to.be.a(BigInt);
            // expect(queryEposDataRoute.forenames).to.be.a('string');
            // expect(queryEposDataRoute.surname).to.be.a('string');
            // expect(queryEposDataRoute.homeAddress).to.be.a('string');
            // expect(queryEposDataRoute.dateOfBirth).to.be.a('string');
            // expect(queryEposDataRoute.placeOfBirth).to.be.a('string');
            // expect(queryEposDataRoute.sex).to.be.a('string');

            expect(queryEposDataRoute.accountNumber).to.be.a('string');
            expect(queryEposDataRoute.bank).to.be.a('string');
            expect(queryEposDataRoute.cardNumber).to.be.a('string');
            expect(queryEposDataRoute.eposId).to.be.a('string');
            expect(queryEposDataRoute.timestamp).to.be.a(date);
            expect(queryEposDataRoute.amount).to.be.a('string');
            expect(queryEposDataRoute.vendor).to.be.a('string');
            expect(queryEposDataRoute.latitude).to.be.a('string');
            expect(queryEposDataRoute.longitude).to.be.a('string');

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
            const atmDataBody = res.body;
            expect(res).to.have.status(200);
            expect(atmDataBody).to.not.be.null;
            atmDataBody.map((queryAtmDataRoute) => {
            expect(queryAtmDataRoute).to.contain.keys('cardNumber');
            expect(queryAtmDataRoute).to.contain.keys('atmId');
            expect(queryAtmDataRoute).to.contain.keys('timestamp');
            expect(queryAtmDataRoute).to.contain.keys('operator');
            expect(queryAtmDataRoute).to.contain.keys('streetName');
            expect(queryAtmDataRoute).to.contain.keys('postcode');
            expect(queryAtmDataRoute).to.contain.keys('latitude');
            expect(queryAtmDataRoute).to.contain.keys('longitude');

            expect(queryAtmDataRoute.cardNumber).to.be.a('string');
            expect(queryAtmDataRoute.atmId).to.be.a('string');
            expect(queryAtmDataRoute.timestamp).to.be.a('string');
            expect(queryAtmDataRoute.operator).to.be.a('string');
            expect(queryAtmDataRoute.streetName).to.be.a(date);
            expect(queryAtmDataRoute.postcode).to.be.a('string');
            expect(queryAtmDataRoute.latitude).to.be.a('string');
            expect(queryAtmDataRoute.longitude).to.be.a('string');
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
            const AnprBody = res.body;
            expect(res).to.have.status(200);
            expect(AnprBody).to.not.be.null;
            AnprBody.map((AnprRoute) => {
            expect(AnprRoute).to.contain.keys('latitude');
            expect(AnprRoute).to.contain.keys('longitude');
            expect(AnprRoute).to.contain.keys('streetName');
            expect(AnprRoute).to.contain.keys('vehicleRegistrationNumber');
            expect(AnprRoute).to.contain.keys('make');
            expect(AnprRoute).to.contain.keys('model');
            expect(AnprRoute).to.contain.keys('colour');
            expect(AnprRoute).to.contain.keys('driverLicenceID');
            expect(AnprRoute).to.contain.keys('timestamp');

            expect(AnprRoute.latitude).to.be.a('string');
            expect(AnprRoute.longitude).to.be.a('string');
            expect(AnprRoute.streetName).to.be.a('string');
            expect(AnprRoute.vehicleRegistrationNumber).to.be.a('string');
            expect(AnprRoute.make).to.be.a('string');
            expect(AnprRoute.model).to.be.a('string');
            expect(AnprRoute.colour).to.be.a('string');
            expect(AnprRoute.driverLicenceID).to.be.a('string');
            expect(AnprRoute.timestamp).to.be.a('string');
            })
            done();
            })
        })

});