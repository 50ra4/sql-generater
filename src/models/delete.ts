import { BaseQuery } from './base';
import { TTableName } from '../types';

export class DeleteQuery extends BaseQuery {
  constructor(tableName: TTableName) {
    super(tableName);
  }

  protected get columnStr(): string {
    throw new Error('Method not implemented.');
  }

  column() {
    return this;
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
