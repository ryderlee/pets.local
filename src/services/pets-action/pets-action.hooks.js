const beforePetsMatchingCustomers = require('../../hooks/beforePetsMatchingCustomers');

module.exports = {
  before: {
    all: [beforePetsMatchingCustomers()],
    find: [beforePetsMatchingCustomers()],
    get: [beforePetsMatchingCustomers()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [beforePetsMatchingCustomers()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
