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
      .column({ columnName: 'sex', replacedName: 'seibetu' })
      .where('id', '>=', 1)
      .where('age', '<=', 18)
      .orderBy('id', 'desc')
      .orderBy('age').query;
    expect(result).toBe(EXPECT2);
  });
});

describe('DeleteQuery', () => {
  const EXPECTED = "DELETE FROM users WHERE id > '1' AND hasDeleted = 1;";

  it.todo('条件通りに');
});

describe('InsertQuery', () => {
  const EXPECTED = 'INSERT INTO users (id, name, age, sex) VALUES ( 1, "fuga", 15, "WOMEN" );';

  it.todo('');
  const a = '';
});

describe('UpdateQuery', () => {
  const EXPECTED = 'UPDATE users SET sex = "WOMAN" WHERE id = 1;';

  it.todo('');
});
