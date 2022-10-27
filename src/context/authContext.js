import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
const Authcontext = createContext();
export function AuthcontextProvider({ children }) {
  const [user, setUser] = useState({});
  function signUp(email, password, name) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "users", email), {
      savedMovie: [],
      name: name,
    });
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unSubscribe();
    };
  });
  return (
    <Authcontext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </Authcontext.Provider>
  );
}
export function UserAuth() {
  return useContext(Authcontext);
}
