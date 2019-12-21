import { TTableName, BaseQuery } from './base';

export class SelectQuery extends BaseQuery {
  constructor(tableName: TTableName) {
    super(tableName, { sql: 'SELECT', canWhere: true, canOrderBy: true, canAddColumn: true });
  }

  protected get columnStr(): string {
    return this._columns.length < 1
      ? '*'
      : this._columns
          .map(({ columnName, replacedName }) => (!replacedName ? columnName : `${columnName} AS ${replacedName}`))
          .join(', ');
  }

  get query() {
    return (
      [`SELECT ${this.columnStr} FROM ${this._tableName}`, this.whereStr, this.orderByStr]
        .filter((v) => !!v)
        .join(' ') + ';'
    );
  }
}
