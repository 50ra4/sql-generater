import { BaseQuery, TTableName } from './base';

export class UpdateQuery extends BaseQuery {
  protected get columnStr(): string {
    throw new Error('Method not implemented.');
  }
  constructor(tableName: TTableName) {
    super(tableName, { sql: 'UPDATE', canWhere: true, canOrderBy: false, canAddColumn: true });
  }

  get query() {
    return '';
  }
}
