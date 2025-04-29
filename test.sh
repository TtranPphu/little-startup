sudo git clean -f -d -x -e ".db-*"

docker compose down
sh initialize.sh

printf 'Testing...\n'
docker compose build --parallel $SERVICES && \
docker compose up -d --remove-orphans $SERVICES && \
# for context in 'example' 'backend' 'frontend'; do
#   service="$context-devcontainer"
#   container="little-startup-$service-1"
#   printf "Initiating $service...\n"
#   docker exec \
#     --workdir /workspaces/little-startup \
#     $container \
#     sh -c ".devcontainer/$context/post-create.sh; exit \$?"
# done && \
if [ $? != 0 ]; then
  printf "Testing... Failed. You suck!\n"
else
  printf "Testing... Done. You're awesome!\n"
fi

sed -i "s/$USER/<host-username>/g" docker-compose.yml
