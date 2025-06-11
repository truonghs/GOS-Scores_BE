# My [GOS-Scores](https://gos-scores-fe.vercel.app/) (Back-End)

Welcome to GOS-Scores. This is an application built using NestJS to handle requests from [GOS-Scores](https://gos-scores-fe.vercel.app/). Please follow the following introduction to get the project up and running!

## Table of Contents

- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Settings](#settings)
- [Run the Project](#run-the-project)
- [Deployment](#deployment)

## System Requirements

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)
- [PostgreSql](https://www.postgresql.org/)
## Installation
1. Clone the repository:

    ```bash
    git clone https://github.com/truonghs/GOS-Scores_BE.git
    ```

2. Install the Nest CLI globally:

  ```bash
    npm install -g @nestjs/cli
  ```
    

3. Navigate into the project directory:

    ```bash
    cd gos-scores_be
    ```

4. Install the project dependencies:

    Using npm:

    ```bash
    npm install
    ```

## Settings
Add environment variables.\
At the root of the project, create a .env file and add the following environment variables
```
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_user_password
PORT=your_default_port
CLIENT_URLS=your_client_url
```

## Run the Project

To start the development server and run the project locally, use the following command:

Using npm:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Migrate and seed data
After running the server, you need to migrate and seed data into the database according to the instructions below.
```bash
# Run migration and seed data
$ npm run typeorm:run-migrations
$ npm run seed

```

## Deployment

The server is deployed with Render!
- Because of using the free service that Render provides, the server may be stopped if there are no requests for a period of time. So please be patient if your first request to the server takes some time.

