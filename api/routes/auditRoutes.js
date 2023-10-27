const { verifyToken } = require('../middleware/verify');
const express = require('express');
const router = express.Router();
const audits = require('../controllers/auditController');

// Method to check uids validaty
function Check(uid, auth_uid) {
    // Check if the request contains the 'uid' field in the body
    if (!uid) return 400;

    // Check if the authenticated user matches the requested user's UID
    if (uid !== auth_uid) return 401;

    return 200; // uids are fine
}

// Route to create a new audit
router.post('/create', verifyToken, async (req, res) => {
    const { messageType, message } = req.body;

    // Call controller method to create an audit
    let data = await audits.createAduit({ messageType, message });
    return res.status(data.code).json(data.payload);
});

// Route to read all audits
router.post('/get', verifyToken, async (req, res) => {
    // Call controller method to read the audits
    let data = await audits.readAduits();
    return res.status(data.code).json(data.payload);
});

module.exports = router;