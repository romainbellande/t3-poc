FROM node:20-bookworm

RUN npx -y playwright@1.50.1 install --with-deps

COPY package.json .

RUN npm install
