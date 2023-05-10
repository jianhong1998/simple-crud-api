FROM node:16-alpine3.14

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# CMD ["npm", "run", "undoMigrate"]