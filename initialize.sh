#! /usr/bin/bash

sed -i "s/<host-username>/$USER/g" docker-compose.yml

cp .devcontainer/pre-commit .git/hooks/pre-commit
git config core.editor "nvim"

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
