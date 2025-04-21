#! /usr/bin/bash

case $2 in
  dev)
    case $3 in
      example)
        ;;
      backend)
        ;;
      frontend)
        ;;
      *)
        ;;
    ;;
  prod)
    SERVICES=

case $1 in
  start)
    docker compose build --parallel && \
    docker compose up -d --remove-orphans student-fe tutor-fe faculty-fe
    ;;
  stop)
    docker compose stop student-fe tutor-fe faculty-fe
    ;;
  *)
    printf "Try:\n"`
    `"  ./prod.sh start | run | up\n"`
    `"  ./prod.sh stop | down\n"
    ;;
esac

