const admin = require('../firebaseConfig');

// Create a new user
const createUser = async (data) => {
  try {
    const userRef = admin.firestore().collection('users').doc(data.uid);

    // Check if the user already exists
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      return { code: 400, payload: 'User already exists' };
    }

    // Create a new user document in Firestore
    await userRef.set({
      uid: data.uid,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      date: data.date,
      photoBase64: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4...`,
      boughtUids: [],
      soldUids: [],
      productsUids: [],
      role: "user",
      disabled: false
    });

    // Log user registration as an audit
    await admin.firestore().collection("audits").add({
      messageType: "INFO",
      message: "User [email: " + data.email + "] is now registered in the system",
      date: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { code: 200, payload: "User has been created" };
  } catch (error) {
    // Handle errors and log them as an audit
    await admin.firestore().collection("audits").add({
      messageType: "ERROR",
      message: "User [email: " + data.email + "] couldn't be registered in the system [" + `${error.message}` + "]",
      date: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { code: 400, payload: "User can't be created" };
  }
};

// Get user data by UID
const getUserByUid = async (uid) => {
  try {
    const userRef = admin.firestore().collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return { code: 404, payload: 'User not found' };
    } else {
      const userData = userDoc.data();
      return { code: 200, payload: userData };
    }
  } catch (error) {
    return { code: 500, payload: "Internal Server Error" };
  }
};

// Get a list of all users
const getUsers = async () => {
  try {
    const userRef = admin.firestore().collection('users');
    const usersSnapshot = await userRef.get();
    const usersData = usersSnapshot.docs.map(doc => doc.data());

    return { code: 200, payload: usersData };
  } catch (error) {
    // Handle errors and log them as an audit
    await admin.firestore().collection("audits").add({
      messageType: "ERROR",
      message: error.message,
      date: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { code: 500, payload: "Internal Server Error" };
  }
};

// Update the profile picture of a user
const updateProfilePicture = async (uid, base64) => {
  try {
    const docRef = admin.firestore().collection('users').doc(uid);
    const userDoc = await docRef.get();

    if (!userDoc.exists) {
      return { code: 404, payload: 'User not found' };
    }

    // Update the user's profile picture
    await docRef.update({ photoBase64: base64 });

    return { code: 200, payload: "OK" };
  } catch (error) {
    return { code: 400, payload: "Profile picture can not be updated. Try again later!" };
  }
};

// Update user information
const updateUser = async (uid, firstName, lastName, date) => {
  try {
    const docRef = admin.firestore().collection('users').doc(uid);
    const userDoc = await docRef.get();

    if (!userDoc.exists) {
      return { code: 404, payload: 'User not found' };
    }

    // Update user data (first name, last name, and date)
    await docRef.update({ firstName, lastName, date });

    return { code: 200, payload: "OK" };
  } catch (error) {
    return { code: 400, payload: "Profile data can't be updated. Try again later!" };
  }
};

// Delete a user by UID
const deleteUser = async (uid) => {
  try {
    const userRef = admin.firestore().collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return { code: 404, payload: 'User not found' };
    }

    // Delete user in Firestore and Auth collection
    await userRef.delete();
    await admin.auth().deleteUser(uid);

    return { code: 200, payload: 'User deleted' };
  } catch (error) {
    // Handle errors and log them as an audit
    await admin.firestore().collection("audits").add({
      messageType: "ERROR",
      message: error.message,
      date: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { code: 500, payload: "Internal Server Error" };
  }
};

module.exports = { createUser, getUserByUid, getUsers, updateProfilePicture, updateUser, deleteUser };