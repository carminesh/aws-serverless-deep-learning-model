# aws-serverless-deep-learning-model


1. cd terraform
2. terraform apply -target=aws_ecr_repository.lambda_model_repository
3. cd .. && cd app
4. make docker/push (open Docker)
5. cd .. && cd terraform
6. terraform apply
   
-------


1. Una volta lanciata l'app, è necessario sostituire nel file frontend/wildfire-detector/.env
le variabili REACT_APP_USER_POOL_ID e REACT_APP_USER_POOL_APP_CLIENT_ID.

Per ottenere USER_POOL_APP_CLIENT_ID, lanciare il seugente comando nel terminale (loggato con aws):
    aws cognito-idp list-user-pool-clients --user-pool-id {POOL-ID} --max-results 3


2. Nel package.json sostituire il proxy con il L'URL dell'api gateway, della nuova eventuale infrastruttura
3. Caricare il wildifiremodel.h5 all'interno del bucket S3