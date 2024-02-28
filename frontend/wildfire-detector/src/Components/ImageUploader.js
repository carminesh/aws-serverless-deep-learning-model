import React, { useState } from 'react';

const ImageUploader = () => {
  const [imageBase64, setImageBase64] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageFile(file);
        setImageBase64(reader.result);
      };
    }
  };

  const handleUpload = () => {
    // Here you can use the imageBase64 state for further processing
    console.log('Image Base64:', imageBase64);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {imageBase64 && <img src={imageBase64} alt="Uploaded" style={{ maxWidth: '300px', maxHeight: '300px' }} />}
      {imageFile && (
        <button onClick={handleUpload}>
          Upload Image
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
