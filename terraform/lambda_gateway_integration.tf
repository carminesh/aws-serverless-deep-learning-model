resource "aws_apigatewayv2_integration" "lambda_model" {
  api_id = aws_apigatewayv2_api.main.id

  integration_uri    = aws_lambda_function.lambda-prediction-model.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}


resource "aws_apigatewayv2_route" "post_image" {
  api_id = aws_apigatewayv2_api.main.id

  route_key = "POST /predict"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_model.id}"
}


resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda-prediction-model.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.main.execution_arn}/*/*"
}

output "predict_base_url" {
  value = aws_apigatewayv2_stage.dev.invoke_url
}

