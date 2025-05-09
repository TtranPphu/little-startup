FROM node:22.15.0-alpine AS build

WORKDIR /example

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine as example

COPY --from=build /example/dist /usr/share/nginx/html
