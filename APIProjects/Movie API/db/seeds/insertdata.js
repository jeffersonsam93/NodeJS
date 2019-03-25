const Codedetail = [
  {
    Movie_Name: 'Titanic',
    Director: 'James Cameroon',
    upd_user: 'jdhanasingh',
  },
  {
    Movie_Name: 'Avatar',
    Director: 'James Cameroon',
    upd_user: 'jdhanasingh',
  },
  {
    Movie_Name: 'The Martian',
    Director: 'Ridley Scott',
    upd_user: 'jdhanasingh',
  },
  {
    Movie_Name: 'The Revenant',
    Director: 'Alejandro G. Iñárritu',
    upd_user: 'jdhanasingh',
  },
  {
    Movie_Name: 'Mad Max: Fury',
    Director: 'George Miller',
    upd_user: 'jdhanasingh',
  },
  {
    Movie_Name: 'Logan',
    Director: 'James Mangold',
    upd_user: 'jdhanasingh',
  },
  {
    Movie_Name: 'The Shawshank Redemption',
    Director: 'Frank Darabont',
    upd_user: 'jdhanasingh',
  },
  {
    Movie_Name: 'Avengers: Infinity War',
    Director: 'Anthony Russo',
    upd_user: 'jdhanasingh',
  },
  {
    Movie_Name: 'The Godfather',
    Director: 'Francis Ford Coppola',
    upd_user: 'jdhanasingh',
  },
  {
    Movie_Name: 'The Dark Knight',
    Director: 'Christopher Nolan',
    upd_user: 'jdhanasingh',
  },
  {
    Movie_Name: 'Pulp Fiction',
    Director: 'Quentin Tarantino',
    upd_user: 'jdhanasingh',
  },
];

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('Movie').del()
    .then(() => {
      // Inserts seed entries
      return knex('Movie').insert(Codedetail);
    });
};
