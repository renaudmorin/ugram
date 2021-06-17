FROM node:latest

WORKDIR /usr/src/frontend

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

# Install serve command for yarn package manager
RUN yarn global add serve

CMD ["serve", "-s", "build", "-l", "3000"]
