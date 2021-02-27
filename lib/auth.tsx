import React, { useState, useEffect, createContext, useContext } from 'react';
import Router from 'next/router';
import { createUser } from './db';
import firebase from './firebase';
import localforage from '../node_modules/localforage/dist/localforage';

interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  avatar: string;
  provider: string;
  token: string;
  username: string;
}

interface AuthContext {
  user: AuthUser;
  signinWithGithub: (redirect?: string) => void;
  signOut: () => void;
}

const authContext = createContext<Partial<AuthContext>>({});

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = (): Partial<AuthContext> => {
  const auth = useContext(authContext);
  if (typeof auth === 'undefined') {
    throw new Error('Auth can only be used inside a Provider');
  }
  return auth;
};

function useProvideAuth() {
  const [user, setUser] = useState<AuthUser>();
  const { username, token } = localforage.getItem('userData');

  const handleUser = async ({ rawFirebaseUser, token, username }) => {
    if (rawFirebaseUser) {
      const user = formatUser(rawFirebaseUser, username, token);
      setUser(user);
      return user;
    } else {
      setUser(null);
      try {
        await localforage.removeItem('userData');
      } catch (error) {
        console.log(error);
      }
      return false;
    }
  };

  const signinWithGithub = async (redirect: string) => {
    const response = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider());

    const rawFirebaseUser = response.user;
    const credential = response.credential as firebase.auth.OAuthCredential;
    const token = credential.accessToken;
    const githubUsername = response.additionalUserInfo.username;
    const user = formatUser(rawFirebaseUser, githubUsername, token);
    try {
      await localforage.setItem('userData', { ...user });
    } catch (error) {
      console.log(error);
    }
    if (rawFirebaseUser && credential && githubUsername) {
      createUser(user.uid, user);
      handleUser({
        rawFirebaseUser,
        token: credential.accessToken,
        username: githubUsername
      });
    }
    if (redirect) {
      Router.push(redirect);
    }
  };

  const signOut = async () => {
    Router.push('/');
    await firebase.auth().signOut();
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      const userData = await localforage.getItem('userData');
      if (userData) {
        handleUser({ rawFirebaseUser: user, token, username });
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, signinWithGithub, signOut };
}

const formatUser = (user: firebase.User, username, token) => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    avatar: user.photoURL,
    provider: user.providerData[0].providerId,
    token,
    username
  };
};
