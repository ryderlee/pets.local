// Initializes the `pets-action` service on path `/pets/:id/:action`
const createService = require('./pets-action.class.js');
const hooks = require('./pets-action.hooks');
const filters = require('./pets-action.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'pets-action',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/pets/:id/:action', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('pets/:id/:action');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
