const { verifyToken } = require('./middleware');

// User route to get user by UID
app.post('/api/user', verifyToken, async (req, res) => {
  const auth_uid = req.user.uid; // property access

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
    return users.createUser(req.body);
  }
  catch(error) {
    return res.status(401).json({ error: error });
  }
});