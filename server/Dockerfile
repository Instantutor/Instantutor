# node version from docker hub
FROM node:16-slim

# working directory inside the docker image
WORKDIR /usr/src/app

# copy over the package and package-lock.json
COPY package*.json ./

# Install the directories
RUN npm ci

# Copy over the remaining files
COPY . .

# Expose the port for 5000
EXPOSE 5000

# Running server.js 
CMD ["node", "server.js"]