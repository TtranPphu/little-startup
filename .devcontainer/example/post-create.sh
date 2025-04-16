#! /usr/bin/bash

cp .devcontainer/pre-commit .git/hooks/pre-commit
git config core.editor "nvim"

(cd little-example; uv sync; npm install)
