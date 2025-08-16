    import { auth } from './firebase-config.js';
    import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "login.html";
      }
    });

    document.getElementById("logout").addEventListener("click", () => {
      signOut(auth).then(() => {
        window.location.href = "../html/login.html";
      });
    });
    import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      
      window.location.href = "../html/login.html";
    }
  });
  
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