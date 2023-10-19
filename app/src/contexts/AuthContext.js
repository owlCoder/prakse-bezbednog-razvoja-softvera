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
    return await createUserWithEmailAndPassword(auth, email, password);
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