import { TDataType, TTargetColumn } from '../types';
import { wrapSingleQuotation, toArray, toTargetColumn, wrapBracket } from '../helpers';

type TWhereFilter = '=' | '>' | '<' | '>=' | '<=' | '!=' | 'LIKE' | 'NOT LIKE' | 'IS' | 'IS NOT' | 'IN' | 'NOT IN';
type TWhereCondition = {
  columnName: string;
  opStr: TWhereFilter;
  value: TDataType | Array<string | number>;
};

export abstract class BaseQueryBuilder {
  protected _tableName: string;
  protected _columns: TTargetColumn[] = [];
  protected _where: TWhereCondition[] = [];

  constructor(tableName: string) {
    this._tableName = tableName;
  }

  public column(params: string | TTargetColumn | Array<string | TTargetColumn>) {
    this._columns = [...this._columns, ...toArray(params).map(toTargetColumn)];
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
      .map(({ columnName, opStr, value }) =>
        Array.isArray(value)
          ? `${columnName} ${opStr} ${wrapBracket(`${value.map(wrapSingleQuotation)}`)}`
          : `${columnName} ${opStr} ${wrapSingleQuotation(value)}`,
      )
      .join(' AND ');
    return `WHERE 1 = 1 AND ${q}`;
  }

  abstract get query(): string;
}
