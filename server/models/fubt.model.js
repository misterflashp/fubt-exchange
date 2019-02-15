let mongoose = require('mongoose');

let fubtSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true
  }
}, {
    versionKey: false,
    strict: true
  });
module.exports = mongoose.model('fubt_orders', fubtSchema);