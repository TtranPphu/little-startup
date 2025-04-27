#! /usr/bin/bash

sed -i "s/$HOST_USERNAME/<host-username>/g" docker-compose.yml

cp .devcontainer/pre-commit .git/hooks/pre-commit
git config core.editor "nvim"

(cd frontend/student-fe; npm install --legacy-peer-deps)
(cd frontend/tutor-fe; npm install --legacy-peer-deps)
(cd frontend/faculty-fe; npm install --legacy-peer-deps)

