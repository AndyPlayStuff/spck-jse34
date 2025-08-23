import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("article-form");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const content = document.getElementById("content").value;
  const imageUrl = document.getElementById("imageUrl").value;

  try {
    await addDoc(collection(db, "articles"), {
      title,
      author,
      content,
      imageUrl: imageUrl || null,
      createdAt: serverTimestamp()
    });
    status.textContent = "✅ Thêm bài báo thành công!";
    form.reset();
  } catch (error) {
    console.error("Lỗi khi thêm bài báo:", error);
    status.textContent = "❌ Có lỗi xảy ra khi thêm bài báo.";
  }
});