const axios = require('axios');
const currencyDal = require('../dals/currency_dal');

module.exports = {

  getCurrencyExchange: async(currencyOrigin, currencyDestination, connection) => {
    try {
      const url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + currencyOrigin + '&to_currency=' + currencyDestination + '&apikey=' + '42DXNVKQL5N4EWLG';
      const exchange = await axios.get(url);
      let exchangeRatio;
      if (exchange.data['Realtime Currency Exchange Rate'] && exchange.data['Realtime Currency Exchange Rate']['5. Exchange Rate']) {
        exchangeRatio = exchange.data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
      } else exchangeRatio = undefined;
      currencyDal.addExchangeRatio(currencyOrigin, currencyDestination, connection, exchangeRatio);
      return exchangeRatio;
    } catch (err) {
      console.log('error: ', err);
      throw err;
    }
  },

  getCurrencies: async (connection) => {
    try {
      const currencies = await currencyDal.getCurrencies(connection);
      return currencies;
    } catch (err) {
      console.log('error: ', err);
      throw err;
    }
  }
};
