const admin = require('../firebaseConfig');

// Create a user
const createUser = async (userData) => {
  // create user logic here
  
};

// Read user information
const getUserByUid = async (uid) => {
  // Read user by uid
  try {
    const userRef = admin.firestore().collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return JSON.stringify({ code: 404, payload: 'User not found' });
    } else {
      const userData = userDoc.data();
      return JSON.stringify({code: 200, payload: userData });
    }
  } catch (error) {
    return JSON.stringify({code: 500, payload: "Internal Server Error" });
  }
};

// Update user information
const updateUser = async (uid, newData) => {
  // Your update user logic here
};

// Delete a user
const deleteUser = async (uid) => {
  // Your delete user logic here
};

module.exports = { createUser, getUserByUid, updateUser, deleteUser };