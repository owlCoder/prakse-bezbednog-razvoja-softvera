const express = require('express');
var cors = require('cors');
const app = express();
const path = require('path');

// Configure app settings
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Enable CORS policy
app.use(cors());

// Routes for users
const userRoutes = require('./routes/userRoutes'); // Import the userRoutes

/// ROUTES
// Use the userRoutes in your app
app.use('/api', userRoutes); // Define a base path for user routes, e.g., '/api/users'




// Default route to show static API3 page
app.get(['/', '/api'], (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// create a server listener
app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});