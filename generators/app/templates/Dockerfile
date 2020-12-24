FROM node:<%= nodeVersion %>-slim

# Change working directory
ARG WORK_DIR="/app"
WORKDIR ${WORK_DIR}

# Update packages and install dependency packages for services
RUN apt-get update \
 && apt-get dist-upgrade -y \
 && apt-get clean \
 && echo 'Finished installing dependencies'

# Copy package.json, package-lock.json, and tsconfig.json
COPY package*.json ./
COPY tsconfig.json ./

# Install npm production packages
RUN npm install
COPY . ${WORK_DIR}
COPY .env.example ${WORK_DIR}/.env

# Compile typescript
RUN npm run build

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

USER node

CMD ["npm", "start"]
