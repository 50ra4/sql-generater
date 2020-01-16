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
    .orderBy('height', 'asc')
    .orderBy('weight', 'asc')
    .orderBy('id', 'desc');
  console.log('==== [SELECT] orderBy ====\n', selectQuery.query);

  selectQuery
    .column([{ columnName: 'id', asName: 'userId' }, 'name'])
    .column(['sex', 'weight', 'height'])
    .column('age');
  console.log('==== [SELECT] column ====\n', selectQuery.query);

  // update
  const updateQuery = new UpdateQuery('users');
  updateQuery //
    .column({ columnName: 'name', value: 'ramda' })
    .column([
      { columnName: 'height', value: 155 },
      { columnName: 'weight', value: 75 },
    ])
    .where('id', '=', 1);
  console.log('==== [UPDATE] column ====\n', updateQuery.query);

  // delete
  const deleteQuery = new DeleteQuery('users');
  deleteQuery //
    .where('height', '<=', 170)
    .where('sex', '=', 'MEN');
  console.log('==== [DELETE] column ====\n', deleteQuery.query);

  // insert
  const insertQuery = new InsertQuery('users');
  insertQuery.column({ columnName: 'name', value: 'ramda' }).column([
    { columnName: 'sex', value: 'MEN' },
    { columnName: 'age', value: 22 },
    { columnName: 'height', value: 155 },
    { columnName: 'weight', value: 75 },
  ]);
  console.log('==== [INSERT] column ====\n', insertQuery.query);
};

start();
