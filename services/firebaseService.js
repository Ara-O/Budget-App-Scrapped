import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

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

export async function logUserIn(email, password) {
  let userData = new Promise((resolve) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      resolve(user)
    })
    .catch((error) => {
      alert(error.message)
    });
  })

  let userDataFound = await userData;

  return userDataFound
}

export async function userIsSignedIn(thisvalue) {
  let userState = new Promise((resolve) => {
    const auth = getAuth();
    let that = thisvalue;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        that.$store.commit("changeUserIDState", uid);
        resolve(true)
      } else {
        that.$router.push("/signup")
      }
    });
  })

  let val = await userState
  return val
}




export async function getUserData(thisvalue) {
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

export async function storeUserBudgetPlan(thisvalue, budgetplan) {
  console.log("budget plan", budgetplan)
  let that = thisvalue;
  let uid = that.$store.state.userID;
  
  let receiveBudgetPlan = new Promise(resolve => {
    const db = getDatabase();
    set(ref(db, 'users/' + uid + "/budgetPlans"), budgetplan)

    resolve(true)
  });

  let userBudget = await receiveBudgetPlan;

  return userBudget
}

export async function storeUserBudgetPlanExpense(thisvalue, expenses) {
  let that = thisvalue;
  let uid = that.$store.state.userID;
  
  let receiveExpense = new Promise(resolve => {
    const db = getDatabase();
    set(ref(db, 'users/' + uid + "/expensesToAllocate"), expenses)

    resolve(true)
  });

  let userBudget = await receiveExpense;

  return userBudget
}

export async function retrieveUserBudgetPlan(thisvalue) {
  let that = thisvalue

  //Promise that resolves when the data from the user has been retrieved
  let retrieveUserData = new Promise((resolve, reject) => {
    const db = getDatabase();
    const uid = that.$store.state.userID;
    const userData = ref(db, 'users/' + uid + '/budgetPlans');
    onValue(userData, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        resolve(data);
      } else {
        reject("There has been error/no data has been found")
      }
    });
  });

  let userData = await retrieveUserData

  return userData

}

export async function expensesToAllocate(thisvalue) {
  let that = thisvalue

  //Promise that resolves when the data from the user has been retrieved
  let retrieveUserData = new Promise((resolve, reject) => {
    const db = getDatabase();
    const uid = that.$store.state.userID;
    const userData = ref(db, 'users/' + uid + '/expensesToAllocate');
    onValue(userData, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        resolve(data);
      } else {
        reject("There has been error/no data has been found")
      }
    });
  });

  let userData = await retrieveUserData

  return userData

}