// Initializes the `customers-action` service on path `/customers/:id/:action`
const createService = require('./customers-action.class.js');
const hooks = require('./customers-action.hooks');
const filters = require('./customers-action.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'customers-action',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/customers/:id/:action', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('customers/:id/:action');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
