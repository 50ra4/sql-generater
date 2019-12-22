import { BaseQuery } from './base';
import { TTableName } from '../types';

export class DeleteQuery extends BaseQuery {
  protected get columnStr(): string {
    throw new Error('Method not implemented.');
  }

  constructor(tableName: TTableName) {
    super(tableName, { sql: 'DELETE', canWhere: true, canOrderBy: false, canAddColumn: false });
  }

  get query() {
    return (
      [
        `DELETE FROM ${this._tableName}`, //
        this.whereStr,
      ]
        .filter((v) => !!v)
        .join(' ') + ';'
    );
  }
}
