// // User Route
// const {expect} = require('chai');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../server');

// chai.use(chaiHttp);

// describe('userRoute route tests', function(){
//     this.timeout(60000) // Test timeout. Gives queries enough time to run.

//     let token;
//     let testPerson = {
//         surname: "smith",
//         forenames: "john",
//         dateOfBirth: "1991-10-01"
//     }

//     before(function(done){
//     chai.request(server).post('/users/login')
//     .send({
//         "username": "katie",
//         "password": "katie"
//     })
//     .end((err, res) => {
//     token=res.text;
//     done();
//     })
//     })
    
//     it('Login test', (done) => {
//     // Arrange
//     chai.request(server)
//     // Act
//     .post('/users/login')
//     .query(testPerson)  
//     .set("Authorization", "Bearer " + token)
//     .end((err, res) => {
//     if(err){
//     done(err);            
//     }
//     // Assert
//     const body = res.body;
//     expect(res).to.have.status(200);
//     expect(body).to.not.be.null;
//     // body.map((queryLogin) => {
//     expect(res.body).to.be.a('String');
//     })
//     done();
//     })



// })