import json
import boto3
import h5py
import base64
import io
import re
import numpy as np
from PIL import Image
from keras.models import load_model
from keras.preprocessing import image

def lambda_handler(event, context):
    

    bucket_name = 'model-bucket-cloud-computing-project'
    object_key = 'wildfiremodel.h5'
    
    
    try:
        s3_client = boto3.client('s3')
        s3_client.download_file("model-bucket-cloud-computing-project", 'wildfiremodel.h5', "/tmp/model")
        
        with h5py.File('/tmp/model','r') as f:
            model = load_model(f)
            
            
        
        image_data_base64 = event['content']
        
        image_data = re.sub('^data:image/.+;base64,', '', image_data_base64)
    
        # Decode Base64 image data back into its binary form
        decoded_image = base64.b64decode(image_data)
        
        # Convert binary image data into an image object
        img = Image.open(io.BytesIO(decoded_image)) 

        # Preprocess the image
        processed_img = preprocess_image(img)

        # Perform prediction on the preprocessed image using the loaded model
        prediction_result = predict_image(model, processed_img)
        
        

        return {
            'statusCode': 200,
            'body': json.dumps(prediction_result)
        }
    except Exception as e:
        # Handle any errors
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        } 
 

def preprocess_image(img):
    # Resize the image to match the input size of your model
    img = img.resize((350, 350))

    # Convert image to array and normalize pixel values
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0  # Normalize pixel values between 0 and 1

    # Expand dimensions to match the input shape expected by the model
    img_array = np.expand_dims(img_array, axis=0)

    return img_array

def predict_image(model, processed_img):
    # Perform prediction using the model
    prediction = model.predict(processed_img)
    
    # Convert NumPy array to Python list
    prediction_list = prediction.tolist()
    
    # Calculate confidence
    confidence = prediction_list[0][0] * 100  # Convert probability to percentage
    
    # Determine wildfire or not wildfire based on threshold
    threshold = 0.5
    if prediction_list[0][0] >= threshold:
        label = "wildfire"
    else:
        label = "not wildfire"

    return {'predicted_label': label, 'confidence': f'{confidence:.2f}%'}
