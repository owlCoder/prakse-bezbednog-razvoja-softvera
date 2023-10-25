const { verifyToken } = require('../middleware/verify');
const express = require('express');
const router = express.Router();
const users = require('../controllers/userController');

// User route to get user by UID
router.post('/user', verifyToken, async (req, res) => {
  const auth_uid = req.user.uid; // property access
  const { uid } = req.body;

  // Check if the request contains the 'uid' field in the body
  if (!uid) {
    return res.status(400).json({ error: "Missing 'uid' field in the request body." });
  }

  // Check if the authenticated user matches the requested user's UID
  if (uid !== auth_uid) {
    return res.status(403).json({ error: "Unauthorized." });
  }

  // Call controller method for user data fetch
  try {
    let data = await users.getUser(uid);
    return res.status(200).json(data);
  }
  catch(error) {
    console.log(error)
    return res.status(401).json({ error: error });
  }
});

module.exports = router;