# sql-generater

FirebaseのFireStore風にSQLコマンドを書けるようにしたやつ。

例えば、
```
SELECT * FROM users WHERE 1 = 1 AND sex IS NOT NULL AND age IN (12,15,18,22) ORDER BY id;
```
とSQL文を書きたきゃ、
```
const result = new SelectQuery('users')
      .where('sex', 'IS NOT', 'NULL')
      .where('age', 'IN', [12, 15, 18, 22])
      .orderBy('id').query
```
と書く。

詳しくは
- src/models/index.test.ts
か
- src/index.ts
を参照されたし。

API Documentation created By typedoc [Check github pages](https://shigarashi1.github.io/sql-generater/)