#! /usr/bin/bash

sh .devcontainer/post-create.sh

(
    cd example/python || return
    # shellcheck source=/home/little/.local/bin/env
    . "$HOME/.local/bin/env" && uv sync
)
(
    cd example/react || return
    npm install
)
