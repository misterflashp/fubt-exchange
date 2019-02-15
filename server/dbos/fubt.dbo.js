let request = require('request');

let requestFUBT = (options, cb) => {
  request(options, (error, response, data) => {
    if (error) cb(error, null);
    else cb(null, data);
  });
}

module.exports = {
  requestFUBT
};