import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

//! Work on environment variable
const firebaseConfig = {
  apiKey: process.env.firebaseAPIKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export function registerUser(username, email, password, thisvalue) {
  let that = thisvalue;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const uid = user.uid;

      //Storing the userid in vuex and storing the users data in firebase
      that.$store.commit("changeUserIDState", uid)
      const db = getDatabase();
      set(ref(db, 'users/' + uid), {
        username,
        email,
        userGoals: that.$store.state.userGoals
      })

      that.$store.commit("changeSignedInState");
      that.$router.push("/");
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(error)
    });
}

export function userIsSignedIn(thisvalue) {
  const auth = getAuth();
  let that = thisvalue;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      that.$store.commit("changeUserIDState", uid);
      that.getData();
    } else {
      that.$router.push("/signup")
    }
  });
}


export async function getUserData(thisvalue){
  let that = thisvalue

  //Promise that resolves when the data from the user has been retrieved
  let retrieveUserData = new Promise(resolve => {
    const db = getDatabase();
    const uid = that.$store.state.userID;
    const userData = ref(db, 'users/' + uid);
    onValue(userData, (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    });
  });  

  //this waits for the promise to resolve, then stores the promise in userData
  let userData = await retrieveUserData;

  return userData;
}