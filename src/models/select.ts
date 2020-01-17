import { BaseQueryBuilder } from './base';
import { TTargetColumn } from '../types';

type TOrderStr = 'asc' | 'desc';
type TOrderByCondition = {
  columnName: string;
  orderStr: TOrderStr;
};
type TColumn = Omit<TTargetColumn, 'value'>;

export class SelectQueryBuilder<T> extends BaseQueryBuilder<T> {
  private _orderBy: TOrderByCondition[] = [];
  private _groupBy: string[] = [];

  constructor(tableName: T) {
    super(tableName);
  }

  protected get columnStr(): string {
    return this._columns.length < 1
      ? '*'
      : this._columns.map(({ columnName, asName }) => (!asName ? columnName : `${columnName} AS ${asName}`)).join(', ');
  }

  column(params: string | TColumn | Array<string | TColumn>) {
    return super.column(params);
  }

  public orderBy(columnName: string, orderStr: TOrderStr = 'asc') {
    this._orderBy.push({ columnName, orderStr });
    return this;
  }

  private get orderByStr(): string {
    if (this._orderBy.length < 1) {
      return '';
    }
    const q = this._orderBy
      .map(({ columnName, orderStr }) => (orderStr !== 'asc' ? `${columnName} ${orderStr}` : columnName))
      .join(', ');
    return `ORDER BY ${q}`;
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
