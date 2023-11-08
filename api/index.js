const express = require('express');
var cors = require('cors');
const app = express();
const path = require('path');

var bodyParser = require('body-parser'); // Configure app settings

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors()); // Enable CORS policy

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

// enable cors
app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:5000', 'http://localhost:5000', 'http://127.0.0.1:3000', 'http://localhost:3000', 'https://oib.vercel.app/'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.get(['/', '/api'], (req, res) => { // Default route to show static API3 page
  res.sendFile(path.join(__dirname, 'static', 'index.html')); 
});

app.listen(5000, () => { }); // create a server listener