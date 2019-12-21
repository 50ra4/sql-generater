import { BaseQuery } from './base';
import { TTableName, TTargetColumn, TDataType } from '../types';
import { wrapSingleQuotation } from '../helpers';

type TColumn = Omit<TTargetColumn, 'asName' | 'value'> & {
  value: TDataType;
};

export class UpdateQuery extends BaseQuery {
  protected get columnStr(): string {
    if (this._columns.length < 1) {
      throw new Error('UpdateQuery must add columns.');
    }
    return this._columns
      .map(({ columnName, value }) => {
        if (typeof value === 'undefined') {
          // setで防いでるから、起きえないけど
          throw new Error('UpdateQuery must set columns value property.');
        }
        return `${columnName} = ${wrapSingleQuotation(value)}`;
      })
      .join(', ');
  }

  column(params: TColumn | TColumn[]) {
    return super.column(params);
  }

  constructor(tableName: TTableName) {
    super(tableName, { sql: 'UPDATE', canWhere: true, canOrderBy: false, canAddColumn: true });
  }

  get query() {
    return ['UPDATE', this._tableName, 'SET', this.columnStr, this.whereStr].join(' ') + ';';
  }
}
