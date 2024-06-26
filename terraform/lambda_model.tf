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

# Define the Lambda function resource
resource "aws_lambda_function" "lambda_prediction_model" {

  function_name = "lambda_prediction_model"
  image_uri     = "${aws_ecr_repository.lambda_model_repository.repository_url}:${local.image_version}"
  package_type  = "Image"
  memory_size   = 512
  timeout       = 600
  role          = aws_iam_role.lambda_model_role.arn


  environment {
    variables = {
      BUCKET_NAME = local.bucket_name
    }
  }
}
