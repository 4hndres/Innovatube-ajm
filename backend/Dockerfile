FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5050

#CMD ["/docker-entrypoint.sh"]
CMD ["node", "index.js"]