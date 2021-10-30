import { createContext, useState } from "react";

export const ImageContext = createContext();

export default ({ children }) => {
  const [uploadUrl, setUploadUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadImage = (image) => {
    setUploading(true);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "upload_image");
    data.append("cloud_name", "coolbonn");
    fetch("https://api.cloudinary.com/v1_1/coolbonn/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUploading(false);
        setUploadUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ImageContext.Provider value={{ uploading, uploadUrl, uploadImage }}>
      {children}
    </ImageContext.Provider>
  );
};
