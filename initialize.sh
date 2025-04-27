#! /usr/bin/bash

sed -i "s/<host-username>/$USER/g" docker-compose.yml

# dummy nvim config
mkdir ~/.config/nvim 2>/dev/null | true
mkdir ~/.local/share/nvim 2>/dev/null | true
mkdir ~/.local/state/nvim 2>/dev/null | true

# .env for backend
if [ ! -f .devcontainer/backend/.env ]; then
  echo "Not found"
  if [ -f ~/.little-startup/.env ]; then
    echo "Env found"
    cp ~/.little-startup/.env .devcontainer/backend/.env
  else
    echo "Default"
    cp .devcontainer/backend/.env.example .devcontainer/backend/.env
  fi
fi
