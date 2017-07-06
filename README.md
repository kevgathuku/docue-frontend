# Document Management System

[![Build Status](https://semaphoreci.com/api/v1/kevgathuku/docue-frontend/branches/develop/badge.svg)](https://semaphoreci.com/kevgathuku/docue-frontend)   [![Coverage Status](https://coveralls.io/repos/github/kevgathuku/docue-frontend/badge.svg?branch=develop)](https://coveralls.io/github/kevgathuku/docue-frontend?branch=develop)

[View on Pivotal Tracker](https://www.pivotaltracker.com/n/projects/1515788)

This is the frontend for a system that manages documents, users and roles.

Each document defines access rights i.e. which roles can access it and the date it was published.

Users are categorized by roles. Each user must have a role defined for them.

## Installation

- Clone the backend repo first and follow the instructions in the [README](https://github.com/kevgathuku/docue/blob/develop/README.md) to get it up and running:

```sh
git clone https://github.com/kevgathuku/docue
```

- Clone the frontend repo locally and navigate to the newly created folder

    ```bash
    git clone https://github.com/kevgathuku/docue-frontend
    cd docue-frontend
    ```

- Install the app dependencies

  ```bash
  npm install
  ```

- Copy the `.env.example` file to `.env`

   ```bash
   cp .env.example .env
   ```

- Replace the values in the `.env` file with the appropriate values
       - `NODE_ENV` - The environment you are running the code in i.e `development`, `test` or `production`
           The default value of `development` is fine and should work for most cases

- Start the project by running

  ```bash
  npm start
  ```

  It can be accessed on `http://localhost:3000`

## Running tests

To run the tests, use the following command:

```bash
npm test
```
