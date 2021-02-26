import firebase from './firebase';

const firestore = firebase.firestore();

export const createUser = (
  uid: string,
  data: Record<string, unknown>
): Promise<void> => {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};

export const getUser = (
  uid: string
): Promise<
  firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
> => {
  return firestore.collection('users').doc(uid).get();
};
