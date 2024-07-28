import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updatePassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";

export const RegisterUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const LoginUserWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const LogoutUser = () => {
    return auth.signOut();
}

export const ChangePassword = (password) => {
    return updatePassword(auth.currentUser, password);
}

export const SendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
}

export const SendPasswordResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
}