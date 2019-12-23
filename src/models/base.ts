import { TDataType, TTargetColumn, TTableName } from '../types';
import { wrapSingleQuotation } from '../helpers';

type TWhereFilter = '=' | '>' | '<' | '>=' | '<=' | '!=' | 'LIKE' | 'NOT LIKE' | 'IS' | 'IS NOT' | 'IN' | 'NOT IN';
type TWhereCondition = {
  columnName: string;
  opStr: TWhereFilter;
  value: TDataType | string[] | number[];
};
type TInitializeOption = {
  a: string;
};

const toTargetColumn = (v: string | TTargetColumn): TTargetColumn => (typeof v !== 'string' ? v : { columnName: v });

export abstract class BaseQuery {
  protected _tableName: string;
  protected _columns: TTargetColumn[] = [];
  protected _where: TWhereCondition[] = [];

  constructor(tableName: TTableName, option?: TInitializeOption) {
    this._tableName = tableName;
  }

  public column(params: string | TTargetColumn | Array<string | TTargetColumn>) {
    if (Array.isArray(params)) {
      this._columns = [...this._columns, ...params.map(toTargetColumn)];
    } else {
      this._columns.push(toTargetColumn(params));
    }
    return this;
  }

  protected abstract get columnStr(): string;

  public where(columnName: string, opStr: TWhereFilter, value: TDataType | string[] | number[]) {
    this._where.push({ columnName, opStr, value });
    return this;
  }

  protected get whereStr(): string {
    if (this._where.length < 1) {
      return '';
    }
    const q = this._where
      .map(({ columnName, opStr, value }) => `${columnName} ${opStr} ${wrapSingleQuotation(value)}`)
      .join(' AND ');
    return `WHERE 1 = 1 AND ${q}`;
  }

  abstract get query(): string;
}
