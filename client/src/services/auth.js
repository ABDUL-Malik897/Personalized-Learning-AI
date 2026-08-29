import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase";

const API_URL = "http://localhost:5000/api";

export const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;
    const idToken = await firebaseUser.getIdToken();
    const response = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idToken,
        }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(
            data.message || "Google authentication failed"
        );
    }
    return {
        firebaseUser,
        ...data,
    };
};

export const logoutUser = async () => {
    await signOut(auth);
};

export const observeAuthState = (callback) => {
    return onAuthStateChanged(auth, callback);
};