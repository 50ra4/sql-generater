import { BaseQuery } from './base';
import { TTableName, TTargetColumn } from '../types';
import { wrapSingleQuotation } from '../helpers';

export class UpdateQuery extends BaseQuery {
  protected get columnStr(): string {
    if (this._columns.length < 1) {
      throw new Error('UpdateQuery must add columns.');
    }
    return this._columns
      .map(({ columnName, value }) => {
        if (typeof value === 'undefined') {
          throw new Error('UpdateQuery must set columns value property.');
        }
        return `${columnName} = ${wrapSingleQuotation(value)}`;
      })
      .join(', ');
  }

  column(params: TTargetColumn | TTargetColumn[]) {
    return super.column(params);
  }

  constructor(tableName: TTableName) {
    super(tableName, { sql: 'UPDATE', canWhere: true, canOrderBy: false, canAddColumn: true });
  }

  get query() {
    return ['UPDATE', this._tableName, 'SET', this.columnStr, this.whereStr].join(' ') + ';';
  }
}
