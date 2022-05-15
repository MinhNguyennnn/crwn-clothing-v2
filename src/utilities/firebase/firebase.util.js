import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc, // get one sigle doc
  getDocs, //get multi docs
  setDoc,
  collection,
  writeBatch,
  query,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx0tejRlHpE4bljeDn9MLw0oJJ07LtIqw",
  authDomain: "crwn-clothing-db-v2-f5fbb.firebaseapp.com",
  projectId: "crwn-clothing-db-v2-f5fbb",
  storageBucket: "crwn-clothing-db-v2-f5fbb.appspot.com",
  messagingSenderId: "493675842702",
  appId: "1:493675842702:web:549d3cece1bbe6406fcddf",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.getCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

//sign in with google redirect - optional
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

const db = getFirestore();

export const addCollectionAndDocToFireBase = async (collectionKey, DataObj) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db, collectionKey);

  DataObj.forEach((data) => {
    const docRef = doc(collectionRef, data.title.toLowerCase());
    batch.set(docRef, data);
  });

  await batch.commit();
  console.log("data created");
};

export const getCategoriesAndDocument = async () => {
  const collectionRef = collection(db, "category");
  const q = query(collectionRef); // get the collection

  const querySnapShot = await getDocs(q); //get the doc
  console.log(querySnapShot)
  const categoryMap = querySnapShot.docs.reduce((accum, docSnapShot) => {
    const { title, items } = docSnapShot.data();
    accum[title.toLowerCase()] = items;
    return accum;
  }, {});

  return categoryMap;
};

export const createUsetDataFromAuth = async (
  userAuth,
  additionalUserInfo = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log("userDocRef", userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const date = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        date,
        ...additionalUserInfo,
      });
    } catch (err) {
      console.log("create error", err);
    }
  }
  return userDocRef;
};

export const createUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const userSignOut = async () => {
  return await signOut(auth);
};

export const authStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
