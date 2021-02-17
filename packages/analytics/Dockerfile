FROM node:14.15.4-alpine3.12 as base
WORKDIR /code
RUN chown -R node:node /code
USER node
COPY --chown=node:node package*.json ./

FROM base as test
RUN npm ci
COPY --chown=node:node . .

FROM base as production
RUN npm ci --only=production
COPY --chown=node:node . .
CMD [ "node", "index.js" ]

