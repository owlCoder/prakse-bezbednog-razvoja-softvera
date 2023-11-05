const { verifyToken } = require('../middleware/verify');
const express = require('express');
const router = express.Router();
const products = require('../controllers/productController');

// Method to check uids validaty
function Check(uid, auth_uid) {
  // Check if the request contains the 'uid' field in the body
  if (!uid) return 400;

  // Check if the authenticated user matches the requested user's UID
  if (uid !== auth_uid) return 401;

  return 200; // uids are fine
}

// User route to get all users
router.post('/get', verifyToken, async (req, res) => {
  const { uid } = req.body;

  // RBAC
  let role = await getUserRole(uid);

  if (role == null || role != "admin") {
    return res.status(403).json({ code: 403, payload: "You don't have permission to view this data" });
  }

  let reqs = await checkRole(role, "users", "read");
  if (reqs === false) {
    return res.status(403).json({ code: 403, payload: "You don't have permission to view this data" });
  }
  // END OF RBAC

  // Call controller method for users data fetch
  let data = await users.getUsers(uid);
  return res.status(200).json(data);
});

module.exports = router;