import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import auth from "../config/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function register(email, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // kreiranje zapisa u firestore
      

      return JSON.stringify({"response": "OK"});
    }
    catch(error) {
      if(error.code === "auth/weak-password") {
        return JSON.stringify({"response": "Lozinka mora biti minimalne dužine 6!"});
      }
      else if(error.code === "auth/email-already-in-use") {
        return JSON.stringify({"response": "Email je zauzet od strane drugog korisnika!"});
      }
      else if(error.code === "auth/invalid-email") {
        return JSON.stringify({"response": "Email nije u validnom obliku!"});
      }
      else if(error.code === "auth/operation-not-allowed") {
        return JSON.stringify({"response": "Registracija nije moguća!"});
      }
      else {
        return JSON.stringify({"response": "Desila se nepoznata greška. Pokušajte ponovo kasnije."});
      }
    } 
  }

  async function login(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async function resetPassword(email) {
    try {
      await auth().sendPasswordResetEmail(email);
      return "success";
    } catch (error) {
      return {
        error: error.message,
      };
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}