import { BaseQuery, TTableName } from './base';

export class DeleteQuery extends BaseQuery {
  protected get columnStr(): string {
    throw new Error('Method not implemented.');
  }
  constructor(tableName: TTableName) {
    super(tableName, { sql: 'DELETE', canWhere: true, canOrderBy: false, canAddColumn: false });
  }

  get query() {
    return '';
  }
}
