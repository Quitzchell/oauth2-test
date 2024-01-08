# Stage 1: Base image for installing dependencies
FROM node:20.10.0-alpine3.18 AS base

ENV NODE_ENV=development

WORKDIR /usr/src

COPY package*.json .

RUN npm install

# Stage 2: Development stage
FROM base as dev

WORKDIR /usr/src/app

COPY . .

CMD ["npm", "run", "start"]