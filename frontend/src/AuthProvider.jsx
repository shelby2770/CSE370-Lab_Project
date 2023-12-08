import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./firebase.config";

const auth = getAuth(app);
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const create_user = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const log_out = () => signOut(auth);
  useEffect(() => {
    const toggle = onAuthStateChanged(auth, (current_user) => {
      setUser(current_user);
    });
    return () => toggle();
  }, []);

  const sign_in_user = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const sign_in_google = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const userInfo = { user, loading, create_user, sign_in_user, log_out,  sign_in_google};

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
