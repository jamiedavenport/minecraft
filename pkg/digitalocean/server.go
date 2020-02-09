package digitalocean

import (
	"context"

	"github.com/digitalocean/godo"
	"golang.org/x/oauth2"
)

type Server struct {
	ID   int
	Name string
}

type repo struct {
	client *godo.Client
}

func (r *repo) Start(ctx context.Context, id int) error {
	_, _, err := r.client.DropletActions.PowerOn(ctx, id)
	if err != nil {
		return err
	}

	return nil
}

func (r *repo) List(ctx context.Context) ([]Server, error) {
	return nil, nil
}

func (r *repo) Stop(ctx context.Context, id int) error {
	_, _, err := r.client.DropletActions.PowerOff(ctx, id)
	if err != nil {
		return err
	}

	return nil
}

func New(token string) *repo {
	tokenSource := &TokenSource{
		AccessToken: token,
	}

	oauthClient := oauth2.NewClient(context.Background(), tokenSource)
	client := godo.NewClient(oauthClient)

	return &repo{client: client}
}
