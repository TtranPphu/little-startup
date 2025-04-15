#! /usr/bin/bash
sh initialize.sh
case $1 in
  example | ex | eg)
    docker compose up -d example-devcontainer --build --remove-orphans && \
    docker exec -it \
      --workdir /workspaces/little-startup \
      little-startup-example-devcontainer-1 \
      sh .devcontainer/example/post-create.sh; nvim
    ;;
  frontend | FE | fe)
    docker compose up -d frontend-devcontainer --build --remove-orphans && \
    docker exec -it \
      --workdir /workspaces/little-startup \
      little-startup-frontend-devcontainer-1 \
      sh .devcontainer/frontend/post-create.sh; nvim
    ;;
  backend | BE | be)
    docker compose up -d backend-devcontainer --build --remove-orphans && \
    docker exec -it \
      --workdir /workspaces/little-startup \
      little-startup-backend-devcontainer-1 \
      sh .devcontainer/backend/post-create.sh; nvim
   ;;
esac
docker compose stop

