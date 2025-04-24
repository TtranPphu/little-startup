#! /usr/bin/bash

print_help() {
  printf "Usage: ./ops.sh <command> [<environmen>] [<service>]\n"
  printf "  - commands: build, up | start, stop, down\n"
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
  dev)
    ;;
  prod)
    ;;
  *)
    ;;
esac

case $1 in
  build)
    ;;
  up | start)
    ;;
  stop)
    ;;
  down)
    ;;
  *)
    print_help
    exit
    ;;
esac
