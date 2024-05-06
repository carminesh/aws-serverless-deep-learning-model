# Serverless Wildfire Convolutional Neural Network Prediction Model on AWS Deployed with Terraform

## Overview
The Wildfire Prediction System is a cloud-based application designed to predict wildfires from satellite images using a custom Convolutional Neural Network (CNN). Leveraging AWS serverless infrastructure through the use of Terraform and modern web technologies, the system provides users with an intuitive interface for uploading images, triggering predictions, and viewing results in real-time.

## Features
- User authentication using AWS Cognito for secure access to the system.
- Image upload functionality via drag-and-drop or file selector.
- Seamless integration with AWS Lambda for prediction execution.
- Dynamic display of prediction results for easy interpretation.
- Built with React.js and TypeScript for a robust frontend experience.

## Architecture
The system architecture comprises various AWS services, including:
- AWS Lambda for serverless compute.
- AWS S3 for storing the CNN Model.
- AWS ECR for storing and managing the Docker image of the Lambda function.
- AWS Cognito for user authentication and access control.

The overall infrastructure is defined using Terraform, enabling Infrastructure as Code (IaC) practices for reproducible and scalable deployments.



## Getting Started
To get started with the Wildfire Prediction System, follow these steps:

1. Clone the repository to your local machine:
   ```
   git clone <repository-url>
   ```

2. Install dependencies:
   ```
   cd wildfire-prediction-system
   npm install
   ```

3. Set up AWS credentials and configure the necessary AWS services (Lambda, S3, ECR, Cognito) according to the provided documentation.

4. Start the development server:
   ```
   npm start
   ```

5. Access the application in your browser at `http://localhost:3000`.


## Future Work
While the current version of the Wildfire Prediction System is functional, there are several areas for future improvement:
- Enhance the prediction model for higher accuracy and reliability.
- Integrate real-time monitoring capabilities using live satellite imagery and sensor data.
- Foster community engagement through interactive features and educational resources.
- Optimize scalability, resilience, and cost-efficiency of the AWS infrastructure.



1. cd terraform
2. terraform apply -target=aws_ecr_repository.lambda_model_repository
3. cd .. && cd app
4. make docker/push
5. cd .. && cd terraform
6. terraform apply
   
