#!/usr/bin/bash

# Uninstall docker image
echo "Stopping docker..."
docker stop $(docker ps -a -q --filter "ancestor=delivery-app:latest")
echo "Docker has been stopped."
