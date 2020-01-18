import { BaseQueryBuilder } from './base';

export class DeleteQueryBuilder extends BaseQueryBuilder {
  constructor(tableName: string) {
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
