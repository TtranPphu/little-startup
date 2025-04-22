#! /usr/bin/bash

print_help() {
  printf "Usage: ./ops.sh <command> [<environment>] [<service>]\n"
  printf "  - commands: up, start, stop, down\n"
  printf "  - environments (if cmd != down): dev | development, prod | production\n"
  printf "  - services (if env == dev): ex | example, be | backend, fe | frontend\n"
}

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
    SERVICES="$CONTEXT-devcontainer"
    CONTAINERS="little-startup-$SERVICES-1"
    ;;
  prod | production)
    SERVICES='student-fe tutor-fe faculty-fe'
    CONTAINERS='little-startup-student-fe-1 little-startup-tutor-fe-1 little-startup-faculty-fe-1'
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
  up)
    sh initialize.sh
    docker compose build --parallel && \
    docker compose up -d --remove-orphans $SERVICES
    sed -i "s/$USER/<host-username>/g" docker-compose.yml
    ;;
  start)
    if [ $2 == 'dev' ] || [ $2 == 'developement' ]; then
      docker exec \
        --workdir /workspaces/little-startup \
        $CONTAINERS \
        sh .devcontainer/$CONTEXT/post-create.sh
      docker exec -it \
        --workdir /workspaces/little-startup \
        $CONTAINERS \
        nvim
    else
      docker compose start $SERVICES
    fi
    ;;
  stop)
    docker compose stop $SERVICES
    ;;
  down)
    docker compose down $SERVICES
    ;;
  *)
    print_help
    exit
    ;;
esac

