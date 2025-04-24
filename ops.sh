#! /usr/bin/bash

print_help() {
  printf "Usage: ./ops.sh <command> [<environmen>] [<service>]\n"
  printf "  - commands: build, start, stop, down\n"
  printf "  - environments:\n"
  printf "    . dev | development\n"
  printf "    . prod | production\n"
  printf "  - services (for development environment):\n"
  printf "    . ex | example\n"
  printf "    . be | backend\n"
  printf "    . fe | frontend\n"
}

exe_aloud() { echo "\$ $@"; "$@"; }

case $2 in
  dev | development)
    case $3 in
      ex | example)
        CONTEXT='example'
        ;;
      be | backend)
        CONTEXT='backend'
        ;;
      fe | frontend)
        CONTEXT='frontend'
        ;;
      *)
        print_help
        exit
        ;;
    esac
    echo "context: $CONTEXT"
    SERVICES="$CONTEXT-devcontainer"
    CONTAINERS="little-startup-$SERVICES-1"
    echo "services: $SERVICES"
    echo "containers: $CONTAINERS"
    ;;
  prod | production)
    SERVICES='student-fe tutor-fe faculty-fe'
    CONTAINERS='little-startup-student-fe-1 little-startup-tutor-fe-1 little-startup-faculty-fe-1'
    echo "services: $SERVICES"
    echo "containers: $CONTAINERS"
    ;;
  *)
    SERVICES=''
    CONTAINERS=''
    ;;
esac

case $1 in
  build)
    exe_aloud docker compose build --parallel $SERVICES
    ;;
  start)
    sh initialize.sh
    exe_aloud docker compose --progress plain build --parallel $SERVICES > compose.log
    exe_aloud docker compose up -d --remove-orphans $SERVICES
    sed -i "s/$USER/<host-username>/g" docker-compose.yml
    case $2 in
      dev | development)
        exe_aloud docker exec \
          --workdir /workspaces/little-startup \
          $CONTAINERS \
          sh .devcontainer/$CONTEXT/post-create.sh
        exe_aloud docker exec -it \
          --workdir /workspaces/little-startup \
          $CONTAINERS \
          nvim
        ;;
      *)
        ;;
    esac
    ;;
  stop)
    exe_aloud docker compose stop $SERVICES
    ;;
  down)
    exe_aloud docker compose down $SERVICES
    ;;
  *)
    print_help
    exit
    ;;
esac

