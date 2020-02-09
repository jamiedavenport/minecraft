#!/bin/bash

DATA_DIR="/root/minecraft"

mkdir -p ${DATA_DIR}

docker run -di \
  --name "minecraft" \
  --volume "${DATA_DIR}:/data" \
  -p 25565:25565 \
  -e EULA=TRUE \
  itzg/minecraft-server
  