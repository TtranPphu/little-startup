FROM node:22.14.0-alpine AS frontend

WORKDIR /frontend

COPY package*.json .
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

FROM frontend AS student-fe
FROM frontend AS tutor-fe
FROM frontend AS faculty-fe
