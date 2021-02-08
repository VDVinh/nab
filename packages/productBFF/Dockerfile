FROM node:14.15.4-alpine3.12
WORKDIR /code
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "index.js" ]
