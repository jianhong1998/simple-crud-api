FROM node:16-alpine3.14

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8000

# CMD ["NODE_ENV=test", "npm", "start"]
CMD ["sh", "-c", "NODE_ENV=production npm start"]

# CMD ["npm", "run", "undoMigrate"]