FROM node:latest

WORKDIR /usr/src/backend

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

CMD ["yarn", "start:prod"]