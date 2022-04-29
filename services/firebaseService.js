import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


//! Work on environment variable
const firebaseConfig = {
    apiKey: process.env.firebaseAPIKey,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default function (email, password) {
  console.log(process.env.firebaseAPIKey)
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
  })
  .catch((error) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
}
