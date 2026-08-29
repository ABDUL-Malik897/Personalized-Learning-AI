import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC-KtKHAx90gxTPNlKC4v4sq1YK1dturZM",
    authDomain: "personalized-learning-ai-eb970.firebaseapp.com",
    projectId: "personalized-learning-ai-eb970",
    storageBucket: "personalized-learning-ai-eb970.firebasestorage.app",
    messagingSenderId: "119431100794",
    appId: "1:119431100794:web:ca8badb0c6df1f0c3b3ec3",
    measurementId: "G-D4HR7W2FZ7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;