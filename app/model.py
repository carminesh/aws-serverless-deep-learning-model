import json
import boto3


def lambda_handler(event, context):
    
    response_message = 'Hello, World!!!'
      
    if 'name' in event:
        response_message = 'Hello, {}!'.format(event['name'])
    

    response = {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'message': response_message})
    }

    return response

    """ bucket_name = 'model-bucket-cloud-computing-project'
    object_key = 'wildfiremodel.h5'
    
    s3_client = boto3.client('s3')
 
    
    try:
        result = client_s3.download_file("model-bucket-cloud-computing-project",'wildfiremodel.h5', "/tmp/model.h5")
        model = load_model("/tmp/day/model.h5") 
        
        print(model)
        
        # Perform inference or other operations with the loaded model
        # Example: result = model.predict(input_data)
        # Replace the above line with code to use your loaded model
        result = "Model loaded successfully"

        return {
            'statusCode': 200,
            'body': json.dumps({'result': result})
        }
    except Exception as e:
        # Handle any errors
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        } """ 
 



    