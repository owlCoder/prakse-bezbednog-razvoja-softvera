const admin = require('../firebaseConfig');

// Create an audit entry
const createAudit = async (data) => {
  try {
    // Add an audit document to the "audits" collection
    await admin.firestore().collection("audits").add({
      messageType: data.messageType,
      message: data.message,
      date: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { code: 200, payload: "Audit has been created" };
  } catch (error) {
    // Handle errors and return an error response
    return { code: 400, payload: "Audit can't be created" };
  }
};

// Read all audit entries
const readAudits = async () => {
  try {
    const auditRef = admin.firestore().collection('audits');

    // Fetch all audit documents in the "audits" collection
    const auditsSnapshot = await auditRef.get();
    const auditsData = [];

    // Convert each audit document into a data object and collect them in an array
    auditsSnapshot.forEach((doc) => {
      auditsData.push(doc.data());
    });

    return { code: 200, payload: auditsData };
  } catch (error) {
    // Handle errors and return an error response
    return { code: 500, payload: "Internal Server Error" };
  }
};

module.exports = { createAudit, readAudits };
