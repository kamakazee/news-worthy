# news-worthy-API

## databases

There are two databases that can be accessed in this API for testing purposes:

1. nc_news (development)
2. nc_news_test (test database)

These can be accessed via the setting of the PGDATABASE variable to one of these databases.

To enable the automatic access and seeding of the relevant database, please set up two files with the following file names and value to the variable PGDATABASE:

1.  .env.development

```
   PGDATABASE=nc_news
```

2.  .env.test

```
   PGDATABASE=nc_news_test
```

Please add these files to a .gitignore file so they don't get pushed into your git repository
