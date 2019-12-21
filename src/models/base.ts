import { format } from 'mysql';

type TDataType = string | number | Date;
type TWhereFilter = '=' | '>' | '<' | '>=' | '<=';
type TOrderStr = 'asc' | 'desc';
type TTableName = 'users' | 'projects';
type TTargetColumn = {
  columnName: string;
  value?: TDataType;
};
type TCondition = {
  columnName: string;
  opStr: TWhereFilter;
  value: TDataType;
};
type TOrderBy = {
  columnName: string;
  orderStr: TOrderStr;
};
type TInitializeOption = {
  sql: string;
  canWhere: boolean;
  canOrderBy: boolean;
};

export abstract class BaseQuery {
  protected _tableName: string;
  protected _targetColumns: TTargetColumn[] = [];
  protected _conditions: TCondition[] = [];
  protected _orderByCondition: TOrderBy[] = [];
  protected _option: TInitializeOption;

  constructor(tableName: TTableName, option: TInitializeOption) {
    this._tableName = tableName;
    this._option = option;
  }

  public where(columnName: string, opStr: TWhereFilter, value: string | number) {
    if (!this._option.canWhere) {
      throw Error('');
    }
    this._conditions.push({ columnName, opStr, value });
    return this;
  }

  public orderBy(columnName: string, orderStr: TOrderStr = 'asc') {
    if (!this._option.canOrderBy) {
      throw Error('');
    }
    this._orderByCondition.push({ columnName, orderStr });
    return this;
  }

  abstract get query(): string;
}

export class InsertQuery extends BaseQuery {
  constructor(tableName: TTableName) {
    super(tableName, { sql: 'INSERT INTO', canWhere: false, canOrderBy: false });
  }

  get query() {
    return '';
  }
}

export class SelectQuery extends BaseQuery {
  constructor(tableName: TTableName) {
    super(tableName, { sql: 'SELECT', canWhere: true, canOrderBy: true });
  }

  get query() {
    return '';
  }
}

const a = new SelectQuery('projects').where('', '<', '');
