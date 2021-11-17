import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const app = firebase.initializeApp({
  apiKey: "AIzaSyBnfBcR77n4URrn2dv-vWnJAIiJwtQCX9M",
  authDomain: "ityme-4f997.firebaseapp.com",
  databaseURL: "https://ityme-4f997-default-rtdb.firebaseio.com",
  projectId: "ityme-4f997",
  storageBucket: "ityme-4f997.appspot.com",
  messagingSenderId: "207933413299",
  appId: "1:207933413299:web:1a2ddeb7cc96f810739dc6",
  measurementId: "G-5H798PNV5Z"
})

export const auth = app.auth()
export const firestore = app.firestore()
export default app
export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    // alert("You are signedin");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
export const createUserWithEmailAndPassword = async (email, password, name) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    // await createUserDocument(user, name);
    console.log(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
export const logout = () => {
  auth.signOut();
};

