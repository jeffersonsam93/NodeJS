const path = require('path');

module.exports = {
  development: {
    client: 'mssql',
    connection: {
      server: 'CORDELIA',
      user: 'sa',
      password: 'Eagle2018',
      connectionTimeout: 300000,
      requestTimeout: 300000,
      port: 1433,
      pool: {
        idleTimeoutMillis: 300000,
        max: 100,
      },
      database: 'Emanager',
      options: {
        database: 'Emanager',
        encrypt: true, // mandatory for microsoft azure sql server
      },
    },
    options: {
      encrypt: true,
    },
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds'),
    },
  },
  test: {
    client: 'mssql',
    connection: {
      server: 'CORDELIA',
      user: 'sa',
      password: 'Eagle2018',
      connectionTimeout: 300000,
      requestTimeout: 300000,
      port: 1433,
      pool: {
        idleTimeoutMillis: 300000,
        max: 100,
      },
      options: {
        database: 'Emanager',
        encrypt: true, // mandatory for microsoft azure sql server
      },
    },
    options: {
      encrypt: true,
    },
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds'),
    },
  },
  development2: {
    client: 'pg',
    connection: {
      host: 'postgres9',
      user: 'postgres',
      password: 'postgres',
      database: 'node_jobs_dev',
    },
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds'),
    },
  },
  test2: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'postgrestest',
      user: 'postgres',
      password: 'Eagle2017',
    },
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds'),
    },
  },

};
