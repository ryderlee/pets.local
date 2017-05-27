module.exports = function () {
  return function (hook) {
    let query = hook.service.createQuery(hook.params.query);
    query.select('customers_preferences.*').leftJoin('customers_preferences', 'customers.id', 'customers_preferences.customer_id');
    hook.params.knex = query;
  };
};
