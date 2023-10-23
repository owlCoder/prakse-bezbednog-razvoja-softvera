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