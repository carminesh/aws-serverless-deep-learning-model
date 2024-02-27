# aws-serverless-deep-learning-model


1. cd terraform
2. terraform apply -target=aws_ecr_repository.lambda_model_repository
3. cd .. && cd app
4. make docker/push
5. cd .. && cd terraform
6. terraform apply
   