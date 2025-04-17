#! /usr/bin/bash

sed -i "s/<host-username>/$USER/g" docker-compose.yml

# dummy nvim config
mkdir ~/.config/nvim 2>/dev/null | true
