#! /usr/bin/bash

sh .devcontainer/post-create.sh

(cd frontend/student-fe; npm install --legacy-peer-deps)
(cd frontend/tutor-fe; npm install --legacy-peer-deps)
(cd frontend/faculty-fe; npm install --legacy-peer-deps)
