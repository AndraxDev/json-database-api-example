#!/usr/bin/bash

# Uninstall docker image
echo "Stopping docker..."
docker stop $(docker ps -a -q --filter "ancestor=delivery-app:latest")
echo "Docker has been stopped."
echo "Uninstalling docker image delivery-app:latest..."
docker rmi delivery-app:latest
echo "Docker image delivery-app:latest has been uninstalled."
echo "Uninstalling virtual network papi..."
docker network rm papi
echo "Virtual network papi has been uninstalled."
