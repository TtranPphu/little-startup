#! /usr/bin/bash

cp .devcontainer/pre-commit .git/hooks/pre-commit

(cd backend; mvn install; mvn spring-boot:run)
