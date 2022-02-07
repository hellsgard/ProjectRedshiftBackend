const {expect} = require('chai');

describe("testsuite1", function(){
   
    it('it should come back with 1+1 = 2 ', () => {
    // arrange
        let num1 = 1;
        let num2 = 1;
        let sum;

    // act
        sum = num1 + num2;
        
    // assert
        expect(sum).to.equal(2);
    });

});