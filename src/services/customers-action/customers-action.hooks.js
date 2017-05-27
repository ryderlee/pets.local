
const beforeCustomersMatchingPets = require('../../hooks/beforeCustomersMatchingPets')

module.exports = {
  before: {
    all: [],
    find: [beforeCustomersMatchingPets()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
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
