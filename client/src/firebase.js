// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "real-estate-98305.firebaseapp.com",
	projectId: "real-estate-98305",
	storageBucket: "real-estate-98305.appspot.com",
	messagingSenderId: "316810386586",
	appId: "1:316810386586:web:327d3e773111f832e51323",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
