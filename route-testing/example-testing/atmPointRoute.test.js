// const {expect} = require('chai');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../../server');

// chai.use(chaiHttp);

// describe('atmPointRoute route tests', function(){
    
//     it('It should readAll from atmpoint', (done) => {
//     // Arrange
//     chai.request(server)
//     // Act
//     .get('/atmPoint/readAll')
//     .end((err, res) => {
//     if(err){
//     done(err);            
//     }
//     // Assert
//     const body = res.body;
//     expect(res).to.have.status(200);
//     expect(body).to.not.be.null;
//     body.map((atmPoint) => {
//     expect(atmPoint).to.contain.keys('operator');
//     expect(atmPoint).to.contain.keys('atmId');
//     expect(atmPoint.latitude).to.be.a('string');
//     })
//     })
//     done();
//     })



// })