const Codedetail = [
  {
    starrer: 'Leonardo DiCaprio',
  },
  {
    starrer: 'Kate Winslet',
  },
  {
    starrer: 'Billy Zane',
  },
  {
    starrer: 'Sam Worthington',
  },
  {
    starrer: 'Zoe Saldana',
  },
  {
    starrer: 'Sigourney Weaver',
  },
  {
    starrer: 'Matt Damon',
  },
  {
    starrer: 'Jessica Chastain',
  },
  {
    starrer: 'Kristen Wiig',
  },
  {
    starrer: 'Tom Hardy',
  },
  {
    starrer: 'Will Poulter',
  },
  {
    starrer: 'Charlize Theron',
  },
  {
    starrer: 'Nicholas Hoult',
  },
  {
    starrer: 'Hugh Jackman',
  },
  {
    starrer: 'Patrick Stewart',
  },
  {
    starrer: 'Dafne Keen',
  },
  {
    starrer: 'Tim Robbins',
  },
  {
    starrer: 'Morgan Freeman',
  },
  {
    starrer: 'Bob Gunton',
  },
  {
    starrer: 'Robert Downey Jr.',
  },
  {
    starrer: 'Chris Hemsworth',
  },
  {
    starrer: 'Mark Ruffalo',
  },
  {
    starrer: 'Marlon Brando',
  },
  {
    starrer: 'Al Pacino',
  },
  {
    starrer: 'James Caan',
  },
  {
    starrer: 'Christian Bale',
  },
  {
    starrer: 'Heath Ledger',
  },
  {
    starrer: 'Aaron Eckhart',
  },
  {
    starrer: 'John Travolta',
  },
  {
    starrer: 'Uma Thurman',
  },
  {
    starrer: 'Samuel L. Jackson',
  },
];
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('Starring').del()
    .then(() => {
      // Inserts seed entries
      return knex('Starring').insert(Codedetail);
    });
};

