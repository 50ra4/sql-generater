import { BaseQueryBuilder } from './base';
import { TTargetColumn, TDataType } from '../types';
import { wrapSingleQuotation } from '../helpers';

type TColumn = Omit<TTargetColumn, 'asName' | 'value'> & {
  value: TDataType;
};

export class UpdateQueryBuilder<T> extends BaseQueryBuilder<T> {
  constructor(tableName: T) {
    super(tableName);
  }

  protected get columnStr(): string {
    if (this._columns.length < 1) {
      throw new Error('UpdateQuery must add columns.');
    }
    return this._columns
      .map(({ columnName, value }) => {
        if (typeof value === 'undefined') {
          // setできないから起きえないけど
          throw new Error('UpdateQuery must set columns value property.');
        }
        return `${columnName} = ${wrapSingleQuotation(value)}`;
      })
      .join(', ');
  }

  column(params: TColumn | TColumn[]) {
    return super.column(params);
  }

  get query() {
    return (
      [
        'UPDATE', //
        this._tableName,
        'SET',
        this.columnStr,
        this.whereStr,
      ]
        .filter((v) => !!v)
        .join(' ') + ';'
    );
  }
}
