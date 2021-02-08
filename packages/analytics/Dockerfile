FROM node:14.15.4-alpine3.12
WORKDIR /code
ENV ELASTIC_SEARCH_URL=http://elasticsearch:9200
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "index.js" ]

