'use strict';

require('babel-register')({});
require("babel-polyfill");

var server = require('./server').default;
const PORT = process.env.PORT || 3000;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // only for development on localhost

server.listen(PORT, function (err) {
  if (err) {
    throw new Error(err);
  }

  console.log('Server listening on port', PORT);
});
