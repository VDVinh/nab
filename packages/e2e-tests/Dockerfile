FROM node:14.15.4-alpine3.12
WORKDIR /code
COPY package*.json ./
RUN npm install
ENV PRODUCT_BFF_URL=http://product-bff:3000
COPY . .
CMD [ "npm", "test" ]
