let async = require('async');
let fubtDbo = require('../dbos/fubt.dbo');
let utf8 = require('utf8');
let crypto = require("crypto");
let sharedSecret = require('../../config/private').sharedSecret;
let accessKeyId = require('../../config/private').accessKeyId;
let symbol = utf8.encode('sent_btc');
let source = utf8.encode('api');

let getOrder = (req, res) => {
  let { orderId } = req.query;
  id = utf8.encode(orderId);
  let query = `id=${id}`;
  async.waterfall([
    (next) => {
      let signature = crypto.createHmac("sha1", sharedSecret).update(query).digest("hex");
      let options = {
        method: 'get',
        uri: encodeURI(`https://rest.fubt.top/v1/order/orders?id=${id}`),
        headers: {
          "AccessKeyId": accessKeyId
        },
        qs: {
          'sign': signature
        }
      }
      next(null, options);
    }, (options, next) => {
      fubtDbo.requestFUBT(options, (error, data) => {
        if (error) next({
          status: 500,
          message: "error"
        }, null);
        else {
          next(null, {
            status: 200,
            data: data
          });
        }
      });
    }], (error, result) => {
      let response = Object.assign({
        success: !error
      }, error || result);
      let status = response.status;
      delete (response.status);
      res.status(status).send(response);
    });
}

let cancelOrder = (req, res) => {
  let { orderId } = req.body;
  id = utf8.encode(orderId);
  let query = `id=${id}`;
  async.waterfall([
    (next) => {
      let signature = crypto.createHmac("sha1", sharedSecret).update(query).digest("hex");
      let options = {
        method: 'post',
        uri: encodeURI('https://rest.fubt.top/v1/order/orders/submitcancel'),
        headers: {
          "AccessKeyId": "Zp7/Ua3UrDuocIZAzAY1"
        },
        qs: {
          'id': id,
          'sign': signature
        }
      }
      next(null, options);
    }, (options, next) => {
      fubtDbo.requestFUBT(options, (error, data) => {
        if (error) next({
          status: 500,
          message: "error"
        }, null);
        else {
          next(null, {
            status: 200,
            data: data
          });
        }
      });
    }], (error, result) => {
      let response = Object.assign({
        success: !error
      }, error || result);
      let status = response.status;
      delete (response.status);
      res.status(status).send(response);
    });
}
let placeOrder = (req, res) => {
  let { amount,
    type,
    price } = req.body;
  let tradeAmount = utf8.encode(amount);
  let tradePrice = utf8.encode(price);
  type = utf8.encode(type);
  let query = `source=${source}&symbol=${symbol}&tradeAmount=${tradeAmount}&tradePrice=${tradePrice}&type=${type}`

  async.waterfall([
    (next) => {
      let signature = crypto.createHmac("sha1", sharedSecret).update(query).digest("hex");
      let options = {
        method: 'post',
        uri: encodeURI('https://rest.fubt.top/v1/order/orders/place'),
        headers: {
          AccessKeyId: "Zp7/Ua3UrDuocIZAzAY1"
        },
        qs: {
          'sign': signature,
          'source': source,
          'symbol': symbol,
          'timestamp': Date.now(),
          'tradeAmount': tradeAmount,
          'tradePrice': tradePrice,
          'type': type
        }
      }
      next(null, options);
    }, (options, next) => {
      fubtDbo.requestFUBT(options, (error, data) => {
        if (error) next({
          status: 500,
          message: "error"
        }, null);
        else {
          next(null, {
            status: 200,
            data: data
          });
        }
      });
    }], (error, result) => {
      let response = Object.assign({
        success: !error
      }, error || result);
      let status = response.status;
      delete (response.status);
      res.status(status).send(response);
    });
}

module.exports = {
  getOrder,
  placeOrder,
  cancelOrder
};