const admin = require('../firebaseConfig');

const PERMISSIONS = { READ: 1, WRITE: 2, UPDATE: 3, DELETE: 4 };

const checkRole = async (role, collectionName, reqPerm) => {
  try {
    const doc = await admin.firestore().collection('roles').doc(role).get();
    if (!doc.exists) return false;

    const data = doc.data();
    const requiredPermission = PERMISSIONS[reqPerm.toUpperCase()];
    const permArray = data[collectionName.toLowerCase()];

    return permArray.includes(requiredPermission);
  } catch (error) {
    return false;
  }
};

const getUserRole = async (uid) => {
  try {
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    if (!userDoc.exists) return null;

    const userData = userDoc.data();
    return userData.role || null;
  } catch (error) {
    return null;
  }
};

module.exports = { checkRole, getUserRole };
