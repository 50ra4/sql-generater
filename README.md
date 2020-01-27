# sql-query-builder-like-firestore

## What is "sql-query-builder-like-firestore"?

It’s a class which enables you to write the “SQL Query” like a firebase’s firestore.

## Installation

npm install
```
npm i sql-query-builder-like-firestore
```
And Import
```
import { SqlQueryFactory } from 'sql-query-builder-like-firestore';
```

## Usage

API Documentation created By typedoc [Check github pages](https://shigarashi1.github.io/sql-generater/)

If you want to write such a SQL query
```
SELECT * FROM users WHERE 1 = 1 AND id >= 1 AND age <= 18 ORDER BY id desc, age;
```
you can be achieved by writing as follows...
```
import { SqlQueryFactory } from 'sql-query-builder-like-firestore';

const result = SqlQueryFactory.SelectQuery('users')
    .where('id', '>=', 1)
    .where('age', '<=', 18)
    .orderBy('id', 'desc')
    .orderBy('age').query;
```
