import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  // console.log(user);

  // create an account with email and password
  const userCreate = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sing in user with password and email
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login with google
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // sign out user
  const userSignOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // user email verification
  const emailVerification = () => {
    return sendEmailVerification(auth.currentUser);
  };

  // user profile update
  const userProfileUpdate = (profileInfo) => {
    return updateProfile(auth.currentUser,profileInfo)
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  const userInfo = {
    userCreate,
    signInUser,
    userSignOut,
    user,
    loading,
    loginWithGoogle,
    resetPassword,
    emailVerification,
    userProfileUpdate
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
