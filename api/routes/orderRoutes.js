const { verifyToken } = require('../middleware/verify');
const express = require('express');
const router = express.Router();
const orders = require('../controllers/orderController');

// Method to check uids validaty
function Check(uid, auth_uid) {
  // Check if the request contains the 'uid' field in the body
  if (!uid) return 400;

  // Check if the authenticated user matches the requested user's UID
  if (uid !== auth_uid) return 401;

  return 200; // uids are fine
}


module.exports = router;