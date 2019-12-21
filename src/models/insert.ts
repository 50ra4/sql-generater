import { BaseQuery } from './base';
import { TTargetColumn, TTableName } from '../types';
import { wrapSingleQuotation } from '../helpers';

export class InsertQuery extends BaseQuery {
  protected get columnStr(): string {
    if (this._columns.length < 1) {
      throw new Error('Insert must add columns.');
    }
    const q = this._columns.map(({ columnName }) => columnName).join(', ');
    return `(${q})`;
  }

  private get columnValue(): string {
    if (this._columns.length < 1) {
      throw new Error('Insert must add columns.');
    }
    const q = this._columns
      .map(({ value }) => {
        if (typeof value === 'undefined') {
          throw new Error('Insert must set columns value property.');
        }
        return wrapSingleQuotation(value);
      })
      .join(', ');
    return `(${q})`;
  }

  column(params: TTargetColumn | TTargetColumn[]) {
    return super.column(params);
  }

  constructor(tableName: TTableName) {
    super(tableName, { sql: 'INSERT', canWhere: false, canOrderBy: false, canAddColumn: true });
  }

  get query() {
    return ['INSERT INTO', this._tableName, this.columnStr, 'VALUES', this.columnValue].join(' ') + ';';
  }
}
