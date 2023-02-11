FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --force
RUN npm install pm2 -g
COPY . ./
EXPOSE 4000
CMD ["pm2-runtime", "app.js", "-i", "max"]
