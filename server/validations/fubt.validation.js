let joi = require('joi');

let getOrder = (req, res, next) => {
  let getOrderSchema = joi.object().keys({
    orderId: joi.string().required()
  });
  let { error } = joi.validate(req.query, getOrderSchema);
  if (error) res.status(422).send({
    success: false,
    error
  });
  else next();
};

let cancelOrder = (req, res, next) => {
  let cancelOrderSchema = joi.object().keys({
    orderId: joi.string().required()
  });
  let { error } = joi.validate(req.body, cancelOrderSchema);
  if (error) res.status(422).send({
    success: false,
    error
  });
  else next();
};

let placeOrder = (req, res, next) => {
  let placeOrderSchema = joi.object().keys({
    type: joi.string().required(),
    amount: joi.string().required(),
    price: joi.string().required()
  });
  let { error } = joi.validate(req.body, placeOrderSchema);
  if (error) res.status(422).send({
    success: false,
    error
  });
  else next();
};
module.exports = {
  getOrder,
  cancelOrder,
  placeOrder
};