/* eslint-disable no-console */

// customers-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');

  db.schema.createTableIfNotExists('customers', table => {
    table.increments('id');
    table.string('name');
    table.integer('customer_adopt_pet_id');
  })
  .then(() => console.log('Updated customers table'))
  .catch(e => console.error('Error updating customers table', e));

  return db;
};
