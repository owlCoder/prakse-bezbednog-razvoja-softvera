const app = require('./app'); // The path to your app file
const path = require('path');

// Default route to show static API3 page
app.get(['/', '/api'], (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// create a server listener
app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});