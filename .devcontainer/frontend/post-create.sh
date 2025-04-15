#! /usr/bin/bash

cp .devcontainer/pre-commit .git/hooks/pre-commit
git config core.editor "nvim"

(cd frontend; npm install)
