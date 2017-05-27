const _ = require('lodash');

module.exports = function () {
  return function(hook){
    let query = hook.app.get('knexClient');
    let data = null;
    if(!_.isArray(hook.data)) {
      data = [hook.data];
    } else {
      data = hook.data;
    }
    let newData = [];
    let newParam = {};
    let obj = data[0];
    _.forOwn(obj, (value, key) => {
      if(key.startsWith('preferred_')) {
        newParam[key] = value;
        delete obj[key];
      }
    });
    hook.data = obj;
    console.log(hook.data);
    hook.params.customersPreferences = newParam;
    console.log(hook.params.customersPreferences);
  };
};
