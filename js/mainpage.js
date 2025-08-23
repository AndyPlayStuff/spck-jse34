import { db } from "../js/firebase/firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function loadArticles() {
  const snapshot = await getDocs(collection(db, "articles"));
  const container = document.getElementById("articles");
  container.innerHTML = ""; 

  snapshot.forEach(doc => {
    const data = doc.data();

    const articleEl = document.createElement("div");
    articleEl.classList.add("article");

    articleEl.innerHTML = `
      <h2>${data.title || "No title"}</h2>
      <p>${data.description || "No description"}</p>
      ${data.imageUrl ? `<img src="${data.imageUrl}" alt="${data.title}" />` : ""}
      <small><em>Tác giả: ${data.author || "N/A"}</em></small>
    `;

    container.appendChild(articleEl);
  });
}

loadArticles();