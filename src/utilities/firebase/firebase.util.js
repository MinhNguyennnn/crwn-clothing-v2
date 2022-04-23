import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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

const provider = new GoogleAuthProvider();
provider.getCustomParameters({
  prompt: "select_account",
});

const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

export const createUsetDataFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log("userDocRef", userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log("userSnapShot", userSnapShot.exists());

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const date = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        date,
      });
    } catch (err) {
      console.log("create error", err);
    }
  }
  return userDocRef;
};
