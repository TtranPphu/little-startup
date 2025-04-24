#! /usr/bin/bash

print_help() {
  printf "Usage: ./ops.sh <command> [<environmen> [<service>]]\n"
  printf "  - commands: build, up | start, stop, down\n"
  printf "  - environments (omit: all):\n"
  printf "    + dev | development <service>\n"
  printf "      . ex | example\n"
  printf "      . be | backend\n"
  printf "      . fe | frontend\n"
  printf "    + prod | production\n"
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
    printf "context: $CONTEXT\n"
    SERVICES="$CONTEXT-devcontainer"
    CONTAINERS="little-startup-$SERVICES-1"
    printf "services: $SERVICES\n"
    printf "containers: $CONTAINERS\n"
    ;;
  prod | production)
    SERVICES='student-fe tutor-fe faculty-fe'
    CONTAINERS='little-startup-student-fe-1 '`
              `'little-startup-tutor-fe-1 '`
              `'little-startup-faculty-fe-1'
    printf "services: $SERVICES\n"
    printf "containers: $CONTAINERS\n"
    ;;
  *)
    SERVICES=''
    CONTAINERS=''
    ;;
esac

case $1 in
  build)
    printf 'Building containers...\n'
    exe_aloud docker compose --progress plain build --parallel $SERVICES \
      &> compose-build.log
    ;;
  up | start)
    sh initialize.sh
    printf 'Building containers...\n'
    exe_aloud docker compose --progress plain build --parallel $SERVICES \
      &> compose-build.log && \
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
      prod | production)
        ;;
      *)
        for context in 'example' 'backend' 'frontend'; do
          service="$context-devcontainer"
          container="little-startup-$service-1"
          printf "Initiating $service...\n"
          exe_aloud docker exec \
            --workdir /workspaces/little-startup \
            $container \
            sh .devcontainer/$context/post-create.sh \
            &> "$service.log"
        done
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

