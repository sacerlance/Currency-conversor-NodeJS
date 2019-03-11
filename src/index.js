const express = require('express');
const server = express();
const cors = require('cors');
const mysql = require('mysql');
const config = require('./config/default.json');
const connection = mysql.createConnection({
  host: config.database.host,
  user: 'rendafer',
  password: 'password',
  database: 'conversor_db',
  port: 3306
});
connection.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log('Connection opened.');
  }
});
// controllers
const statusController = require('./controllers/Status');
const currencyController = require('./controllers/Currency');

server.get('/status', function (req, res) {
  statusController.status(req, res, connection);
});

server.get('/readCurrencyExchange', function (req, res,) {
  currencyController.getCurrencyExchange(req, res, connection);
});

server.get('/readCurrencies', function (req, res) {
  currencyController.getCurrencies(req, res, connection);
});

server.use(cors());
server.listen(80, function (req, res) {
  console.log('esperando peticiones en 8000');
});
