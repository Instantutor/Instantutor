# node version from docker hub
FROM node:16

# working directory inside the docker image
WORKDIR /usr/src/app

# copy over the package and package-lock.json
COPY package*.json ./

# Install the directories
RUN npm install --force

# Copy over the remaining files
COPY . .

# Expose the port for 5000
EXPOSE 5000

# Running server.js 
CMD ["node", "server.js"]