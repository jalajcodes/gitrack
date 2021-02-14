import React, { useState, useEffect, createContext, useContext } from 'react';
import { createUser } from './db';
import firebase from './firebase';

interface AuthContext {
  user: Partial<firebase.User>;
  signinWithGithub: () => void;
  signinWithTwitter: () => void;
  signOut: () => void;
}

const authContext = createContext<Partial<AuthContext>>({});

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  const auth = useContext(authContext);
  if (!auth.signinWithGithub) {
    throw new Error("Can't use Auth outside of its provider tree.");
  }
  return auth;
};

function useProvideAuth() {
  const [user, setUser] = useState<Partial<firebase.User>>();

  const handleUser = (rawFirebaseUser) => {
    if (rawFirebaseUser) {
      const user = formatUser(rawFirebaseUser);
      createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setUser(null);
      return false;
    }
  };

  const signinWithGithub = async () => {
    const response = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider());

    handleUser(response.user);
  };

  const signinWithTwitter = async () => {
    const response = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.TwitterAuthProvider());

    handleUser(response.user);
  };

  const signOut = async () => {
    await firebase.auth().signOut();
    handleUser(false);
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => handleUser(user));

    return () => unsubscribe();
  }, []);

  return { user, signinWithGithub, signinWithTwitter, signOut };
}

const formatUser = (user: firebase.User) => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    avatar: user.photoURL,
    provider: user.providerData[0].providerId
  };
};
