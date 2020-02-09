.PHONY: build clean deploy

build:
	env GOOS=linux go build -ldflags="-s -w" -o bin/start cmd/start/main.go
	env GOOS=linux go build -ldflags="-s -w" -o bin/stop cmd/stop/main.go
	env GOOS=linux go build -ldflags="-s -w" -o bin/list cmd/list/main.go

clean:
	rm -rf ./bin

deploy: clean build
	sls deploy --verbose
