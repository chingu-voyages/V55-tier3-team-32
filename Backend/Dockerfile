FROM node:21-alpine3.18

WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY .npmrc ./
COPY src ./src
RUN ls -a
RUN npm install && npm install -g nodemon

EXPOSE 4001

CMD [ "npm", "run", "dev" ]
