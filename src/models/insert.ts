import { BaseQuery, TTableName } from './base';

export class InsertQuery extends BaseQuery {
  protected get columnStr(): string {
    throw new Error('Method not implemented.');
  }
  constructor(tableName: TTableName) {
    super(tableName, { sql: 'INSERT', canWhere: false, canOrderBy: false, canAddColumn: true });
  }

  get query() {
    return '';
  }
}
