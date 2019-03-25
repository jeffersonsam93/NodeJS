// process.env.NODE_ENV = 'test';
// process.env.eemAPI="http://cordelia:8314/EEMservices/api/leave/";
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../bin/app');
const knex = require('../db/connection');

chai.should();
chai.use(chaiHttp);

describe('API Routes', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /api/v1/API/:instance/search?text', () => {
    it('Test For Getting Movie with search term', () => {
      chai.request(server).get('/api/v1/API/2/search?text=act').send().end((err, res) => {
        res.should.have.status(200);
        res.type.should.equal('application/json');
        res.body.should.be.a('Object');
        res.body.status.should.equal('Success');
        res.body.data.length.should.equal(5);
        res.body.data[0].should.have.property('Id');
        res.body.data[0].should.have.property('Title');
        res.body.data[0].should.have.property('Director');
        res.body.data[0].should.have.property('MovieType');
        res.body.data[0].MovieType.should.be.a('array');
        res.body.data[0].should.have.property('Cast');
        res.body.data[0].Cast.should.be.a('array');
      });
    });
    it('Test For Getting Movie with search term Empty', () => {
      chai.request(server).get('/api/v1/API/2/search?text=').send().end((err, res) => {
        res.should.have.status(200);
        res.type.should.equal('application/json');
        res.body.should.be.a('Object');
        res.body.status.should.equal('Success');
        res.body.data.length.should.equal(11);
        res.body.data[0].should.have.property('Id');
        res.body.data[0].should.have.property('Title');
        res.body.data[0].should.have.property('Director');
        res.body.data[0].should.have.property('MovieType');
        res.body.data[0].MovieType.should.be.a('array');
        res.body.data[0].should.have.property('Cast');
        res.body.data[0].Cast.should.be.a('array');
      });
    });
    it('Test For Getting Movie with search term of invalid text', () => {
      chai.request(server).get('/api/v1/API/2/search?text=fdfsdfsdfsdfsd').send().end((err, res) => {
        res.should.have.status(200);
        res.type.should.equal('application/json');
        res.body.should.be.a('Object');
        res.body.status.should.equal('Success');
        res.body.data.length.should.equal(0);
      });
    });
  });
});
describe('GET /api/v1/API/filter?director=Jam&type=Rom&cast=Sam&name=Av', () => {
  it('Test For Getting Movie with filter', () => {
    chai.request(server).get('/api/v1/API/filter?director=Jam&type=Rom&cast=Sam&name=Av').send().end((err, res) => {
      res.should.have.status(200);
      res.type.should.equal('application/json');
      res.body.should.be.a('Object');
      res.body.status.should.equal('success');
      res.body.data.length.should.equal(1);
      res.body.data[0].should.have.property('Id');
      res.body.data[0].should.have.property('MovieName');
      res.body.data[0].should.have.property('Director');
      res.body.data[0].should.have.property('MovieType');
      res.body.data[0].MovieType.should.be.a('array');
      res.body.data[0].should.have.property('Cast');
      res.body.data[0].Cast.should.be.a('array');
    });
  });
  it('Test For Getting Movie with filter term Empty', () => {
    chai.request(server).get('/api/v1/API/filter').send().end((err, res) => {
      res.should.have.status(200);
      res.type.should.equal('application/json');
      res.body.should.be.a('Object');
      res.body.status.should.equal('Success');
      res.body.data.length.should.equal(0);
    });
  });
  it('Test For Getting Movie with filter term of invalid text', () => {
    chai.request(server).get('/api/v1/API/filter?director=testss&type=Rom&cast=Sam&name=Av').send().end((err, res) => {
      res.should.have.status(200);
      res.type.should.equal('application/json');
      res.body.should.be.a('Object');
      res.body.status.should.equal('Success');
      res.body.data.length.should.equal(0);
    });
  });
});
