#! /usr/bin/bash

print_help() {
  printf "Usage: ./ops.sh <command> <environment> [<service>]\n"
  printf "  - commands: build, up, start, stop, down\n"
  printf "  - environments:\n"
  printf "    . dev | development\n"
  printf "    . prod | production\n"
  printf "    . all\n"
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
  all)
    SERVICES=''
    CONTAINERS=''
    ;;
  *)
    print_help
    exit
    ;;
esac

case $1 in
  build)
    exe_aloud docker compose build --parallel $SERVICES
    ;;
  up)
    exe_aloud sh initialize.sh
    exe_aloud docker compose up -d --build --remove-orphans $SERVICES
    exe_aloud sed -i "s/$USER/<host-username>/g" docker-compose.yml
    ;;
  start)
    if [ $2 == 'dev' ] || [ $2 == 'developement' ]; then
      exe_aloud docker exec \
        --workdir /workspaces/little-startup \
        $CONTAINERS \
        sh .devcontainer/$CONTEXT/post-create.sh
      exe_aloud docker exec -it \
        --workdir /workspaces/little-startup \
        $CONTAINERS \
        nvim
    else
      exe_aloud docker compose start $SERVICES
    fi
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

