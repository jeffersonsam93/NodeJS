exports.up = (knex) => {
  return knex.schema.createTable('MovieClassify', (table) => {
    table.increments('instance').primary().notNullable();
    table.integer('Movie_instance').notNullable();
    table.string('clasifyType').notNullable();
    table.integer('clasifyInstance').notNullable();
    table.string('upd_user').notNullable().defaultTo(false);
    table.timestamps(true, true); // => timstamp, defaultTo current
  });
};
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('MovieClassify');
};

