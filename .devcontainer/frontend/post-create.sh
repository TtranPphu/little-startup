#! /usr/bin/bash

sh .devcontainer/post-create.sh

(
    cd frontend/student-fe || return
    npm install --legacy-peer-deps
)
(
    cd frontend/tutor-fe || return
    npm install --legacy-peer-deps
)
(
    cd frontend/faculty-fe || return
    npm install --legacy-peer-deps
)
