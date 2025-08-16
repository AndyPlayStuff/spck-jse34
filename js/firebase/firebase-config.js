import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAeVnxA37a7w5Ciz5Nmru7roJyJ-Pun_vo",
  authDomain: "spck-5a133.firebaseapp.com",
  projectId: "spck-5a133",
  storageBucket: "spck-5a133.appspot.com",
  messagingSenderId: "542587111002",
  appId: "1:542587111002:web:ea8ef624b1957a50997a63",
  measurementId: "G-64799SN7F2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

console.log("Firebase initialized:", app.name);


export { auth, db, provider };
