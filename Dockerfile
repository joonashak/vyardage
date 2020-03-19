FROM node:12.16

# Port can be configure via --build-arg.
ARG port=3001

# Install frontend dependencies.
WORKDIR /usr/src/app/client
COPY client/package.json client/package-lock.json ./
RUN npm ci

# Install backend dependencies.
WORKDIR /usr/src/app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci

# Build frontend.
WORKDIR /usr/src/app
COPY client client/
WORKDIR /usr/src/app/client
RUN npm run build
RUN cp -r build/ ../server/public

# Build backend.
WORKDIR /usr/src/app
COPY server server/
WORKDIR /usr/src/app/server
RUN npm run build

# Prepare e2e test package.
#RUN npm run install:e2e

EXPOSE $port

CMD npm start
