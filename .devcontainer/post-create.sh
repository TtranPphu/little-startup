#! /usr/bin/bash

cp .devcontainer/pre-commit .git/hooks/pre-commit
git config --local core.editor "nvim"
git config --local core.autocrlf false
