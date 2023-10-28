const admin = require('../firebaseConfig');
const { checkRole, getUserRole } = require('../middleware/role');

const createAduit = async (data) => {
  try {
    await admin.firestore().collection("audits").add({
      messageType: data.messageType,
      message: data.message,
      date: admin.firestore.FieldValue.serverTimestamp()
    }
    );

    return { code: 200, payload: "Audit has been created" };
  } catch (error) {
    return { code: 400, payload: "Audit can't be created" };
  }
};

const readAudits = async (uid) => {
  try {
    // RBAC
    let role = await getUserRole(uid);

    if(role == null) {
      return { code: 403, payload: "You don't have permission to view this data" };
    }

    let req = await checkRole(role, "audits", "read");
    if (req === false) {
      return { code: 403, payload: "You don't have permission to view this data" };
    }
    // END OF RBAC

    const auditRef = admin.firestore().collection('audits');
    const auditsSnapshot = await auditRef.get();
    const auditsData = [];

    auditsSnapshot.forEach((doc) => {
      auditsData.push(doc.data());
    });

    return { code: 200, payload: auditsData };
  } catch (error) {
    return { code: 500, payload: "Internal Server Error" };
  }
};

module.exports = { createAduit, readAudits };