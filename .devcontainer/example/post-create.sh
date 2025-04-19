#! /usr/bin/bash

sed -i "s/$HOST_USERNAME/<host-username>/g" docker-compose.yml

cp .devcontainer/pre-commit .git/hooks/pre-commit
git config core.editor "nvim"

(cd example; . $HOME/.local/bin/env && uv sync; npm install)
