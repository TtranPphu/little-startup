#! /usr/bin/bash

sh initialize.sh

case $1 in
  example | ex | eg)
    SERVICE='example'
    ;;
 frontend | FE | fe)
    SERVICE='frontend'
    ;;
  backend | BE | be)
    SERVICE='backend'
    ;;
  *)
    printf "Missing <service>, try:\n  - sh nvim-dev.sh example\n  - sh nvim-dev.sh backend\n  - sh nvim-dev.sh frontend\n"
    exit
    ;;
esac

docker compose up -d $SERVICE-devcontainer --build --remove-orphans && \
docker exec \
  --workdir /workspaces/little-startup \
  little-startup-$SERVICE-devcontainer-1 \
  sh .devcontainer/$SERVICE/post-create.sh && \
docker exec -it \
  --workdir /workspaces/little-startup \
  little-startup-$SERVICE-devcontainer-1 \
  nvim

docker compose stop

