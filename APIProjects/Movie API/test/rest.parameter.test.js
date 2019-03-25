process.env.NODE_ENV = 'test';

const chai = require('chai');
const restparameter = require('../routes/72468_RestParameters');

chai.should();


describe('helper.js', () => {
  it('factorial()', () => {
    restparameter.factorial(1, 2).should.eql(2);
    restparameter.factorial(1, 2, 3, 4, 5, 6).should.eql(720);
  });
  it('summation()', () => {
    restparameter.summation(1, 2).should.eql(3);
    restparameter.summation(1, 2, 3, 4, 5, 6).should.eql(21);
  });
});
