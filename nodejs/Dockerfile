FROM node:12
WORKDIR /src
COPY package.json package-lock.json .
RUN npm clean-install
COPY server.js .
ENTRYPOINT [ "npm", "start" ]