sh initialize.sh && docker compose up -d little-example-devcontainer --build && docker exec -it --workdir /workspaces/little-startup little-startup-little-example-devcontainer-1 nvim

