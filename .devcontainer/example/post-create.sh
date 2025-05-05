#! /usr/bin/bash

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
