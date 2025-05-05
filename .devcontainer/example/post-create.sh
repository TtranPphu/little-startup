#! /usr/bin/bash

(
    cd example/python
    . $HOME/.local/bin/env && uv sync
    cd ../..
)
(
    cd example
    npm install
    cd ..
)
