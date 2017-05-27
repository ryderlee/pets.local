/* eslint-disable no-console */

// pets-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');

  db.schema.createTableIfNotExists('pets', table => {
    table.increments('id');
    table.string('name');
    table.datetime('available_from');
    table.integer('age');
    table.integer('pets_adopted_by_user_id');
    table.enum('species', ['cat', 'dog', 'rabbit']).notNullable();
    table.enum('breed', ['labrador', 'poodle', 'spaniel', 'terrier']).notNullable();
  })
  .then(() => console.log('Updated pets table'))
  .catch(e => console.error('Error updating pets table', e));

  return db;
};
