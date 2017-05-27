const assert = require('assert');
const app = require('../../src/app');

describe('\'pets\' service', () => {
  it('registered the service', () => {
    const service = app.service('pets');

    assert.ok(service, 'Registered the service');
  });
});
