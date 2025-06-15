FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY public/ ./public/
COPY src/ ./src/

RUN adduser -D appuser
RUN chown -R appuser:appuser /usr/src/app/node_modules
USER appuser

CMD ["npm", "start"]