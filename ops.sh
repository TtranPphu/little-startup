#! /usr/bin/bash

if [ -z "$USER" ]; then
  printf "You should not run this script inside a devcontainer! Bye bye!\n"
  exit
fi

exe_aloud() {
  echo "\$ $@"
  "$@"
}

print_help() {
  printf "Usage: ./ops.sh <command> [<environment> [<service>]]\n"
  printf "  - commands: build, up | start, stop, down, clean, rebuild | test\n"
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

initialize() {
  sed -i "s/<host-username>/$USER/g" docker-compose.yml

  cp .devcontainer/pre-commit .git/hooks/pre-commit
  git config --local core.editor "nvim"

  # dummy nvim config
  mkdir ~/.config/nvim 2>/dev/null | true
  mkdir ~/.local/share/nvim 2>/dev/null | true
  mkdir ~/.local/state/nvim 2>/dev/null | true

  # .env for backend
  if [ ! -f .devcontainer/backend/.env ]; then
    if [ -f ~/.little-startup/.env ]; then
      cp ~/.little-startup/.env .devcontainer/backend/.env
    else
      cp .devcontainer/backend/.env.default .devcontainer/backend/.env
    fi
  fi
}

deinitialize() {
  sed -i "s/$USER/<host-username>/g" docker-compose.yml
}

build_containers() {
  initialize
  printf 'Building containers...\n'
  exe_aloud docker compose --progress plain build --parallel $SERVICES \
    &> .logs/compose-build.log &&
    exe_aloud docker compose up -d --remove-orphans $SERVICES \
      &>> .logs/compose-build.log
  if [ $? != 0 ]; then
    deinitialize
    printf "Building containers failed!\n"
    exe_aloud nvim .logs/compose-build.log
    exit
  fi
  deinitialize
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
    &>".logs/$service.log"
  if [ $? != 0 ]; then
    printf "Initiating $service failed! For more info:\n"
    printf "  nvim .logs/$service.log\n"
  else
    printf "Initiating $service done!\n"
  fi
}

clean() {
  printf "Bringing down containers...\n"
  docker compose down &>/dev/null | true
  sudo git clean -f -d -x -e ".db-*"
}

rebuild() {
  clean
  initialize

  printf 'Testing...\n'
  docker compose build --parallel $SERVICES &&
    docker compose up -d --remove-orphans $SERVICES &&
    if [ $? != 0 ]; then
      printf "Testing... Failed. You suck!\n"
    else
      printf "Testing... Done. You're awesome!\n"
    fi

  deinitialize
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
  CONTAINERS='little-startup-student-fe-1 '$(
  )'little-startup-tutor-fe-1 '$(
  )'little-startup-faculty-fe-1'
  printf "services: $SERVICES\n"
  printf "containers: $CONTAINERS\n"
  ;;
*)
  SERVICES=''
  CONTAINERS=''
  ;;
esac

case $1 in
clean)
  clean
  ;;
rebuild | test)
  rebuild
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
  prod | production) ;;
  shortlist)
    echo nvim neovim code vscode prod production
    exit
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
shortlist)
  echo build up start stop down clean rebuild test
  exit
  ;;
*)
  print_help
  exit
  ;;
esac
