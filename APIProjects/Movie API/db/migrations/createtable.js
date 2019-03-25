exports.up = (knex) => {
  return knex.schema.createTable('Movie', (table) => {
    table.increments('instance').primary().notNullable();
    table.string('Movie_Name');
    table.string('Director');
    table.string('upd_user').notNullable().defaultTo(false);
    table.timestamps(true, true); // => timstamp, defaultTo current
  });
};
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('Movie');
};
