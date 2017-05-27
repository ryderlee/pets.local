const _ = require('lodash');
const knex = require('knex');

module.exports = function () {
  return function (hook) {
    console.log(hook.params);
    console.log(hook.params.action);
    if(hook.params.action == 'matches') {
      let query = hook.app.get('knexClient');
      return query.select().from('pets').whereRaw('available_from < NOW()').andWhere('id', hook.params.id).then((rows) => {
        let row = rows[0];
        let customerQuery = hook.app.get('knexClient');
        customerQuery = customerQuery.select('*').from('customers_preferences').leftJoin('customers', 'customers.id','customers_preferences.customer_id')
        .whereNull('customers.customer_adopt_pet_id')
        .andWhere(knex.raw('(preferred_age_upper_bound IS NULL OR preferred_age_upper_bound >= ?)', row['age']))
        .andWhere(knex.raw('(preferred_age_lower_bound IS NULL OR preferred_age_lower_bound <= ?)', row['age']));
        if(!_.isNull(row['spices']))
          customerQuery = customerQuery.andWhere(knex.raw('(preferred_species IS NULL OR preferred_species = ?)', row['species']));
        if(!_.isNull(row['breed']))
          customerQuery = customerQuery.andWhere(knex.raw('(preferred_breed IS NULL OR FIND_IN_SET(?, preferred_breed))', row['breed']));
        return customerQuery.then((customerRows) =>{
          hook.result=customerRows;
          return hook;
        });
      });
    }
    return hook;
  };
};
