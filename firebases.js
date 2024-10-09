
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDdWqu2zYRow62DuKii-tBiMuH84ccUpHY",
  authDomain: "recipeapp-f6320.firebaseapp.com",
  projectId: "recipeapp-f6320",
  storageBucket: "recipeapp-f6320.appspot.com",
  messagingSenderId: "542317566356",
  appId: "1:542317566356:web:b67f1b3b310e8e13335781",
  measurementId: "G-9QPNLV07N9"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
