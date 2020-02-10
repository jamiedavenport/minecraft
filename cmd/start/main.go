package main

import (
	"context"
	"encoding/json"

	"github.com/spf13/viper"

	"github.com/jamiedavenport/minecraft/pkg/config"
	"github.com/jamiedavenport/minecraft/pkg/digitalocean"
	"github.com/jamiedavenport/minecraft/pkg/function"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

// Response is of type APIGatewayProxyResponse since we're leveraging the
// AWS Lambda Proxy Request functionality (default behavior)
//
// https://serverless.com/framework/docs/providers/aws/events/apigateway/#lambda-proxy-integration
type Request events.APIGatewayProxyRequest
type Response events.APIGatewayProxyResponse

type Body struct {
	ID int `json:"id"`
}

// Handler is our lambda handler invoked by the `lambda.Start` function call
func Handler(ctx context.Context, request Request) (Response, error) {
	config.Init()

	body := Body{}
	err := json.Unmarshal([]byte(request.Body), &body)
	if err != nil {
		return Response{StatusCode: 500}, err
	}

	doClient := digitalocean.New(viper.GetString("do-api-key"))
	err = doClient.Start(ctx, body.ID)
	if err != nil {
		return Response{StatusCode: 500}, err
	}

	resp := Response{
		StatusCode:      204,
		IsBase64Encoded: false,
		Headers:         function.CorsHeaders(),
	}

	return resp, nil
}

func main() {
	lambda.Start(Handler)
}
