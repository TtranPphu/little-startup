#! /usr/bin/bash

cp .devcontainer/pre-commit .git/hooks/pre-commit
git config core.editor "nvim"

(cd frontend/student-fe; npm install --force)
(cd frontend/tutor-fe; npm install --force)
(cd frontend/faculty-fe; npm install --force)

