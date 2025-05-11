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
  printf "  - commands: up | start, stop, down, build | prebuild, rebuild | test, clean, init\n"
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
  if [ "$TERM_PROGRAM" != "vscode" ]; then
    printf "We will launch VS Code inside WSL for you, once you're there,\n"
    printf "  Hit [Ctrl + Shift + P]\n"
    printf "  Select \"Dev Containers: Reopen in Container\"\n"
    printf "  Then select '$CONTEXT'.\n"
    read -p "Press [Enter] to continue or [Ctrl + C] to start later... "
  else
    printf "Look like you're already in VS Code,\n"
    printf "  Hit [Ctrl + Shift + P]\n"
    printf "  Select \"Dev Containers: Reopen in Container\"\n"
    printf "  Then select '$CONTEXT'.\n"
    exit
  fi
}

initialize() {
  cp .devcontainer/pre-commit .git/hooks/pre-commit
  git config --local core.autocrlf false
  if [ command -v nvim ] &>/dev/null; then
    git config --local core.editor "nvim"
  elif [ command -v vim ] &>/dev/null; then
    git config --local core.editor "vim"
  fi

  # .env for backend
  if [ ! -f backend/.env ]; then
    if [ -f ~/.little-startup/.env ]; then
      cp ~/.little-startup/.env backend/.env
    else
      cp backend/.env.default backend/.env
    fi
  fi
}

build_containers() {
  initialize
  printf 'Building containers...\n'
  exe_aloud docker compose --progress plain build --parallel $SERVICES \
    &>.logs/compose-build.log &&
    exe_aloud docker compose up -d --remove-orphans $SERVICES \
      &>>.logs/compose-build.log
  if [ $? != 0 ]; then
    printf "Building containers failed!\n"
    exe_aloud nvim .logs/compose-build.log
    exit
  fi
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
  sudo true
  printf "Bringing down containers...\n"
  docker compose down &>.logs/compose-down.log | true
  sudo git clean -f -d -x -e ".db-*" -e ".logs/*"
}

rebuild() {
  clean
  initialize

  printf 'Testing...\n'
  docker compose build --parallel $SERVICES &&
    docker compose up -d --remove-orphans $SERVICES &&
    if [ $? != 0 ]; then
      printf "Testing... Failed. You suck!\n"
      exit 1
    else
      printf "Testing... Done. You're awesome!\n"
      exit 0
    fi
}

if [ $1 == 'shortlist' ]; then
  echo up start stop down build prebuild rebuild test clean init
  exit
fi

if [ $2 == 'shortlist' ]; then
  echo nvim neovim code vscode prod production
  exit
fi

if [ $3 == 'shortlist' ]; then
  echo example backend frontend
  exit
fi

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
  *)
    initialize
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
build | prebuild)
  build_containers
  ;;
rebuild | test)
  rebuild
  ;;
clean)
  clean
  ;;
init)
  initialize
  ;;
*)
  print_help
  exit
  ;;
esac
