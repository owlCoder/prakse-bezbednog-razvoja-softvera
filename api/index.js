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

const userRoutes = require('./routes/userRoutes'); // Import the userRoutes
const auditRoutes = require('./routes/auditRoutes'); // Import the auditRoutes

/// ROUTES
// Use the userRoutes in your app
app.use('/api/user',  userRoutes);  // Define a base path for user routes, e.g., '/api/user'
app.use('/api/audit', auditRoutes); // Define a base path for audit routes, e.g., '/api/audit'


// Default route to show static API3 page
app.get(['/', '/api'], (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// create a server listener
app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});