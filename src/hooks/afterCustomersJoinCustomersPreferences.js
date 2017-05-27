const _ = require('lodash');

module.exports = function () {
  return function(hook){
    _.each(hook.result.data, function (transObj) {
      let prefObj = {};
      _.forOwn(transObj, function (value, key) {
        if (key.startsWith('preferred_')) {
          prefObj[key] = value;
          delete transObj[key];
        }
      });
      transObj.preference = prefObj;
    });
  };
};
