import { BaseQueryBuilder } from './base';
import { TTargetColumn, TDataType } from '../types';
import { wrapSingleQuotation } from '../helpers';

type TColumn = Omit<TTargetColumn, 'asName' | 'value'> & {
  value: TDataType;
};

export class InsertQueryBuilder extends BaseQueryBuilder {
  constructor(tableName: string) {
    super(tableName);
  }

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
          // setで必須だから起きえないけど
          throw new Error('Insert must set columns value property.');
        }
        return wrapSingleQuotation(value);
      })
      .join(', ');
    return `(${q})`;
  }

  column(params: TColumn | TColumn[]) {
    return super.column(params);
  }

  where() {
    return this;
  }

  get query() {
    return (
      [
        'INSERT INTO', //
        this._tableName,
        this.columnStr,
        'VALUES',
        this.columnValue,
      ]
        .filter((v) => !!v)
        .join(' ') + ';'
    );
  }
}
