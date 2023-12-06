
import { initializeApp } from 'firebase/app';
import { collection, getDoc, getDocs, getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyB2dAyKYQrWR9r4xkD22hpZ5eq3C0zAQAE",
    authDomain: "em-test-b0cb0.firebaseapp.com",
    projectId: "em-test-b0cb0",
    storageBucket: "em-test-b0cb0.appspot.com",
    messagingSenderId: "537722019494",
    appId: "1:537722019494:web:b0cba9937e4be6ccbf1e67",
    measurementId: "G-RLK8PKFM01"
};

const app = initializeApp(firebaseConfig);



export const db = getFirestore(app)