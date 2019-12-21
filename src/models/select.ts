import { BaseQuery } from './base';
import { TTableName, TTargetColumn } from '../types';

type TColumn = Omit<TTargetColumn, 'value'>;

export class SelectQuery extends BaseQuery {
  constructor(tableName: TTableName) {
    super(tableName, { sql: 'SELECT', canWhere: true, canOrderBy: true, canAddColumn: true });
  }

  protected get columnStr(): string {
    return this._columns.length < 1
      ? '*'
      : this._columns
          .map(({ columnName, replacedName }) => (!replacedName ? columnName : `${columnName} AS ${replacedName}`))
          .join(', ');
  }

  column(params: string | string[] | TColumn | TColumn[]) {
    return super.column(params);
  }

  get query() {
    return (
      [`SELECT ${this.columnStr} FROM ${this._tableName}`, this.whereStr, this.orderByStr]
        .filter((v) => !!v)
        .join(' ') + ';'
    );
  }
}
