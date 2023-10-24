const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://oibis-ftn.firebaseio.com',
});

const app = express();
const port = process.env.PORT || 5000;

var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Middleware to verify Firebase Authentication token
const verifyToken = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' + error });
  }
};

// Route to fetch user data from Firestore
app.post('/api/user', verifyToken, async (req, res) => {
  const auth_uid = req.user.uid; // property access

console.log(req.body);
const { uid } = req.body;

  // Check if the request contains the 'uid' field in the body
  if (!uid) {
    return res.status(400).json({ error: "Missing 'uid' field in the request body." });
  }

  // Check if the authenticated user matches the requested user's UID
  if (uid !== auth_uid) {
    return res.status(403).json({ error: "Unauthorized." });
  }

  try {
    const userRef = admin.firestore().collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      res.status(404).json({ error: 'User not found' });
    } else {
      const userData = userDoc.data();
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// create a server listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
