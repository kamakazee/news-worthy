# news-worthy-API

## Description of API

Once hosted, this codebase provides an API via HTTP endpoints for the storage, retrieval and updating of news articles and comments left on the articles by users/readers.

The news articles and comments are stored in an SQL database.

Users of the API do not need to know the details of how the information is stored, just how to use the endpoints.

## Demo of API
 The following `URL` location is a hosted version of this API with some pre-filled data for demonstration purposes. 

The returned data are in JSON format, so for readability, it is recommended that the data is viewed in a text editor that understands the JSON format, the `/api` endpoint returns a list of available endpoints provided by the API.

https://tibbits.herokuapp.com/api/

The functionality of the endpoints can be made more user friendly through a suitable frontend graphical user interface.

## Project summary
---

This API was created as a learning excercise into backend software development. The moving parts of the API once up and running  consists of two main parts, an Express HTTP server and a PostgreSQL database.

The development of the codebase followed a "test first" approach, so there is significant structure throughout the code and file structure for testing purposes. This aims to allow the code to be more easily understood, and hopefully be re-used by other developers looking to learn more about backend software development.

---

# Setup
Fork and clone this repository, once that is done, follow the steps below to get up and running.


## Project dependencies

- Express
- Jest
- supertest
- PostgreSQL

To install all the dependencies run the following command in the terminal

```
npm install 
```


## 1. Database creation

A number of scripts in the package.json provide the functionality to programmatically create and re-seed SQL databases for testing purposes. First things first, run the following command in your terminal, it is important!


```
npm run setup-dbs
```
It creates a fresh copy of the test and development databases. if you take a peek at the package.json file you will see that it simply runs a `.sql` file using `psql`.

If run successfully, you should see the following outputs in the terminal

```
DROP DATABASE
DROP DATABASE
CREATE DATABASE
CREATE DATABASE
```
The script deletes the databases if they exist and re-create them. You can confirm that the databases exist by opening up the psql CLI and running the command `\l` in the CLI to see a table of the databases in the psql server. You should see an instance of the following database:

```
nc_news
nc_news_test
```
## 2. Environment variable setup

For the purpose of automatically re-seeding of our databases, which is vital for testing purposes, we make use of an environment variable called `PGDATABASE`.

When files are run in a test environment, this variable `PGDATABASE` is automatically set to the value of `test`, otherwise it is undefined.

This is used as the premise for populating either the development database, or the test database.

To enable the automatic re-seeding of the relevant database, simply set up two files with the following file names and value to the variable `PGDATABASE`:

1.  (.env.development)

```
   PGDATABASE=nc_news
```

2.  (.env.test)

```
   PGDATABASE=nc_news_test
```

Please add these files to a `.gitignore` file so they don't get pushed into your git repository

## 3. Run test file

Provided you have followed the previous steps, you are ready to run the test script below.

```
npm test app.test.js
```
If successful, you would see the tests associated to all the endpoints being executed in the terminal, there should be 42 tests in total.