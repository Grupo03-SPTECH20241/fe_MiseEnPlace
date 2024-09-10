ARG NODE_VERSION=20.17.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
