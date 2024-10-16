import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBSJA6wAYBuzshFfF6QOz6KCqH-K4QV8C4",
    authDomain: "wordle-43120.firebaseapp.com",
    projectId: "wordle-43120",
    storageBucket: "wordle-43120.appspot.com",
    messagingSenderId: "452295495178",
    appId: "1:452295495178:web:fcd497a26e9ca1d105d9f3"
};

const app = initializeApp(firebaseConfig);
export const FIRESTORE_DB=getFirestore(app);