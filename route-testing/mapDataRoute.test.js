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



})