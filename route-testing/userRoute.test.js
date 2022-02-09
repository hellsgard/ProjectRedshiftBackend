// User Route
const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.use(chaiHttp);

describe('userRoute route tests', function(){
    
    it('It should readAll from users on MYSQL', (done) => {
    // Arrange
    chai.request(server)
    // Act
    .get('/login')
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



})