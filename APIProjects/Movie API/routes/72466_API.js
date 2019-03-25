const express = require('express');
const redis = require('redis');
const amqp = require('amqplib/callback_api');

const router = express.Router();
const queries = require('../db/queries.js');
const mongoqueries = require('../db/mongoquery.js');

const client = redis.createClient('6379', '127.0.0.1'); // creates a new client
function initExecQueue() {
  amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((error, ch) => {
      const q = 'syncData';
      ch.assertQueue(q, { durable: false });
      ch.consume(q, (msg) => {
        client.set('strMovObj', msg.content.toString());
      }, { noAck: true });
    });
  });
}
initExecQueue();
function startQueue() {
  queries.getMovieDetail().then((movTable) => {
    const movieObj = {};
    movTable.forEach((data) => {
      movieObj[data.MovieName] = movieObj[data.MovieName] || {};
      movieObj[data.MovieName].Id = data.instance;
      movieObj[data.MovieName].MovieName = data.MovieName;
      movieObj[data.MovieName].Director = data.Director;
      if (data.cast) {
        if (!movieObj[data.MovieName].Cast) {
          movieObj[data.MovieName].Cast = [];
        }
        movieObj[data.MovieName].Cast.push(data.cast);
      }
      if (data.MovieType) {
        if (!movieObj[data.MovieName].MovieType) {
          movieObj[data.MovieName].MovieType = [];
        }
        movieObj[data.MovieName].MovieType.push(data.MovieType);
      }
    });
    amqp.connect('amqp://localhost', (err, conn) => {
      conn.createChannel((error, ch) => {
        const q = 'syncData';
        ch.assertQueue(q, { durable: false });
        // Note: on Node 6 Buffer.from(msg) should be used
        ch.sendToQueue(q, Buffer.from(JSON.stringify(movieObj)));
        console.log('Sent data');
      });
    });
    // client.set('strMovObj', JSON.stringify(movieObj));
  }).catch((err) => {
    console.log(err);
  });
}
/*
get single Codedetail
 */
router.post('/Seedmongodata', (req, res) => {
  queries.getAllCodedetail('Movie').then((movTable) => {
    mongoqueries.insertCollectionDocuments('Movie', movTable).then(() => {
      queries.getAllCodedetail('MovieClassify').then((MovieClassify) => {
        mongoqueries.insertCollectionDocuments('MovieClassify', MovieClassify).then(() => {
          queries.getAllCodedetail('Starring').then((Starring) => {
            mongoqueries.insertCollectionDocuments('Starring', Starring).then(() => {
              queries.getAllCodedetail('MovType').then((MovType) => {
                mongoqueries.insertCollectionDocuments('MovType', MovType).then(() => {
                  queries.getAllCodedetail('User').then((User) => {
                    mongoqueries.insertCollectionDocuments('User', User).then(() => {
                      return res.json({
                        status: 'Success',
                        data: 'Ready',
                      });
                    }).catch((err) => {
                      return res.json({
                        status: 'Error',
                        data: err,
                      });
                    });
                  });
                }).catch((err) => {
                  return res.json({
                    status: 'Error',
                    data: err,
                  });
                });
              });
            }).catch((err) => {
              return res.json({
                status: 'Error',
                data: err,
              });
            });
          });
        }).catch((err) => {
          return res.json({
            status: 'Error',
            data: err,
          });
        });
      });
    }).catch((err) => {
      return res.json({
        status: 'Error',
        data: err,
      });
    });
  });
});
router.post('/Updatemongodata', (req, res) => {
  mongoqueries.updateDocuments(req.body.vals, req.body.updvals).then((retval) => {
    return res.json({
      status: 'Success',
      data: retval,
    });
  }).catch((err) => {
    return res.json({
      status: 'Error',
      data: err,
    });
  });
});
router.post('/Deletemongodata', (req, res) => {
  mongoqueries.DeleteDocuments(req.body).then((retval) => {
    return res.json({
      status: 'Success',
      data: retval,
    });
  }).catch((err) => {
    return res.json({
      status: 'Error',
      data: err,
    });
  });
});
router.post('/Insertmongodata', (req, res) => {
  mongoqueries.insertDocuments(req.body).then((retval) => {
    return res.json({
      status: 'Success',
      data: retval,
    });
  }).catch((err) => {
    return res.json({
      status: 'Error',
      data: err,
    });
  });
});
router.get('/mongodata', (req, res) => {
  mongoqueries.getallvals().then((retval) => {
    return res.json({
      status: 'Success',
      data: retval,
    });
  }).catch((err) => {
    return res.json({
      status: 'Error',
      data: err,
    });
  });
});
router.post('/mongodata', (req, res) => {
  mongoqueries.getallvals(req.body).then((retval) => {
    return res.json({
      status: 'Success',
      data: retval,
    });
  }).catch((err) => {
    return res.json({
      status: 'Error',
      data: err,
    });
  });
});
router.get('/filter', (req, res) => {
  const directorFilter = req.query.director;
  const typeFilter = req.query.type;
  const castFilter = req.query.cast;
  const nameFilter = req.query.name;
  const modeName = req.query.mode;
  const promise = new Promise((resolve, reject) => {
    // client.del('strMovObj', (err, reply) => {
    //   console.log(reply);
    // });
    client.get('strMovObj', (error, reply) => {
      const masterMobObj = JSON.parse(reply);
      if (!masterMobObj || modeName === 'database') {
        queries.getMovieDetail().then((movTable) => {
          const movieObj = {};
          movTable.forEach((data) => {
            movieObj[data.MovieName] = movieObj[data.MovieName] || {};
            movieObj[data.MovieName].Id = data.instance;
            movieObj[data.MovieName].MovieName = data.MovieName;
            movieObj[data.MovieName].Director = data.Director;
            if (data.cast) {
              if (!movieObj[data.MovieName].Cast) {
                movieObj[data.MovieName].Cast = [];
              }
              movieObj[data.MovieName].Cast.push(data.cast);
            }
            if (data.MovieType) {
              if (!movieObj[data.MovieName].MovieType) {
                movieObj[data.MovieName].MovieType = [];
              }
              movieObj[data.MovieName].MovieType.push(data.MovieType);
            }
          });
          // client.set('strMovObj', JSON.stringify(movieObj));
          setInterval(() => { startQueue(); }, 2000);
          resolve(movieObj);
        }).catch((err) => {
          console.log(err);
          reject();
        });
      } else {
        resolve(masterMobObj);
      }
    });
    // do a thing, possibly async, then…
  });
  promise.then((movObj) => {
    const movArrDir = Object.values(movObj).filter((value) => {
      return value.Director && value.Director.indexOf(directorFilter) > -1;
    });
    return movArrDir;
  }).then((movArrDir) => {
    const movArrType = movArrDir.filter((value) => {
      if (value.MovieType) {
        return value.MovieType.some((singval) => {
          return singval.indexOf(typeFilter) > -1;
        });
      }
      return false;
    });
    return movArrType;
  }).then((movArrType) => {
    const movArrCast = movArrType.filter((value) => {
      if (value.Cast) {
        return value.Cast.some((singval) => {
          return singval.indexOf(castFilter) > -1;
        });
      }
      return false;
    });
    return movArrCast;
  }).then((movArrCast) => {
    const movArrName = movArrCast.filter((value) => {
      if (value.MovieName && value.MovieName.indexOf(nameFilter) > -1) {
        return true;
      }
      return false;
    });
    return res.json({
      status: 'Success',
      data: movArrName,
    });
  });
});


router.get('/:userId/search', (req, res, next) => {
  const promise = new Promise((resolve) => {
    // do a thing, possibly async, then…
    resolve();
  });
  promise.then(() => {
    client.rpush(['SearchTerm', req.query.text]);
    client.lrange('SearchTerm', 0, -1, (err, reply) => {
      console.log(reply);
    });
    const movdirInstance = queries.getMovieInstancesDirector(req.query.text);
    const movcastInst = queries.getMovieInstancesCast(req.query.text);
    const movtypeInst = queries.getMovieInstancesType(req.query.text);
    const movnamInst = queries.getMovieInstancesName(req.query.text);
    Array.prototype.push.apply(movdirInstance, movcastInst);
    Array.prototype.push.apply(movdirInstance, movtypeInst);
    Array.prototype.push.apply(movdirInstance, movnamInst);
    return movdirInstance;
  }).then((arrprom) => {
    Promise.all(arrprom).then((retVal) => {
      const movInst = [];
      retVal.forEach((element) => {
        element.forEach((value) => {
          if (value.instance) {
            movInst.push(value.instance);
          }
          if (value.Movie_instance) {
            movInst.push(value.Movie_instance);
          }
        });
      });
      queries.getMovieFrmInstances(movInst).then((response) => {
        const arrpromises = [];
        response.forEach((moviedet) => {
          let prom = queries.getTypeFrmInstances(moviedet.Id);
          arrpromises.push(prom);
          prom = queries.getCastFrmInstances(moviedet.Id);
          arrpromises.push(prom);
        });
        Promise.all(arrpromises).then((result) => {
          response.forEach((moviedet, index) => {
            result.forEach((Arrval) => {
              Arrval.forEach((val) => {
                if (moviedet.Id === val.Id) {
                  if (val.Cast) {
                    if (!response[index].Cast) {
                      response[index].Cast = [];
                    }
                    response[index].Cast.push(val.Cast);
                  }
                  if (val.MovieType) {
                    if (!response[index].MovieType) {
                      response[index].MovieType = [];
                    }
                    response[index].MovieType.push(val.MovieType);
                  }
                }
              });
            });
          });
          return res.json({
            status: 'Success',
            data: response,
          });
        });
      }).catch((err) => {
        return next(err);
      });
    });
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;
