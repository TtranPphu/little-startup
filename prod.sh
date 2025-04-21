#! /usr/bin/bash

case $1 in
  start | run | up)
    docker compose build --parallel && \
    docker compose up -d --remove-orphans student-fe tutor-fe faculty-fe backend mongo
    ;;
  stop | down)
    docker compose down student-fe tutor-fe faculty-fe backend mongo
    ;;
  *)
    printf "Try:\n"`
    `"  ./prod.sh start | run | up\n"`
    `"  ./prod.sh stop | down\n"
    ;;
esac

