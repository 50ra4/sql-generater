import { BaseQuery } from './base';
import { TTableName, TTargetColumn } from '../types';

type TColumn = Omit<TTargetColumn, 'value'>;

export class SelectQuery extends BaseQuery {
  private _groupBy: string[] = [];

  constructor(tableName: TTableName) {
    super(tableName, { sql: 'SELECT', canWhere: true, canOrderBy: true, canAddColumn: true });
  }

  protected get columnStr(): string {
    return this._columns.length < 1
      ? '*'
      : this._columns.map(({ columnName, asName }) => (!asName ? columnName : `${columnName} AS ${asName}`)).join(', ');
  }

  column(params: string | TColumn | Array<string | TColumn>) {
    return super.column(params);
  }

  private get groupByStr(): string {
    return this._groupBy.length < 1 ? '' : `GROUP BY ${this._groupBy.join(', ')}`;
  }

  groupBy(columnName: string) {
    this._groupBy.push(columnName);
    return this;
  }

  get query() {
    return (
      [
        `SELECT ${this.columnStr} FROM ${this._tableName}`, //
        this.whereStr,
        this.groupByStr,
        this.orderByStr,
      ]
        .filter((v) => !!v)
        .join(' ') + ';'
    );
  }
}
