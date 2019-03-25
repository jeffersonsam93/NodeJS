const Codedetail = [
  {
    User_name: 'Jeff',
  },
  {
    User_name: 'Hardy',
  },
  {
    User_name: 'Amir',
  },
  {
    User_name: 'Sri',
  },
  {
    User_name: 'Ram',
  },
  {
    User_name: 'Charan',
  },
  {
    User_name: 'Tim',
  },
  {
    User_name: 'Shankar',
  },
  {
    User_name: 'Pravin',
  },
];
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('User').del()
    .then(() => {
      // Inserts seed entries
      return knex('User').insert(Codedetail);
    });
};

