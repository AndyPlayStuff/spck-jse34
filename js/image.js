async function uploadToCloudinary(file) {
    try {

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "gaming"); 

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/andy/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.secure_url) {
        return result.secure_url;
        console.log(result.secure_url);
      } else {
        throw new Error(
          `Upload thất bại: ${result.error?.message || "Không rõ lỗi"}`
        );
      }
    } catch (error) {
        throw error;
    }
}
