const _ = require('lodash');
const knex = require('knex');

module.exports = function () {
  return function (hook) {
    console.log(hook.params.action);
    if(hook.params.action == 'matches') {
      let query = hook.app.get('knexClient');
      return query.select().from('customers_preferences').where('customer_id', hook.params.id).then((rows) => {
        let row = rows[0];
        let petQuery = hook.app.get('knexClient');
        petQuery = petQuery .select('*').from('pets').whereNull('pet_adopted_by_user_id');
        if(!_.isNull(row['preferred_age_upper_bound']))
          petQuery = petQuery .andWhere(knex.raw('age <= ?', row['preferred_age_upper_bound']));
        if(!_.isNull(row['preferred_age_lower_bound']))
          petQuery = petQuery .andWhere(knex.raw('age >= ?', row['preferred_age_lower_bound']));
        if(!_.isNull(row['preferred_species'])){
          petQuery = petQuery .andWhere(knex.raw('species = ?', row['preferred_species']));
          if(!_.isNull(row['preferred_age_lower_bound']))
            petQuery = petQuery .andWhere(knex.raw('breed IN (?)', row['preferred_breed']));
        }
        return petQuery.then((petRows) =>{
          hook.result=petRows;
          return hook;
        });
      });
    } else if(hook.params.action == 'adopt') {
      console.log('adopt start');
      let query = hook.app.get('knexClient');
      return query.select().from('customers').whereNull('customer_adopt_pet_id').andWhere('id', hook.params.id).then((rows) => {
        console.log('cp1');
        console.log(rows);
        if(rows.length > 0) { //customer found
          console.log('cp2');
          let knex = hook.app.get('knexClient');

          // Using trx as a query builder:
          return knex.transaction(function(trx) {
            return trx('customers').where('id', hook.params.id) .update({customer_adopt_pet_id:hook.params.query.pet_id})
            .then(function(id1) {
              return trx('pets').where('id', hook.params.query.pet_id).update({pet_adopted_by_user_id: hook.params.id})
              .then(function(id2){
                hook.result = {status:200};
                return hook;
              });
            });
          })
          .then(function(insert) {
            console.log('success');
            hook.result = {status:200};
            return hook;
          })
          .catch(function(error) {
            // If we get here, that means that neither the 'Old Books' catalogues insert,
            // nor any of the books inserts will have taken place.
            console.error(error);
            hook.result = {status:500};
            return hook;
          });




        } else {
          hook.result = {status:200,message:'user adopt record exists'};
          return hook;
        }

      })
    }
    return hook;
  };
};
