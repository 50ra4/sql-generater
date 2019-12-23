# sql-generater

FirebaseのFireStore風にSQLコマンドを書けるようにしたやつ。

例えば、
```
SELECT * FROM users WHERE 1 = 1 AND id >= 1 AND age <= 18 ORDER BY id desc, age;
```
とSQL文を書きたきゃ、
```
    const result = new SelectQuery('users')
      .where('id', '>=', 1)
      .where('age', '<=', 18)
      .orderBy('id', 'desc')
      .orderBy('age').query;
```
と書く。

詳しくは
- src/models/index.test.ts
か
- src/index.ts
を参照されたし。

API Documentation created By typedoc [Check github pages](https://shigarashi1.github.io/sql-generater/)