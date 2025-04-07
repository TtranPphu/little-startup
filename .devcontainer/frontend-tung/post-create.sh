#! /usr/bin/bash

cp .devcontainer/pre-commit .git/hooks/pre-commit

(cd frontend-tung; npm install)
