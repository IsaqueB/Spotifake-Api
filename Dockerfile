FROM node:14

WORKDIR /src

COPY . /src

RUN npm install

CMD npm run start
