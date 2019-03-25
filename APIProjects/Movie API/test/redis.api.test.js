// process.env.NODE_ENV = 'test';
// process.env.eemAPI="http://cordelia:8314/EEMservices/api/leave/";
const chai = require('chai');
const chaiHttp = require('chai-http');
const redis = require('redis');

const server = require('../bin/app');
const knex = require('../db/connection');

const client = redis.createClient('6379', '127.0.0.1'); // creates a new client

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
    it('Test For redis having the search value', () => {
      chai.request(server).get('/api/v1/API/2/search?text=act').send().end(() => {
        client.lrange('SearchTerm', 0, -1, (error, reply) => {
          reply.should.be.a('Array');
          reply.should.contain('act');
        });
      });
    });
  });
});
describe('GET /api/v1/API/filter?director=Jam&type=Rom&cast=Sam&name=Av', () => {
  it('Test For redis having the master table', () => {
    chai.request(server).get('/api/v1/API/filter?director=Jam&type=Rom&cast=Sam&name=Av').send().end(() => {
      client.get('strMovObj', (error, reply) => {
        JSON.parse(reply).should.be.a('Object');
        JSON.parse(reply).should.have.property('movieName');
      });
    });
  });
});
