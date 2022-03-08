#########################################################
#      Configuration from Dorm Design Dockerfile        #
#########################################################
# First build the files
FROM node:16-slim AS builder

WORKDIR /app

# copyies package-lock.json and package.json
COPY package*.json ./

# install dependencies (excluding devDependencies)
RUN npm ci --production

# copy everything over to environment
COPY . .

RUN npm run build

# Now actually serve the built files
FROM node:16-slim
WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy files over from builder
COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]