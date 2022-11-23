import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { API_KEY, API_ID } from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "healthyfoodiestec.firebaseapp.com",
    projectId: "healthyfoodiestec",
    storageBucket: "healthyfoodiestec.appspot.com",
    messagingSenderId: "367804159258",
    appId: API_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };