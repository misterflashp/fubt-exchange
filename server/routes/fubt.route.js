let fubtController = require('../controllers/fubt.controller');
let fubtValidation = require('../validations/fubt.validation');

module.exports = (server) => {

  server.get('/order', fubtValidation.getOrder, fubtController.getOrder);

  server.post('/order/cancel', fubtValidation.cancelOrder, fubtController.cancelOrder);

  server.post('/order', fubtValidation.placeOrder, fubtController.placeOrder);
};