# provide role with no access policy initially
resource "aws_iam_role" "lambda_model_role" {
  name = "my-lambda-model-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "lambda_model_policy" {
  name = "my-lambda-model-policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::${local.bucket_name}/*"
    }
  ]
}
EOF
}



resource "aws_iam_role_policy_attachment" "lambda_model_policy_attachement" {
  role       = aws_iam_role.lambda_model_role.name
  policy_arn = aws_iam_policy.lambda_model_policy.arn
}

data "archive_file" "zip_the_python_code" {
  type        = "zip"
  source_dir  = "../app/"
  output_path = "../app/lambda-prediction-model.zip"
}

# Define the Lambda function resource
resource "aws_lambda_function" "my_lambda_function" {
  function_name = "my-lambda-function"                 # Name for the Lambda function
  filename      = "../app/lambda-prediction-model.zip" # Path to the Lambda deployment package
  handler       = "model.lambda_handler"               # The name of the function handler
  runtime       = "python3.8"                          # Runtime  of the lambda function
  role          = aws_iam_role.lambda_model_role.arn


  environment {
    variables = {
      BUCKET_NAME = local.bucket_name
    }
  }
}
