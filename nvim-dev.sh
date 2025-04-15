#! /usr/bin/bash

sh initialize.sh

case $1 in
  example | ex | eg)
    docker compose up -d example-devcontainer --build --remove-orphans && \
    docker exec \
      --workdir /workspaces/little-startup \
      little-startup-example-devcontainer-1 \
      sh .devcontainer/example/post-create.sh && \
    docker exec -it \
      --workdir /workspaces/little-startup \
      little-startup-example-devcontainer-1 \
      nvim
    ;;
  frontend | FE | fe)
    docker compose up -d frontend-devcontainer --build --remove-orphans && \
    docker exec \
      --workdir /workspaces/little-startup \
      little-startup-frontend-devcontainer-1 \
      sh .devcontainer/frontend/post-create.sh && \
    docker exec -it \
      --workdir /workspaces/little-startup \
      little-startup-frontend-devcontainer-1 \
      nvim
    ;;
  backend | BE | be)
    docker compose up -d backend-devcontainer --build --remove-orphans && \
    docker exec \
      --workdir /workspaces/little-startup \
      little-startup-backend-devcontainer-1 \
      sh .devcontainer/backend/post-create.sh && \
    docker exec -it \
      --workdir /workspaces/little-startup \
      little-startup-backend-devcontainer-1 \
      nvim
    ;;
  *)
    printf "Missing <service>, try:\n  - sh nvim-dev.sh example\n  - sh nvim-dev.sh backend\n  - sh nvim-dev.sh frontend\n"
    exit
    ;;
esac

docker compose stop

