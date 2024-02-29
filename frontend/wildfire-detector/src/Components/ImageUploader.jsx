import React, { useState, useRef, useEffect } from 'react';
import '../Style/ImageUploader.css';
import Button from '@mui/material/Button';
import PublishIcon from '@mui/icons-material/Publish';
import FolderIcon from '@mui/icons-material/Folder';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const ImageUploader = () => {
  const [imageBase64, setImageBase64] = useState('');
  const [imageFile, setImageFile] = useState(null);



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    console.log('Image Base64:', imageBase64);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = () => {
    setImageBase64('');
    setImageFile(null);
  };


  return (
    <div className="drop-container" id="dropcontainer" onDrop={handleDrop} 
    onDragOver={handleDragOver}>
      <div id="folder-container">
        <FolderIcon id="folder-icon" sx={{color: "#666666", width: '70px', height: '70px'}} />
      </div>
      <span class="drop-title">Drop your files here</span>

      <input type="file" id="file-input" name="file-input" onChange={handleImageChange} accept="image/*"/>
      <label id="file-input-label" for="file-input">Select a File</label>

      {imageBase64 && 
        <div className="uploaded-image">
          <img src={imageBase64} alt="Uploaded" />
          <HighlightOffIcon className="remove-button" onClick={handleRemoveImage} sx={{color: "#666666"}} />
        </div>
      }
      {imageFile && (
        <Button id="upload-btn" variant="outlined" startIcon={<PublishIcon />}>
          Click to upload
        </Button>
      )}

    
    </div>
  );
};

export default ImageUploader;

