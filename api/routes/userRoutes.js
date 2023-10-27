const { verifyToken } = require('../middleware/verify');
const express = require('express');
const router = express.Router();
const users = require('../controllers/userController');

// Method to check uids validaty
function Check(uid, auth_uid) {
  // Check if the request contains the 'uid' field in the body
  if (!uid) return 400;

  // Check if the authenticated user matches the requested user's UID
  if (uid !== auth_uid) return 401;

  return 200; // uids are fine
}

// User route to create a new user
router.post('/create', verifyToken, async (req, res) => {
  const auth_uid = req.user.uid; // property access
  const { uid, email, firstName, lastName, date } = req.body;
  const reqData = { uid: uid, email: email, firstName: firstName, lastName: lastName, date: date };

  if(Check(uid, auth_uid) !== 200) 
    return res.status(400).json({ code: 400, payload: "Invalid request body" });

  // Call controller method to create an user
  let data = await users.createUser(reqData);
  return res.status(data.code).json(data.payload);
});

// User route to get user by UID
router.post('/getById', verifyToken, async (req, res) => {
  const auth_uid = req.user.uid; // property access
  const { uid } = req.body;

  if(Check(uid, auth_uid) !== 200) 
    return res.status(400).json({ code: 400, payload: "Invalid request body" });

  // Call controller method for user data fetch
  let data = await users.getUserByUid(uid);
  return res.status(200).json(data);
});

// User route to get all users
router.post('/get', verifyToken, async (req, res) => {
  const auth_uid = req.user.uid; // property access
  const { uid } = req.body;

  if(Check(uid, auth_uid) !== 200) 
    return res.status(400).json({ code: 400, payload: "Invalid request body" });

  // Call controller method for users data fetch
  let data = await users.getUsers();
  return res.status(200).json(data);
});

// Update user profile picture
router.post('/updatePicture', verifyToken, async (req, res) => {
  const auth_uid = req.user.uid; // property access
  const { uid } = req.body;
  const { photoBase64 } = req.body;

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
    let data = await users.updateProfilePicture(uid, photoBase64);
    return res.status(200).json(data);
  }
  catch(error) {
    console.log(error)
    return res.status(401).json({ error: error });
  }
});

// Update user profile
router.post('/update', verifyToken, async (req, res) => {
  const auth_uid = req.user.uid; // property access
  const { uid } = req.body;
  const { firstName, lastName, date } = req.body;

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
    let data = await users.updateUser(uid, firstName, lastName, date);
    return res.status(200).json(data);
  }
  catch(error) {
    console.log(error)
    return res.status(401).json({ error: error });
  }
});

// Delete user account
router.post('/delete', verifyToken, async (req, res) => {
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
    let data = await users.deleteUser(uid);
    return res.status(200).json(data);
  }
  catch(error) {
    console.log(error)
    return res.status(401).json({ error: error });
  }
});

module.exports = router;