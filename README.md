## VUE-POSTGRES-NODE-DOCKER
This project is a wireframe of a Docker setup for a Vue.js, Postgres and NodeJS/Express app. This is mostly a proof-of-concept, template app.
Here are some working endpoints/routes:

- `http://localhost:3009`
- `http://localhost:3009/login`
- `http://localhost:3009/register`

## Project structure
- `server/`: Contains the Express.js backend code.
- `client/`: Contains the Vue.js frontend code.
- `docker-compose.yml`: Defines Docker services for running the project.
- `example-env-template.txt`: Example environment file for configuring the .dev.env file.
- `Dockerfile.backend`: Dockerfile for building the Express.js backend image.
- `Dockerfile.frontend.dev`: Dockerfile for building the Vue.js frontend image.
- `server/pg-data`: Stores PostgreSQL data (created only when creating the app_db container, added to gitignore).
- `server/config/init.sql`: Initialization SQL script for PostgreSQL and create table users.
- `server/config/postgresql.conf`: PostgreSQL configuration file.

## Prerequisites
Before you begin, ensure you have the following prerequisites:

- `Docker`
- `npm`

## Installation
Clone the repository to your local machine:
```
git clone the repo: ~ gh repo clone astrokin-app/node-vue-pg-ts-auth
```
Navigate to the project directory:
```
cd trial-vue-node-in-progress
```
Create a .env file based on the example-env-template.txt file.` Configure the environment variables to match your development setup.


## Install dependencies
Install dependencies for both the frontend and backend by running the following commands:
```
cd client
npm install
cd ../server/src
npm install
```
Access the frontend at http://localhost:8081 and the backend at http://localhost:3009. Develop and make changes to the Vue.js frontend and Express.js backend as needed.
NOTE: You can restart the container (docker restart app_backend), or modify some of the Express code to kick-off nodemon to apply changes.

## Docker build and up
```
docker compose build && docker compose up
```
The /pg-data directory should be created in /server for the persistent Postgres data.
