import { auth, provider, db } from './firebase/firebase-config.js';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ADMIN_EMAIL = "admin@gmail.com"; 
const form = document.getElementById("register-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("register-email").value;
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: username });

    const role = user.email === ADMIN_EMAIL ? "admin" : "user";

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      username: username,
      role: role,
      createdAt: serverTimestamp()
    });

    localStorage.setItem("uid", user.uid);
    localStorage.setItem("email", user.email);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);

    alert("Register successfully!");
    window.location.href = "../index.html"; 
  } catch (error) {
    alert("Error: " + error.message);
    console.error(error.code, error.message);
  }
});

const googleRegisterBtn = document.getElementById("google-register");

googleRegisterBtn.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    let role = "user";
    if (!docSnap.exists()) {
      role = user.email === ADMIN_EMAIL ? "admin" : "user";
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        username: user.displayName,
        photoURL: user.photoURL,
        role: role,
        createdAt: serverTimestamp()
      });
    } else {
      role = docSnap.data().role;
    }

    localStorage.setItem("uid", user.uid);
    localStorage.setItem("email", user.email);
    localStorage.setItem("username", user.displayName);
    localStorage.setItem("photoURL", user.photoURL || "");
    localStorage.setItem("role", role);

    alert(`Registered as ${user.displayName}`);
    window.location.href = "../index.html";
  } catch (error) {
    alert("Google Sign-In Error: " + error.message);
    console.error(error.code, error.message);
  }
});
