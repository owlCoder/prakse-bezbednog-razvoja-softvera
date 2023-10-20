import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {auth, firestore } from "../config/firebase";
import { addDoc, collection, doc, setDoc, serverTimestamp } from "firebase/firestore"; 

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

      // kreiranje zapisa u firestore podataka o korisniku todo1

      // todo2 upis u audit INFO Korisnik sa UID se registrovao u sistem
      await addDoc(doc(firestore, "audit"), {
        messageType: "INFO",
        message: "Korisnik sa email " + email + " je registrovan na sistem.",
        date: firestore.FieldValue.serverTimestamp()
      });

      return JSON.stringify({"response": "OK"});
    }
    catch(error) {
      // todo 3 upisati u audit preko api call neuspesna registracija
      // e sad da se ne bi preteralo sa api call mozda jedan uopsten audit message
      // tipa samo neuspsna registracija bez detalja sta kako ili sa detaljima?
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
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // azuriranje polja last login time
      
      // todo2 upis u audit info korisnik se prijavio 
      await addDoc(collection(firestore, "audit"), {
        messageType: "INFO",
        message: "Korisnik sa email " + email + " je prijavljen na sistem.",
        date: serverTimestamp()
      });

      return JSON.stringify({"response": "OK"});
    }
    catch(error) {
      // isto kao za registraciju i upis u audit
      if(error.code === "auth/invalid-login-credentials") {
        return JSON.stringify({"response": "Podaci koje ste uneli nisu ispravni!"});
      }
      else if(error.code === "auth/user-disabled") {
        return JSON.stringify({"response": "Vaš nalog je onemogućen od strane administratora!"});
      }
      else if(error.code === "auth/invalid-email") {
        return JSON.stringify({"response": "Email nije u validnom obliku!"});
      }
      else if(error.code === "auth/user-not-found") {
        return JSON.stringify({"response": "Nemamo nigde evidentiran Vaš nalog. Možda da probate da se registruje?"});
      }
      else if(error.code === "auth/too-many-requests") {
        return JSON.stringify({"response": "Previše pokušaja neuspešne prijave. Pokušajte ponovo kasnije!"});
      }
      else {
        console.log(error);
        return JSON.stringify({"response": "Desila se nepoznata greška. Pokušajte ponovo kasnije."});
      }
    } 
  }

  async function signOut()
  {
    try { 
      await auth.signOut();

      return {"response": "success"};
    }
    catch(error) {
      console.log(error);
      return {"response": error.message};
    }
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
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}