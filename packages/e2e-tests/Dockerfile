FROM node:14.15.4-alpine3.12
WORKDIR /code
RUN chown -R node:node /code
USER node
COPY --chown=node:node package*.json ./
RUN npm ci --only=production
ENV PRODUCT_BFF_URL=http://product-bff:3000
COPY --chown=node:node . .
CMD [ "npm", "test" ]
