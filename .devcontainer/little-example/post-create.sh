#! /usr/bin/bash

cp .devcontainer/little-example/pre-commit .git/hooks/pre-commit

(cd little-example; uv sync; npm install)
