FROM node:13.12.0-alpine
RUN apk add --no-cache nodejs npm

WORKDIR /app
COPY package.json /app
RUN npm install -g npm@latest
RUN npm install -g nodemon
RUN npm install -g node-gyp
RUN npm install
EXPOSE 5000
COPY . /app
CMD ["npm","start"]
