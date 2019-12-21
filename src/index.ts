import { SelectQuery, UpdateQuery, DeleteQuery, InsertQuery } from './models';

const start = () => {
  // select
  const selectQuery = new SelectQuery('users');

  selectQuery
    .where('sex', '=', 'WOMEN')
    .where('age', '>=', 18)
    .where('age', '<=', 22)
    .where('weight', '<', 60);
  console.log('==== [SELECT] where ====\n', selectQuery.query);

  selectQuery
    .orderBy('age')
    .orderBy('weight', 'asc')
    .orderBy('id', 'desc');
  console.log('==== [SELECT] orderBy ====\n', selectQuery.query);

  selectQuery.column([{ columnName: 'id', asName: 'userId' }, 'name', 'sex', 'weight', 'height', 'age']);
  console.log('==== [SELECT] column ====\n', selectQuery.query);

  // update
  const updateQuery = new UpdateQuery('users');

  // delete
  const deleteQuery = new DeleteQuery('users');

  // insert
  const insertQuery = new InsertQuery('users');
};

start();
