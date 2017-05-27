const beforeCustomersJoinCustomersPreferences = require('../../hooks/beforeCustomersJoinCustomersPreferences');
const afterCustomersJoinCustomersPreferences = require('../../hooks/afterCustomersJoinCustomersPreferences');
const beforeCustomersPostCustomersPreferences= require('../../hooks/beforeCustomersPostCustomersPreferences');
const afterCustomersPostCustomersPreferences= require('../../hooks/afterCustomersPostCustomersPreferences');

module.exports = {
  before: {
    all: [],
    find: [beforeCustomersJoinCustomersPreferences()],
    get: [beforeCustomersJoinCustomersPreferences()],
    create: [beforeCustomersPostCustomersPreferences()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [afterCustomersJoinCustomersPreferences()],
    get: [afterCustomersJoinCustomersPreferences()],
    create: [afterCustomersPostCustomersPreferences()],
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
