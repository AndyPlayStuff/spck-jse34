
  import { v2 as cloudinary } from 'cloudinary';

(async function() {

    cloudinary.config({ 
        cloud_name: 'dobdqepaa', 
        api_key: '851898251656195', 
        api_secret: '<your_api_secret>' 
    });

     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);

    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();

async function loadArticles() {
  const snapshot = await getDocs(collection(db, "articles"));
  const container = document.getElementById("articles");
  container.innerHTML = ""; 

  snapshot.forEach(doc => {
    const data = doc.data();

    
    const articleEl = document.createElement("div");
    articleEl.classList.add("article");

    articleEl.innerHTML = `
      <h3>${data.title || "No title"}</h3>
      <p>${data.description || "No description"}</p>
      <p><strong>Price:</strong> ${data.price || "N/A"} VND</p>
    `;

    container.appendChild(articleEl);
  });
}

loadArticles();