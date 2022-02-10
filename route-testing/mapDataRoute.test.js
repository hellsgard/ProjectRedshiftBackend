// Map Data Route
const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Map Data route tests', function(){
    this.timeout(100000) // Test timeout. Gives queries enough time to run.

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
    
        // ---- /atmMap TEST ---- //
       it('It should read all atm data ready for the map', (done) => {
        chai.request(server)
        .get('/mapData/atmData')
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
        atmDataBody.map((atmDataRoute) => {
        expect(atmDataRoute).to.contain.keys('cardNumber');
        expect(atmDataRoute).to.contain.keys('atmId');
        expect(atmDataRoute).to.contain.keys('timestamp');
        expect(atmDataRoute).to.contain.keys('amount');
        expect(atmDataRoute).to.contain.keys('operator');
        expect(atmDataRoute).to.contain.keys('streetName');
        expect(atmDataRoute).to.contain.keys('postcode');
        expect(atmDataRoute).to.contain.keys('latitude');
        expect(atmDataRoute).to.contain.keys('longitude');

        expect(atmDataRoute.latitude).to.be.a(double);
        expect(atmDataRoute.longitude).to.be.a(double);
        expect(atmDataRoute.streetName).to.be.a('string');
        expect(atmDataRoute.vehicleRegistrationNumber).to.be.a('string');
        expect(atmDataRoute.make).to.be.a('string');
        expect(atmDataRoute.model).to.be.a('string');
        expect(atmDataRoute.colour).to.be.a('string');
        expect(atmDataRoute.driverLicenceID).to.be.a('string');
        expect(atmDataRoute.timestamp).to.be.a('string');
        })
        done();
        })
    })

            // ---- /anprMap TEST ---- //
            it('It should read all anpr data ready for the map', (done) => {
                chai.request(server)
                .get('/mapData/anprMap')
                .query(testPerson)  
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                if(err){
                done(err);            
                }
                // Assert
                const anprMapBody = res.body;
                expect(res).to.have.status(200);
                expect(anprMapBody).to.not.be.null;
                anprMapBody.map((anprMapRoute) => {
                expect(anprMapRoute).to.contain.keys('latitude');
                expect(anprMapRoute).to.contain.keys('longitude');
                expect(anprMapRoute).to.contain.keys('streetName');
                expect(anprMapRoute).to.contain.keys('vehicleRegistrationNumber');
                expect(anprMapRoute).to.contain.keys('make');
                expect(anprMapRoute).to.contain.keys('model');
                expect(anprMapRoute).to.contain.keys('colour');
                expect(anprMapRoute).to.contain.keys('driverLicenceID');
                expect(anprMapRoute).to.contain.keys('timestamp');
        
                expect(anprMapRoute.latitude).to.be.a('string');
                expect(anprMapRoute.longitude).to.be.a('string');
                expect(anprMapRoute.streetName).to.be.a('string');
                expect(anprMapRoute.vehicleRegistrationNumber).to.be.a('string');
                expect(anprMapRoute.make).to.be.a('string');
                expect(anprMapRoute.model).to.be.a('string');
                expect(anprMapRoute.colour).to.be.a('string');
                expect(anprMapRoute.driverLicenceID).to.be.a('string');
                expect(anprMapRoute.timestamp).to.be.a('string');
                })
                done();
                })
            })

                        // ---- /anprMap TEST ---- //
                        it('It should read all anpr data ready for the map', (done) => {
                            chai.request(server)
                            .get('/mapData/eposMap')
                            .query(testPerson)  
                            .set("Authorization", "Bearer " + token)
                            .end((err, res) => {
                            if(err){
                            done(err);            
                            }
                            // Assert
                            const eposMapBody = res.body;
                            expect(res).to.have.status(200);
                            expect(eposMapBody).to.not.be.null;
                            eposMapBody.map((eposDataMapRoute) => {
                            expect(eposDataMapRoute).to.contain.keys('latitude');
                            expect(anprMapRoute).to.contain.keys('longitude');
                            expect(anprMapRoute).to.contain.keys('streetName');
                            expect(anprMapRoute).to.contain.keys('vehicleRegistrationNumber');
                            expect(anprMapRoute).to.contain.keys('make');
                            expect(anprMapRoute).to.contain.keys('model');
                            expect(anprMapRoute).to.contain.keys('colour');
                            expect(anprMapRoute).to.contain.keys('driverLicenceID');
                            expect(anprMapRoute).to.contain.keys('timestamp');
                    
                            expect(anprMapRoute.latitude).to.be.a('string');
                            expect(anprMapRoute.longitude).to.be.a('string');
                            expect(anprMapRoute.streetName).to.be.a('string');
                            expect(anprMapRoute.vehicleRegistrationNumber).to.be.a('string');
                            expect(anprMapRoute.make).to.be.a('string');
                            expect(anprMapRoute.model).to.be.a('string');
                            expect(anprMapRoute.colour).to.be.a('string');
                            expect(anprMapRoute.driverLicenceID).to.be.a('string');
                            expect(anprMapRoute.timestamp).to.be.a('string');
                            })
                            done();
                            })
                        })
            



})