const { verifyToken } = require('../middleware/verify');
const express = require('express');
const router = express.Router();
const audits = require('../controllers/auditController');

// Route to create a new audit
router.post('/create', verifyToken, async (req, res) => {
    const { messageType, message } = req.body;

    // Call controller method to create an audit
    let data = await audits.createAduit({ messageType, message });
    return res.status(data.code).json(data.payload);
});

// Route to read all audits
router.post('/get', verifyToken, async (req, res) => {
    const { uid } = req.body;
    // Call controller method to read the audits
    let data = await audits.readAudits(uid);
    return res.status(data.code).json(data.payload);
});

module.exports = router;