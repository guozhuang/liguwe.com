// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
var mongoose = require('./config/mongoose'),
    express = require('./config/express');



var db = mongoose();

// Create a new Express application instance
var app = express();



app.listen(3000);

console.log('Server running at http://localhost:3000/');

module.exports = app;