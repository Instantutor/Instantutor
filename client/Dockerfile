# Node distribution from dockerhub
FROM node:10.16-alpine

# App directory
WORKDIR /usr/src/app

# Copying over dependencies
COPY package*.json ./

# Install the directories
RUN npm install

# Copy over the remaining files
COPY . .

# Expose the port for 3000
EXPOSE 3000

# Using npm start
CMD ["npm", "start"]