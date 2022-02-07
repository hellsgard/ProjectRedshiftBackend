const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.use(chaiHttp);

describe('queryPerson route tests', function(){
    
    it('It should readAll from are queries and build a basic profile for the user', (done) => {
    // Arrange
    chai.request(server)
    // Act
    .get('/queryPerson/person')
    .end((err, res) => {
    if(err){
    done(err);            
    }
    // Assert
    const body = res.body;
    expect(res).to.have.status(200);
    expect(body).to.not.be.null;
    body.map((queryPersonRoute) => {
    expect(queryPersonRoute).to.contain.keys('surname');
    expect(queryPersonRoute).to.contain.keys('forenames');
    expect(queryPersonRoute.forenames).to.be.a('string');
    expect(queryPersonRoute.surname).to.be.a('string');
    })
    })
    done();
    })



})