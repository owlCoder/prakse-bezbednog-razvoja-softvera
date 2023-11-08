const express = require('express');
const app = express();
const path = require('path');

var bodyParser = require('body-parser'); // Configure app settings

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const userRoutes = require('./routes/userRoutes');   // Import the users routes
const auditRoutes = require('./routes/auditRoutes'); // Import the audits routes
const orderRoutes = require('./routes/orderRoutes'); // Import the orders routes
const productRoutes = require('./routes/productRoutes'); // Import the products routes
const rolesRoutes = require('./routes/roleRoutes'); // Import the roles routes

// Working mode - demonstration purposes only (keep flag WM_SECURE)
// Available values WM_SECURE, WM_UNRESTRICTED
global.WM = "WM_SECURE";

/// ROUTES
app.use('/api/user',  userRoutes);  // Define a base path for user routes, e.g., '/api/user'
app.use('/api/audit', auditRoutes); // Define a base path for audit routes, e.g., '/api/audit'
app.use('/api/order', orderRoutes); // Define a base path for order routes, e.g., '/api/order'
app.use('/api/product', productRoutes); // Define a base path for product routes, e.g., '/api/product'
app.use('/api/role', rolesRoutes); // Define a base path for roles routes, e.g., '/api/role'

app.get(['/', '/api'], (req, res) => { // Default route to show static API3 page
  res.sendFile(path.join(__dirname, 'static', 'index.html')); 
});

app.listen(5000, () => { }); // create a server listener