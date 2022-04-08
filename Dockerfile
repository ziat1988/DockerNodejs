FROM node:lts-alpine

WORKDIR /app

COPY /app/package*.json /

RUN npm install

COPY ./app /app

EXPOSE 8000

CMD ["node","server.js"]

