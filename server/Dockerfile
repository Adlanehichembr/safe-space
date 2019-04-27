FROM node:10.15.3

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm -q install --production

COPY src/ ./src/
COPY config/ ./config/

ENV PORT 80
EXPOSE $PORT

ENV NODE_ENV production

CMD [ "npm", "start" ]
