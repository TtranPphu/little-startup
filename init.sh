#! /usr/bin/bash

sed -i "s/<host-username>/$USER/g" docker-compose.yml

docker compose build