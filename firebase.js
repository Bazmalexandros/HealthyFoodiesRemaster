import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { API_KEY, API_ID} from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "healthyfoodies-1d8e8.firebaseapp.com",
    projectId: "healthyfoodies-1d8e8",
    storageBucket: "healthyfoodies-1d8e8.appspot.com",
    messagingSenderId: "335664167814",
    appId: API_ID
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };