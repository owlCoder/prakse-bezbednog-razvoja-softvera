import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getAuth,
} from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // LOGIN FUNCTION
  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // azuriranje polja last login time
      // provera da li je verifikovao email
      if (auth && auth.currentUser.emailVerified === false) {
        await signOut();
        setCurrentUser(null);
        return JSON.stringify({ response: "Niste verifikovali email adresu!" });
      }

      // todo2 upis u audit info korisnik se prijavio
      await addDoc(collection(firestore, "audit"), {
        messageType: "INFO",
        message: "Korisnik sa email " + email + " je prijavljen na sistem.",
        date: serverTimestamp(),
      });

      return JSON.stringify({ response: "OK" });
    } catch (error) {
      // isto kao za registraciju i upis u audit
      if (error.code === "auth/invalid-login-credentials") {
        return JSON.stringify({
          response: "Podaci koje ste uneli nisu ispravni!",
        });
      } else if (error.code === "auth/user-disabled") {
        return JSON.stringify({
          response: "Vaš nalog je onemogućen od strane administratora!",
        });
      } else if (error.code === "auth/invalid-email") {
        return JSON.stringify({ response: "Email nije u validnom obliku!" });
      } else if (error.code === "auth/user-not-found") {
        return JSON.stringify({
          response:
            "Nemamo nigde evidentiran Vaš nalog. Možda da probate da se registruje?",
        });
      } else if (error.code === "auth/too-many-requests") {
        await addDoc(collection(firestore, "audit"), {
          messageType: "WARNING",
          message:
            "Korisnik sa email " +
            email +
            " je pokušao da pristupi sa tuđim nalogom na sistem.",
          date: serverTimestamp(),
        });
        return JSON.stringify({
          response:
            "Previše pokušaja neuspešne prijave. Pokušajte ponovo kasnije!",
        });
      } else {
        await addDoc(collection(firestore, "audit"), {
          messageType: "ERROR",
          message: error.message,
          date: serverTimestamp(),
        });

        return JSON.stringify({
          response: "Desila se nepoznata greška. Pokušajte ponovo kasnije.",
        });
      }
    }
  }

  // REGISTER FUNCTION
  async function register(email, password, firstName, lastName, date) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser);
      let uid = auth.currentUser.uid;
      await signOut();

      // kreiranje zapisa u firestore podataka o korisniku todo1
      await setDoc(doc(firestore, "users", uid), {
        uid: uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        date: date,
        photoBase64: "",
        kupljenePloceUids: [],
        prodatePloceUids: [],
        postavljeniOglasiUids: [],
        role: "base",
        lastAccessDate: serverTimestamp(),
      });

      // todo2 upis u audit INFO Korisnik sa UID se registrovao u sistem
      await addDoc(collection(firestore, "audit"), {
        messageType: "INFO",
        message: "Korisnik sa email " + email + " je registrovan na sistem.",
        date: serverTimestamp(),
      });

      return JSON.stringify({
        response: "Verifikacioni email je poslat na Vašu e-adresu.",
      });
    } catch (error) {
      // todo 3 upisati u audit preko api call neuspesna registracija
      // e sad da se ne bi preteralo sa api call mozda jedan uopsten audit message
      // tipa samo neuspsna registracija bez detalja sta kako ili sa detaljima?
      if (error.code === "auth/weak-password") {
        return JSON.stringify({
          response: "Lozinka mora biti minimalne dužine 6!",
        });
      } else if (error.code === "auth/email-already-in-use") {
        return JSON.stringify({
          response: "Email je zauzet od strane drugog korisnika!",
        });
      } else if (error.code === "auth/invalid-email") {
        return JSON.stringify({ response: "Email nije u validnom obliku!" });
      } else if (error.code === "auth/operation-not-allowed") {
        return JSON.stringify({ response: "Registracija nije moguća!" });
      } else {
        await addDoc(collection(firestore, "audit"), {
          messageType: "ERROR",
          message: error.message,
          date: serverTimestamp(),
        });

        return JSON.stringify({
          response: "Desila se nepoznata greška. Pokušajte ponovo kasnije.",
        });
      }
    }
  }

  // SIGN OUT FUNCTION
  async function signOut() {
    try {
      await addDoc(collection(firestore, "audit"), {
        messageType: "INFO",
        message:
          "Korisnik sa email " +
          auth.currentUser.email +
          " se odjavio sa sistema.",
        date: serverTimestamp(),
      });

      await auth.signOut();
      setCurrentUser(null);
      localStorage.clear();
      return { response: "success" };
    } catch (error) {
      console.log(error);
      return { response: error.message };
    }
  }

  // RESET PASSWORD FUNCTION
  async function resetPasswordEmail(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      await addDoc(collection(firestore, "audit"), {
        messageType: "INFO",
        message:
          "Korisnik sa email " +
          auth.currentUser.email +
          " је zahtevao resetovanje lozinke.",
        date: serverTimestamp(),
      });
      return "success";
    } catch (error) {
      await addDoc(collection(firestore, "audit"), {
        messageType: "ERROR",
        message: error.message,
        date: serverTimestamp(),
      });

      return {
        error: error.message,
      };
    }
  }

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
    signOut,
    resetPasswordEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
