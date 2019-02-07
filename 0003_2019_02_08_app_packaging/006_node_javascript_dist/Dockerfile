FROM node:10

ADD package.json /app/
ADD app.js /app/

WORKDIR /app

RUN npm install

ENTRYPOINT ["node", "/app/app.js"]