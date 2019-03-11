
module.exports = {
  getCurrencies: async (connection) => {
    try {
      let currencies = await new Promise((resolve, reject) => connection.query('SELECT name, code FROM currency ', [], function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ));
      return currencies;
    } catch (err) {
      console.log('error: ', err);
      throw err;
    }
  },

  addExchangeRatio: (currencyOrigin, currencyDestination, connection, exchangeRatio) => {
    try {
      connection.query('INSERT INTO currency_exchange (exchange_from, exchange_to, ratio ) VALUES (?,?,?)', [currencyOrigin, currencyDestination, exchangeRatio], function (error, result) {
        if (error) {
          throw error;
        }
      }
    );
    } catch (err) {
      console.log('error: ', err);
    }
  }

};
