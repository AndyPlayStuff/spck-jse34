import { auth, provider, db } from './firebase/firebase-config.js';
import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ADMIN_EMAIL = "admin@gmail.com";
const form = document.getElementById("login-form");
const googleLoginBtn = document.getElementById("google-login");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    let role = "user";

    if (docSnap.exists()) {
      role = docSnap.data().role;
    } else if (email === ADMIN_EMAIL) {
      role = "admin";
    }

    localStorage.setItem("uid", user.uid);
    localStorage.setItem("email", user.email);
    localStorage.setItem("username", user.displayName || "");
    localStorage.setItem("role", role);

    alert("Login Successfully!");
    window.location.href = "../index.html";
  } catch (error) {
    alert("error: " + error.message);
  }
});

if (googleLoginBtn) {
  googleLoginBtn.addEventListener("click", async () => {
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
      localStorage.setItem("username", user.displayName || "");
      localStorage.setItem("photoURL", user.photoURL || "");
      localStorage.setItem("role", role);

      alert(`Signed in as ${user.displayName}`);
      window.location.href = "../index.html";
    } catch (error) {
      alert("error: " + error.message);
    }
  });
}





