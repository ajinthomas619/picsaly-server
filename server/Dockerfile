FROM node:21-alpine

WORKDIR /server/server/src

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npx", "nodemon", "--exec", "ts-node", "./src/index.ts"]