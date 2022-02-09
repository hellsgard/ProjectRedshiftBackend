// Query Person
const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.use(chaiHttp);

describe('queryPerson route tests', function(){
    
    // ---- /PERSON TEST ---- //
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
    const PersonBody = res.body;
    expect(res).to.have.status(200);
    expect(PersonBody).to.not.be.null;
    PersonBody.map((queryPersonRoute) => {
    expect(queryPersonRoute).to.contain.keys('surname');
    expect(queryPersonRoute).to.contain.keys('forenames');
    expect(queryPersonRoute).to.contain.keys('dateofBirth');
    expect(queryPersonRoute.forenames).to.be.a('string');
    expect(queryPersonRoute.surname).to.be.a('string');
    expect(queryPersonRoute.dateofBirth).to.be.a(date);
    })
    done();
    })



})
    // ---- /MOBILE TEST ---- //
    it('It should readAll mobile data from the queries and build a basic profile', (done) => {
        chai.request(server)
        .get('/queryPerson/mobile')
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

        // ---- /callRecords TEST ---- //
        it('It should readAll callRecords data from the queries and build a basic profile', (done) => {
            chai.request(server)
            .get('/queryPerson/callRecords')
            .end((err, res) => {
            if(err){
            done(err);            
            }
            // Assert
            const callRecordBody = res.body;
            expect(res).to.have.status(200);
            expect(callRecordBody).to.not.be.null;
            callRecordBody.map((querycallRecordRoute) => {
            expect(querycallRecordRoute).to.contain.keys('timestamp');
            expect(querycallRecordRoute).to.contain.keys('callMSISDN');
            expect(querycallRecordRoute).to.contain.keys('callCellTowerId');
            expect(querycallRecordRoute).to.contain.keys('receieverMSISDN');
            expect(querycallRecordRoute).to.contain.keys('receieverTowerId');

            expect(querycallRecordRoute.timestamp).to.be.a(date);
            expect(querycallRecordRoute.callMSISDN).to.be.a('string');
            expect(querycallRecordRoute.callCellTowerId).to.be.a(double);
            expect(querycallRecordRoute.receieverMSISDN).to.be.a('string');
            expect(querycallRecordRoute.receieverTowerId).to.be.a(float);
            })
            done();
            })

        // ---- /callRecordsOutbound TEST ---- //

        // ---- /byID TEST ---- //

        // ---- /associates TEST ---- //

        // ---- /associatesHome TEST ---- //

        // ---- /eposData TEST ---- //

        // ---- /atmData TEST ---- //

        // ---- /anpr TEST ---- //

})
    })
});