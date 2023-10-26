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
      return JSON.stringify({ code: 200, payload: userData });
    }
  } catch (error) {
    return JSON.stringify({ code: 500, payload: "Internal Server Error" });
  }
};

// Update profile picture information
const updateProfilePicture = async (uid, base64) => {
  // Your update user logic here
  try {
    const docRef = admin.firestore().collection('users').doc(uid);
    const userDoc = await docRef.get();

    if (!userDoc.exists) {
      return JSON.stringify({ code: 404, payload: 'User not found' });
    } else {
      docRef
        .update({ photoBase64: base64 })
        .then(() => {
          return JSON.stringify({code: 200, payload: "OK" });
        })
        .catch((error) => {
          return JSON.stringify({code: 400, payload: "Profile picture can not be updated. Try again later!" });
        });
    }
  } catch (error) {
    console.log(error.message);
    return JSON.stringify({ code: 500, payload: "Internal Server Error" });
  }
};

// Update user information
const updateUser = async (uid, firstName, lastName, date) => {
  // Your update user logic here
  try {
    const docRef = admin.firestore().collection('users').doc(uid);
    const userDoc = await docRef.get();

    if (!userDoc.exists) {
      return JSON.stringify({ code: 404, payload: 'User not found' });
    } else {
      docRef
        .update({ firstName: firstName, lastName: lastName, date: date })
        .then(() => {
          return JSON.stringify({code: 200, payload: "OK" });
        })
        .catch((error) => {
          return JSON.stringify({code: 400, payload: "Profile data can not be updated. Try again later!" });
        });
    }
  } catch (error) {
    console.log(error.message);
    return JSON.stringify({ code: 500, payload: "Internal Server Error" });
  }
};

// Delete a user
const deleteUser = async (uid) => {
  // Your delete user logic here
  try {
    const userRef = admin.firestore().collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return JSON.stringify({ code: 404, payload: 'User not found' });
    } else {
      await userRef.delete(); // delete user in firestore
      await admin.auth().deleteUser(uid); // delete user in auth collection
      return JSON.stringify({ code: 200, payload: userData });
    }
  } catch (error) {
    return JSON.stringify({ code: 500, payload: "Internal Server Error" });
  } 
};

module.exports = { createUser, getUserByUid, updateProfilePicture, updateUser, deleteUser };