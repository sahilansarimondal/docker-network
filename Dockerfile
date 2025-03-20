FROM node:22-alpine

WORKDIR /app

COPY ./package.json ./package.json

COPY ./package-lock.json ./package-lock.josn

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/index.js" ]