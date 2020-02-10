package main

import (
	"context"
	"encoding/json"

	"github.com/spf13/viper"

	"github.com/jamiedavenport/minecraft/pkg/config"
	"github.com/jamiedavenport/minecraft/pkg/digitalocean"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Response events.APIGatewayProxyResponse

// Handler is our lambda handler invoked by the `lambda.Start` function call
func Handler(ctx context.Context) (Response, error) {
	config.Init()

	doClient := digitalocean.New(viper.GetString("do-api-key"))
	servers, err := doClient.List(ctx)
	if err != nil {
		return Response{StatusCode: 500}, err
	}

	body, err := json.Marshal(servers)
	if err != nil {
		return Response{StatusCode: 500}, err
	}

	resp := Response{
		StatusCode:      200,
		Body:            string(body),
		IsBase64Encoded: false,
		Headers: map[string]string{
			"Access-Control-Allow-Origin":      "*",
			"Access-Control-Allow-Credentials": "true",
		},
	}

	return resp, nil
}

func main() {
	lambda.Start(Handler)
}
