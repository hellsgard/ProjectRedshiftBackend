// Suspect Flees Vehicle Observations
const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.use(chaiHttp);

describe('querySuspectFleetRoute tests', function(){
    
    it('It should get all data from vehicleObservations and build a profile for the vehicle', (done) => {
    // Arrange
    chai.request(server)
    // Act
    .get('/queryFlees/flees')
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