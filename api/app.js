const express = require('express');
const app = express();

// Configure app settings
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Import user controller
const users = require('../controllers/userController');

// Export the app
module.exports = app;
