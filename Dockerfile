FROM node:12.18.1
WORKDIR .
RUN npm install
ENV NODE_ENV=production
CMD ["npm","start"] 