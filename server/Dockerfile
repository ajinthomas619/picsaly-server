FROM node:21-alpine

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["nodemon","index.js"]