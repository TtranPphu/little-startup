#! /usr/bin/bash

(cd example; . $HOME/.local/bin/env && uv sync; npm install)
