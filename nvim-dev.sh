#! /usr/bin/bash

case $1 in
  example)
    sh initialize.sh && docker compose up -d example-devcontainer --build && docker exec -it --workdir /workspaces/little-startup little-startup-example-devcontainer-1 nvim
    ;;
  frontend)
    sh initialize.sh && docker compose up -d frontend-devcontainer --build && docker exec -it --workdir /workspaces/little-startup little-startup-frontend-devcontainer-1 nvim
    ;;
  backend)
    sh initialize.sh && docker compose up -d backend-devcontainer --build && docker exec -it --workdir /workspaces/little-startup little-startup-backend-devcontainer-1 nvim
    ;;

esac
docker compose stop

