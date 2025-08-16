import { auth } from './firebase/firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out successfuly!");
    window.location.href = "../login.html";
  } catch (error) {
    alert("error when logout: " + error.message);
    console.error(error.code, error.message);
  }
});
