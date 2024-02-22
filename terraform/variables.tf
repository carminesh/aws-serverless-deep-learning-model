
# constant settings
locals {
  image_name    = "lambda-prediction-model"
  image_version = "latest"

  bucket_name = "model-bucket-cloud-computing-project"

  lambda_function_name = "lambda-model-prediction-function"

  api_name = "prediction-model-api"
  api_path = "predict"
}
