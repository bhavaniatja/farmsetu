import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const app = firebase.initializeApp({
  apiKey: "AIzaSyCBC7EAQlyXLRAQHibCyfldHM-1yWfgpcM",
  authDomain: "signal-clone-fe8ce.firebaseapp.com",
  projectId: "signal-clone-fe8ce",
  storageBucket: "signal-clone-fe8ce.appspot.com",
  messagingSenderId: "570559533228",
  appId: "1:570559533228:web:84a3bb19541ae00047cf09"
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

