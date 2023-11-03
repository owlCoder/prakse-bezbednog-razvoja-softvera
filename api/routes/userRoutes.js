const { verifyToken } = require('../middleware/verify');
const express = require('express');
const router = express.Router();
const users = require('../controllers/userController');
const { checkRole, getUserRole } = require('../middleware/role');
const admin = require('../firebaseConfig');

// Method to check uids validity
function Check(uid, auth_uid) {
  if (!uid || uid !== auth_uid) {
    return false;
  }
  return true;
}

// Create a helper function for RBAC checks and response handling
async function handleRequestWithRBAC(req, res, roleCheck, action) {
  const auth_uid = req.user.uid;
  const { uid, ...data } = req.body;

  if (!Check(uid, auth_uid)) {
    return res.status(400).json({ code: 400, payload: "Invalid request body" });
  }

  let role = await getUserRole(uid);
  if (role == null) {
    return res.status(403).json({ code: 403, payload: "You don't have permission to view this data" });
  }

  let reqs = await checkRole(role, "users", action);
  if (reqs === false) {
    return res.status(403).json({ code: 403, payload: "You don't have permission to perform this action" });
  }

  try {
    const result = await roleCheck(uid, data);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ code: 400, payload: error.message });
  }
}

// User route to create a new user or new account
router.post('/create', verifyToken, async (req, res) => {
  const { u_role } = req.body;
  if (u_role) {
    // User creation
    return handleRequestWithRBAC(req, res, users.createUser, "write");
  } else {
    // New account creation
    return handleRequestWithRBAC(req, res, async (uid, data) => {
      const userProperties = {
        uid,
        email: data.email,
        displayName: `${data.firstName} ${data.lastName}`,
      };
      
      const userRecord = await admin.auth().createUser(userProperties);
      data.uid = userRecord.uid;
      
      return await users.createUser(data);
    }, "write");
  }
});

// User route to get user by UID
router.post('/getById', verifyToken, async (req, res) => {
  return handleRequestWithRBAC(req, res, users.getUserByUid, "read");
});

// Admin route to create a new user in FIREBASE AUTH base & FireStore base
router.post('/newAccount', verifyToken, async (req, res) => {
  return handleRequestWithRBAC(req, res, async (uid, data) => {
    const { userProperties, userData } = data;
    const userRecord = await admin.auth().createUser(userProperties);
    userData.uid = userRecord.uid;

    return await users.createUser(userData);
  }, "write");
});

// User route to get user ROLE by UID
router.post('/getRoleByUid', verifyToken, async (req, res) => {
  return handleRequestWithRBAC(req, res, getUserRole, "read");
});

// User route to get all users
router.post('/get', verifyToken, async (req, res) => {
  return handleRequestWithRBAC(req, res, users.getUsers, "read");
});

// Update user profile picture
router.post('/updatePicture', verifyToken, async (req, res) => {
  return handleRequestWithRBAC(req, res, users.updateProfilePicture, "update");
});

// Update user profile
router.post('/update', verifyToken, async (req, res) => {
  return handleRequestWithRBAC(req, res, users.updateUser, "update");
});

// Delete user account
router.post('/delete', verifyToken, async (req, res) => {
  return handleRequestWithRBAC(req, res, users.deleteUser, "delete");
});

module.exports = router;
