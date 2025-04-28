FROM node:22.14.0-slim AS build

WORKDIR /example

COPY package*.json .
RUN npm install

COPY . .
RUN npm build

FROM node:22.14.0-slim as example
COPY --from=build dist dist
