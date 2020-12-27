FROM node:12.18.1
WORKDIR .
RUN ls
RUN npm install
ENV NODE_ENV=production
RUN npm start