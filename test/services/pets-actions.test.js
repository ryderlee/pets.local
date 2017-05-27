const assert = require('assert');
const app = require('../../src/app');

describe('\'pets_actions\' service', () => {
  it('registered the service', () => {
    const service = app.service('pets/:id/:actions');

    assert.ok(service, 'Registered the service');
  });
});
