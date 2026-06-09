FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run migrate

EXPOSE 3000

CMD ["npm", "start"]
