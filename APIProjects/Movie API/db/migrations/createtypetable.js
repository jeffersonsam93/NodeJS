exports.up = (knex) => {
  return knex.schema.createTable('MovType', (table) => {
    table.increments('instance').primary().notNullable();
    table.string('Movie_Type');
    table.string('upd_user').notNullable().defaultTo(false);
    table.timestamps(true, true); // => timstamp, defaultTo current
  });
};
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('MovType');
};
