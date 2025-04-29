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

build_containers() {
  sh devops/initialize.sh
  printf 'Building containers...\n'
  exe_aloud docker compose --progress plain build --parallel $SERVICES \
    &> compose-build.log && \
  exe_aloud docker compose up -d --remove-orphans $SERVICES \
    &>> compose-build.log
  if [ $? != 0 ]; then
    sed -i "s/$USER/<host-username>/g" docker-compose.yml
    printf "Building containers failed!\n"
    exe_aloud nvim compose-build.log
    exit
  fi
  sed -i "s/$USER/<host-username>/g" docker-compose.yml
  printf "Building containers done!\n"
}

init_container() {
  context="$1"
  service="$context-devcontainer"
  container="little-startup-$service-1"
  printf "Initiating $service...\n"
  exe_aloud docker exec \
    --workdir /workspaces/little-startup \
    $container \
    sh -c ".devcontainer/$context/post-create.sh; exit \$?" \
    &> "$service.log"
  if [ $? != 0 ]; then
    printf "Initiating $service failed! For more info:\n"
    printf "  nvim $service.log\n"
  else
    printf "Initiating $service done!\n"
  fi
}

clean_test() {
  sudo git clean -f -d -x -e ".db-*"

  docker compose down
  sh initialize.sh

  printf 'Testing...\n'
  docker compose build --parallel $SERVICES && \
  docker compose up -d --remove-orphans $SERVICES && \
  if [ $? != 0 ]; then
    printf "Testing... Failed. You suck!\n"
  else
    printf "Testing... Done. You're awesome!\n"
  fi

  sed -i "s/$USER/<host-username>/g" docker-compose.yml
}

case $1 in
  test)
    clean_test
    ;;
  build)
    build_containers
    ;;
  up | start)
    build_containers
    case $2 in
      nvim | neovim)
        init_container $CONTEXT
        exe_aloud docker exec -it \
          --workdir /workspaces/little-startup \
          $CONTAINERS \
          nvim
        ;;
      code | vscode)
        init_container $CONTEXT
        print_vscode
        code .
        ;;
      prod | production)
        ;;
      *)
        for context in 'example' 'backend' 'frontend'; do
          init_container $context &
        done
        wait
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
