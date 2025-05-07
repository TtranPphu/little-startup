#! /usr/bin/bash

sh .devcontainer/post-create.sh

(
    cd example/python
    . $HOME/.local/bin/env && uv sync
    cd ../..
)
(
    cd example/react
    npm install
    cd ..
)
