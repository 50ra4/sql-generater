import { SelectQuery, DeleteQuery, InsertQuery, UpdateQuery } from '.';

describe('SelectQuery', () => {
  it('GROUP BYで返却', () => {
    const EXPECT1 =
      'SELECT sex, AVG(height) AS avgHeight, AVG(weight) AS avgWeight FROM users WHERE 1 = 1 AND age >= 18 AND age <= 22 AND hasDeleted != 1 GROUP BY sex;';

    const result = new SelectQuery('users')
      .column('sex')
      .column({ columnName: 'AVG(height)', asName: 'avgHeight' })
      .column({ columnName: 'AVG(weight)', asName: 'avgWeight' })
      .where('age', '>=', 18)
      .where('age', '<=', 22)
      .where('hasDeleted', '!=', 1)
      .groupBy('sex').query;
    expect(result).toBe(EXPECT1);
  });

  it('カラム指定がある場合、設定されて返却される', () => {
    const EXPECT2 =
      'SELECT id, name, age, sex AS gender FROM users WHERE 1 = 1 AND id >= 1 AND age <= 18 ORDER BY id desc, age;';

    const result = new SelectQuery('users')
      .column('id')
      .column([{ columnName: 'name' }, { columnName: 'age' }])
      .column({ columnName: 'sex', asName: 'gender' })
      .where('id', '>=', 1)
      .where('age', '<=', 18)
      .orderBy('id', 'desc')
      .orderBy('age').query;
    expect(result).toBe(EXPECT2);
  });

  it('IS NOT, INを利用したSELECT文を返却する', () => {
    const EXPECT3 =
      "SELECT * FROM users WHERE 1 = 1 AND sex IS NOT NULL AND age IN (12,15,18,22) AND name IN ('あ','い') ORDER BY id;";
    const result = new SelectQuery('users')
      .where('sex', 'IS NOT', 'NULL')
      .where('age', 'IN', [12, 15, 18, 22])
      .where('name', 'IN', ['あ', 'い'])
      .orderBy('id').query;
    expect(result).toBe(EXPECT3);
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
