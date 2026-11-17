FROM node:22 AS backBuilder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --omit=dev

FROM node:22 AS final

WORKDIR /app

COPY --from=backBuilder /app/dist ./dist

COPY --from=backBuilder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node","dist/index.js"]
