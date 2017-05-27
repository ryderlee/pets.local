const pets = require('./pets/pets.service.js');
const customers = require('./customers/customers.service.js');
const petsAction = require('./pets-action/pets-action.service.js');
const customersAction = require('./customers-action/customers-action.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(pets);
  app.configure(customers);
  app.configure(petsAction);
  app.configure(customersAction);
};
