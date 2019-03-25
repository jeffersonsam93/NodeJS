exports.up = (knex) => {
  return knex.schema.createTable('User', (table) => {
    table.increments('instance').primary().notNullable();
    table.string('User_name');
    table.string('upd_user').notNullable().defaultTo(false);
    table.timestamps(true, true); // => timstamp, defaultTo current
  });
};
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('User');
};
