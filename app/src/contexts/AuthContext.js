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
import axios from "axios";

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
          response: "Desila se nepoznata greška. Pokušajte ponovo kasnije." + error.message,
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
      var token = await auth.currentUser.getIdToken();

      // call api to create a new user in firestore
      const response = await axios.post(
        global.APIEndpoint + "/api/createUser",
        { uid: uid, email: email, firstName: firstName, lastName: lastName, date: date },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      await signOut(); // sign out user, to make verify email possible

      if (response.status === 200)
        return { response: "A verification email has been sent to your email address." };
      else
        return { response: response.data.payload };

    } catch (error) {
      if (error.code === "auth/weak-password")
        return { response: "The password must have a minimum length of 6" };
      else if (error.code === "auth/email-already-in-use")
        return { response: "The email is taken by another user" };
      else if (error.code === "auth/invalid-email")
        return { response: "The email is not in a valid format" };
      else if (error.code === "auth/operation-not-allowed")
        return { response: "Registration is temporary unavailable" };
      else {

        // await axios.post(
        //   global.APIEndpoint + "/api/createAudit",
        //   { messageType: "ERROR", message: error.message, date: serverTimestamp() },
        //   {
        //     headers: {
        //       Authorization: `${token}`,
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );
        return { response: "An unknown error has occurred. Try again later" };
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
          "Korisnik sa email " + email +
          " је zahtevao resetovanje lozinke.",
        date: serverTimestamp(),
      });
      return JSON.stringify({ code: "200", response: "Password reset email has been sent." });
    } catch (error) {
      await addDoc(collection(firestore, "audit"), {
        messageType: "ERROR",
        message: error.message,
        date: serverTimestamp(),
      });

      return JSON.stringify({
        code: "500",
        response: "Invalid Email has been entered.",
      });
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
