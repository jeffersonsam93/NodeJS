const knex = require('./connection');

function getAllCodedetail(name) {
  return knex(name).select();
}

function getSingleCodedetail(CodedetailId) {
  return knex('Movie').select().where('instance', CodedetailId);
}

function addCodedetail(obj) {
  return knex('Movie').insert(obj);
}

function updateCodedetail(CodedetailId, obj) {
  return knex('Movie').update(obj).where('instance', CodedetailId);
}

function removeCodedetail(CodedetailId) {
  return knex('Movie').del().where('instance', CodedetailId);
}

function getSingleCodedetailShortDesc(CodedetailId) {
  return knex('Movie').select().where('short_desc', CodedetailId);
}

function getMovieInstancesDirector(searchstring) {
  const splitString = searchstring.split(',');
  const arrprom = [];
  splitString.forEach((value) => {
    const prom = knex('Movie').select('instance').where('Director', 'like', `%${value}%`);
    arrprom.push(prom);
  });
  return arrprom;
}

function getMovieInstancesName(searchstring) {
  const splitString = searchstring.split(',');
  const arrprom = [];
  splitString.forEach((value) => {
    const prom = knex('Movie').select('instance').where('Movie_name', 'like', `%${value}%`);
    arrprom.push(prom);
  });
  return arrprom;
}

function getMovieInstancesCast(searchstring) {
  const splitString = searchstring.split(',');
  const arrprom = [];
  splitString.forEach((value) => {
    const prom = knex('MovieClassify').select('Movie_instance').leftJoin('Starring', function () {
      this.on('MovieClassify.clasifyInstance', '=', 'Starring.instance');
    }).where('Starring.starrer', 'like', `%${value}%`)
      .andWhere('MovieClassify.clasifyType', 'C');
    arrprom.push(prom);
  });
  return arrprom;
}
function getMovieInstancesType(searchstring) {
  const splitString = searchstring.split(',');
  const arrprom = [];
  splitString.forEach((value) => {
    const prom = knex('MovieClassify').select('Movie_instance').leftJoin('MovType', function () {
      this.on('MovieClassify.clasifyInstance', '=', 'MovType.instance');
    }).where('MovType.Movie_Type', 'like', `%${value}%`)
      .andWhere('MovieClassify.clasifyType', 'T');
    arrprom.push(prom);
  });
  return arrprom;
}

function getMovieFrmInstances(ArrInst) {
  return knex('Movie').select({ Id: 'Instance', Title: 'Movie_Name', Director: 'Director' })
    .whereIn('Movie.Instance', ArrInst);
}

function getTypeFrmInstances(instance) {
  return knex('MovieClassify').select({ Id: 'MovieClassify.Movie_instance', MovieType: 'Movie_Type' }).leftJoin('MovType', function () {
    this.on('MovType.Instance', '=', 'MovieClassify.clasifyInstance');
  })
    .where('MovieClassify.Movie_instance', instance)
    .andWhere('MovieClassify.clasifyType', '=', 'T');
}

function getCastFrmInstances(instance) {
  return knex('MovieClassify').select({ Id: 'MovieClassify.Movie_instance', Cast: 'starrer' }).leftJoin('Starring', function () {
    this.on('Starring.Instance', '=', 'MovieClassify.clasifyInstance');
  })
    .where('MovieClassify.Movie_instance', instance)
    .andWhere('MovieClassify.clasifyType', '=', 'C');
}
function getMovieDetail() {
  return knex('Movie').select({
    instance: 'Movie.instance',
    MovieName: 'Movie.Movie_Name',
    Director: 'Movie.Director',
    cast: 'Starring.starrer',
    MovieType: 'MovType.Movie_Type',
  }).leftJoin('MovieClassify', 'Movie.instance', 'MovieClassify.Movie_instance').leftJoin('Starring', function () {
    this.on('Starring.Instance', '=', 'MovieClassify.clasifyInstance').onIn('MovieClassify.clasifyType', ['C']);
  })
    .leftJoin('MovType', function () {
      this.on('MovType.Instance', '=', 'MovieClassify.clasifyInstance').onIn('MovieClassify.clasifyType', ['T']);
    });
}

module.exports = {
  getAllCodedetail,
  getSingleCodedetail,
  addCodedetail,
  updateCodedetail,
  removeCodedetail,
  getSingleCodedetailShortDesc,
  getMovieInstancesDirector,
  getMovieInstancesCast,
  getMovieInstancesType,
  getMovieFrmInstances,
  getMovieInstancesName,
  getTypeFrmInstances,
  getCastFrmInstances,
  getMovieDetail,
};
