const currencyService = require('../services/currencyService');

module.exports = {
  getCurrencyExchange: async (req, res, connection) => {
    try {
      const currency = await currencyService.getCurrencyExchange(req.query.exchange_origin, req.query.exchange_destination, connection);
      res.send(currency);
    } catch (err) {
      console.log('error: ', err);
    }
  },
  getCurrencies: async (req, res, connection) => {
    try {
      const currencies = await currencyService.getCurrencies(connection);
      console.log('currencies con: ', currencies);
      res.send(currencies);
    } catch (err) {
      console.log('err: ', err);
      throw err;
    }
  }
};
