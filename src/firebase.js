import firebase from 'firebase/app';
import analytics from 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCGpWy13bQaZAZxwDbmHnz0zxKR-dsOpEQ",
    authDomain: "tilly-e-honest-pro-artisans.firebaseapp.com",
    projectId: "tilly-e-honest-pro-artisans",
    storageBucket: "tilly-e-honest-pro-artisans.appspot.com",
    messagingSenderId: "538260024191",
    appId: "1:538260024191:web:61551a6f2d92d3ccafc84a",
    measurementId: "G-VQ96T67BN6"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
analytics.getAnalytics(app);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export default firebase;
