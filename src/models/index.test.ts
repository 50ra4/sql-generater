import { SelectQuery, DeleteQuery, InsertQuery, UpdateQuery } from '.';

describe('SelectQuery', () => {
  const EXPECT1 = "SELECT * FROM users WHERE 1 = 1 AND name = 'hoge';";
  const EXPECT2 =
    'SELECT id, name, age, sex AS seibetu FROM users WHERE 1 = 1 AND id >= 1 AND age <= 18 ORDER BY id desc, age asc;';

  it('カラム指定がない場合、*で返却', () => {
    const result = new SelectQuery('users').where('name', '=', 'hoge').query;
    expect(result).toBe(EXPECT1);
  });

  it('カラム指定がある場合、設定されて返却される', () => {
    const result = new SelectQuery('users')
      .column('id')
      .column([{ columnName: 'name' }, { columnName: 'age' }])
      .column({ columnName: 'sex', asName: 'seibetu' })
      .where('id', '>=', 1)
      .where('age', '<=', 18)
      .orderBy('id', 'desc')
      .orderBy('age').query;
    expect(result).toBe(EXPECT2);
  });
});

describe('DeleteQuery', () => {
  const EXPECTED = "DELETE FROM users WHERE 1 = 1 AND name = 'hoge' AND hasDeleted = 1;";
  it('条件通りのDELETE文を返却', () => {
    const result = new DeleteQuery('users') //
      .where('name', '=', 'hoge')
      .where('hasDeleted', '=', 1).query;
    expect(result).toBe(EXPECTED);
  });
});

describe('InsertQuery', () => {
  const EXPECTED = "INSERT INTO users (id, name, age, sex) VALUES (1, 'fuga', 15, 'WOMEN');";
  it('条件通りのINSERT文を返却', () => {
    const result = new InsertQuery('users') //
      .column({ columnName: 'id', value: 1 })
      .column([
        { columnName: 'name', value: 'fuga' },
        { columnName: 'age', value: 15 },
        { columnName: 'sex', value: 'WOMEN' },
      ]).query;
    expect(result).toBe(EXPECTED);
  });
});

describe('UpdateQuery', () => {
  const EXPECTED = "UPDATE users SET age = 15, name = 'sadako' WHERE 1 = 1 AND id > 1 AND sex = 'WOMAN';";
  it('条件通りのUPDATE文を返却', () => {
    const result = new UpdateQuery('users') //
      .column({ columnName: 'age', value: 15 })
      .column([{ columnName: 'name', value: 'sadako' }])
      .where('id', '>', 1)
      .where('sex', '=', 'WOMAN').query;
    expect(result).toBe(EXPECTED);
  });
});
