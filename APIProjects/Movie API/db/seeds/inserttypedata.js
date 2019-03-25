const Codedetail = [
  {
    Movie_Type: 'Drama',
  },
  {
    Movie_Type: 'Romance',
  },
  {
    Movie_Type: 'Action',
  },
  {
    Movie_Type: 'Adventure',
  },
  {
    Movie_Type: 'Fantasy',
  },
  {
    Movie_Type: 'Sci-Fi',
  },
  {
    Movie_Type: 'History',
  },
  {
    Movie_Type: 'Crime',
  },
];
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('MovType').del()
    .then(() => {
      // Inserts seed entries
      return knex('MovType').insert(Codedetail);
    });
};
