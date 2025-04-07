#! /usr/bin/bash

cp docker-compose.yml.sample docker-compose.yml
sed -i "s/<host-username>/$USER/g" docker-compose.yml

docker compose build