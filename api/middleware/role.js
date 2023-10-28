const admin = require('../firebaseConfig');

const PERMISSIONS = { READ: 1, WRITE: 2, UPDATE: 3, DELETE: 4 };

const checkRole = async (role, collectionName, reqPerm) => {
    try {
        const doc = await admin.firestore().collection('roles').doc(role).get();

        if (doc.exists) {
            const data = doc.data();
            const requiredPermission = PERMISSIONS[reqPerm.toUpperCase()];
            const permArray = data[collectionName.toLowerCase()];

            if (permArray.includes(requiredPermission)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

module.exports = { checkRole };