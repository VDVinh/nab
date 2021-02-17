FROM node:14.15.4-alpine3.12
WORKDIR /code
RUN chown -R node:node /code
USER node
COPY --chown=node:node package*.json ./
RUN npm ci --only=production
COPY --chown=node:node . .
CMD [ "node", "index.js" ]

