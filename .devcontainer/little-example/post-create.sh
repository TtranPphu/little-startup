#! /usr/bin/bash

cp .devcontainer/pre-commit .git/hooks/pre-commit

(cd little-example; uv sync; npm install)
