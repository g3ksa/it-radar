FROM node:18-alpine

WORKDIR /usr/src/app/main

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3001

RUN npm run build

USER node

CMD [ "npm", "run", "start:prod" ]
