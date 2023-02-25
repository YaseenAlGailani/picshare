FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN rm src/server/app-data-source.ts
RUN mv src/server/image-data-source.ts src/server/app-data-source.ts
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000