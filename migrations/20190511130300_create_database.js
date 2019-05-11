const uuid = require('uuid/v4');
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('sessions', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(uuid());
      table.string('code');
      table.uuid('eventId');
    })
    .createTable('questions', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(uuid());
      table.string('description');
      table.uuid('userId');
      table
        .uuid('sessionId')
        .references('id')
        .inTable('sessions')
        .onDelete('SET NULL')
        .index();
    })
    .createTable('answers', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(uuid());
      table.string('description');
      table
        .uuid('questionId')
        .references('id')
        .inTable('questions')
        .onDelete('SET NULL')
        .index();
    })
    .createTable('ratings', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(uuid());
      table.uuid('userId');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('ratings')
    .dropTableIfExists('answers')
    .dropTableIfExists('questions')
    .dropTableIfExists('sessions');
};