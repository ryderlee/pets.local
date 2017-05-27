const assert = require('assert');
const app = require('../../src/app');

describe('\'customers-action\' service', () => {
  it('registered the service', () => {
    const service = app.service('customers/:id/:action');

    assert.ok(service, 'Registered the service');
  });
});
