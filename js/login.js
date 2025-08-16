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
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login Successfully!");
    window.location.href = "index.html";
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

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          username: user.displayName,
          photoURL: user.photoURL,
          role: user.email === ADMIN_EMAIL ? "admin" : "user",
          createdAt: serverTimestamp()
        });
      }

      alert(`Signed in as ${user.displayName}`);
      window.location.href = "index.html";
    } catch (error) {
      alert("error: " + error.message);
    }
  });
}




