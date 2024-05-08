import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCGpWy13bQaZAZxwDbmHnz0zxKR-dsOpEQ",
    authDomain: "tilly-e-honest-pro-artisans.firebaseapp.com",
    projectId: "tilly-e-honest-pro-artisans",
    storageBucket: "tilly-e-honest-pro-artisans.appspot.com",
    messagingSenderId: "538260024191",
    appId: "1:538260024191:web:61551a6f2d92d3ccafc84a",
    measurementId: "G-VQ96T67BN6"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


export { db, auth, storage }

