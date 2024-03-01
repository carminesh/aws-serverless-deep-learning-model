import React, { useState, useRef, useEffect } from 'react';
import '../Style/ImageUploader.css';
import LoadingButton from '@mui/lab/LoadingButton';
import PublishIcon from '@mui/icons-material/Publish';
import FolderIcon from '@mui/icons-material/Folder';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const ImageUploader = ({ accessToken, setPredictionResult }) => {
  const [imageBase64, setImageBase64] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);


  async function postData(imageBase) {      
    try {
          const response = await fetch('/predictWildfire', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
            'Origin': '*'
          },
          body: JSON.stringify({content: imageBase})
         });
         
        const data = await response.json();
        return data.body;
    } catch(error) {
        console.error('POST call failed:', error);
    }
  }


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

  const handleUpload = async () => {
    setLoading(true);
    const predictionResults = JSON.parse(await postData(imageBase64));
    console.log("🚀 ~ handleUpload ~ predictionResults:", predictionResults)
    setPredictionResult(predictionResults)
    setLoading(false);
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
    setPredictionResult(null);
  };


  return (
    <div className="drop-container" id="dropcontainer" onDrop={handleDrop} 
    onDragOver={handleDragOver}>
      <div id="folder-container">
        <FolderIcon id="folder-icon" sx={{color: "#666666", width: '70px', height: '70px'}} />
      </div>
      <span className="drop-title">Drop your files here</span>

      <input type="file" id="file-input" name="file-input" onChange={handleImageChange} accept="image/*"/>
      <label id="file-input-label" htmlFor="file-input">Select a File</label>

      {imageBase64 && 
        <div className="uploaded-image">
          <img src={imageBase64} alt="Uploaded" />
          <HighlightOffIcon className="remove-button" onClick={handleRemoveImage} sx={{color: "#666666"}} />
        </div>
      }
      {imageFile && (
        <LoadingButton 
            id="upload-btn" 
            loading={loading}
            loadingPosition="start" 
            variant="outlined" 
            startIcon={<PublishIcon />} 
            onClick={handleUpload}
        >
          Click to upload
        </LoadingButton>
      )}

    
    </div>
  );
};

export default ImageUploader;

