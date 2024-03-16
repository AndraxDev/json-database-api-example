#!/usr/bin/bash

# Creating virtual network
docker network create papi

# Build docker image
echo "Building docker image delivery-app:latest..."
docker build -t delivery-app:latest .

# Run docker container
echo "Running docker container delivery-app..."
docker run -d -it --network papi --rm -p 3000:3000 delivery-app
