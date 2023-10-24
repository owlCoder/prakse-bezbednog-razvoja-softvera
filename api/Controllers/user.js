import firebase from '../firebase.js';
import User from '../Models/user.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

// API method to add an user into collection of users
export const createUser = async (req, res, next) => {
    try {
      const data = req.body;
      await addDoc(collection(db, 'users'), data);
      res.status(200).send('user created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  // API method to get all users from collection of users
  export const getUsers = async (req, res, next) => {
    try {
      const users = await getDocs(collection(db, 'users'));
      const usersArray = [];
  
      if (users.empty) {
        res.status(400).send('No Users found');
      } else {
        users.forEach((doc) => {
          const user = new User(
            doc.uid,
            doc.data().firstName,
            doc.data().lastName,
            doc.data().email,
            doc.data().dateBirth,
            doc.data().lastAccessDate,
            doc.data().photoBase64
          );
          usersArray.push(user);
        });
  
        res.status(200).send(usersArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  // API to read particular user from users collection
  export const getUserByUid = async (req, res, next) => {
    const { uid } = req.body; // Assuming the UID is passed in the request body
    const authenticatedUid = req.user.uid; // Assuming you have middleware that adds the authenticated user's UID to the request
  
    if (!uid) {
      res.status(400).send('UID is missing in the request JSON.');
      return;
    }
  
    // Check if the authenticated user's UID matches the requested UID
    if (authenticatedUid !== uid) {
      res.status(403).send('Unauthorized: The requested UID does not match the authenticated user.');
      return;
    }
  
    try {
      const userRef = doc(db, 'users', uid); // Assuming 'users' is the name of your collection
  
      const userDoc = await getDoc(userRef);
  
      if (!userDoc.exists()) {
        res.status(404).send('User not found');
      } else {
        const userData = userDoc.data();
        const user = new User(
          uid,
          userData.firstName,
          userData.lastName,
          userData.email,
          userData.dateBirth,
          userData.lastAccessDate,
          userData.photoBase64
        );
  
        res.status(200).send(user);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  
  