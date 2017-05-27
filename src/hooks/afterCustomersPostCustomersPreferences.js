const _ = require('lodash');

module.exports = function () {
  return function(hook){
    let query = hook.app.get('knexClient');
    let newParam = hook.params.customersPreferences;
    query('customers_preferences').insert(_.assign(newParam, {customer_id: hook.result.id})).then((rows) => {
      return hook;
    });
  };
};
