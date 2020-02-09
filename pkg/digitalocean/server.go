package digitalocean

import (
	"context"

	"github.com/digitalocean/godo"
	"golang.org/x/oauth2"
)

type Server struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Status string `json:"status"`
	IP     string `json:"ip"`
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
	droplets, _, err := r.client.Droplets.ListByTag(ctx, "minecraft", &godo.ListOptions{})
	if err != nil {
		return nil, err
	}

	servers := make([]Server, len(droplets))
	for i, droplet := range droplets {
		ip, err := droplet.PublicIPv4()
		if err != nil {
			return nil, err
		}

		servers[i] = Server{
			ID:     droplet.ID,
			Name:   droplet.Name,
			Status: droplet.Status,
			IP:     ip,
		}
	}

	return servers, nil
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
