'use strict';

require('babel-register')({});
require("babel-polyfill");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // only for development on localhost

require('./server');
