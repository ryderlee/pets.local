const knex = require('knex');

module.exports = function () {
  const app = this;
  const { client, connection, pool} = app.get('mariadb');
  const db = knex({ client, connection, pool });

  app.set('knexClient', db);
};
