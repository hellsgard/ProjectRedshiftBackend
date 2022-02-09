// Suspect Flees Vehicle Observations
const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('querySuspectFleetRoute tests', function(){
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
    
    it('It should get all data from vehicleObservations and build a profile for the vehicle', (done) => {
    // Arrange
    chai.request(server)
    // Act
    .get('/queryFlees/flees')
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
    body.map((querySuspectFleetRoute) => {
    expect(querySuspectFleetRoute).to.contain.keys('vehicleRegistrationNumber');
    expect(querySuspectFleetRoute).to.contain.keys('timestamp');
    expect(querySuspectFleetRoute.vehicleRegistrationNumber).to.be.a('string');
    expect(querySuspectFleetRoute.timestamp).to.be.a('Date');
    })
    })
    done();
    })



})