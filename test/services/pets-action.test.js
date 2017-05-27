const assert = require('assert');
const app = require('../../src/app');

describe('\'pets-action\' service', () => {
  it('registered the service', () => {
    const service = app.service('pets/:id/:action');

    assert.ok(service, 'Registered the service');
  });
});
