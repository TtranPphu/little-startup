#! /usr/bin/bash

exe_aloud() { echo "\$ $@"; "$@"; }

print_help() {
  printf "Usage: ./ops.sh <command> [<environmen> [<service>]]\n"
  printf "  - commands: build, up | start, stop, down\n"
  printf "  - environments (omit: all):\n"
  printf "    + prod | production\n"
  printf "    + nvim | neovim <service>\n"
  printf "    + code | vscode <service>\n"
  printf "  - services:\n"
  printf "    + ex | example\n"
  printf "    + be | backend\n"
  printf "    + fe | frontend\n"
}

print_vscode() {
  printf "\n"
  printf "Because VS Code CLI for devcontainer is not refined, we cannot\n"
  printf "  launch you dirrectly into devcontainer.\n"
  printf "We just have built the containers and set-up the general\n"
  printf "  development environment for you.\n"
  printf "We will launch VS Code inside WSL for you, once you're there,\n"
  printf "  Hit [Ctrl + Shift + P]\n"
  printf "  Select \"Dev Containers: Reopen in Container\"\n"
  printf "  Then select the service you want to develop.\n"
  read -p "Press [Enter] to continue!"
}

case $2 in
  nvim | neovim | code | vscode)
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
    code=$?
    sed -i "s/$USER/<host-username>/g" docker-compose.yml
    if [ code -ne 0 ]; then
    fi
    case $2 in
      nvim | neovim)
        exe_aloud docker exec \
          --workdir /workspaces/little-startup \
          $CONTAINERS \
          sh .devcontainer/$CONTEXT/post-create.sh
        exe_aloud docker exec -it \
          --workdir /workspaces/little-startup \
          $CONTAINERS \
          nvim
        ;;
      code | vscode)
        exe_aloud docker exec \
          --workdir /workspaces/little-startup \
          $CONTAINERS \
          sh .devcontainer/$CONTEXT/post-create.sh
        print_vscode
        code .
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

