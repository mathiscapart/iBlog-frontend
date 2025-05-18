FROM node:24.0.2-alpine3.20

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 4173

RUN yarn build

CMD ["yarn", "preview"]
