FROM node:24.0.1-alpine3.20

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 5173

CMD ["yarn", "dev"]
