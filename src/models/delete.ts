import { BaseQueryBuilder } from './base';

export class DeleteQueryBuilder<T> extends BaseQueryBuilder<T> {
  constructor(tableName: T) {
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
