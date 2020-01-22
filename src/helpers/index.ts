import { TDataType, TTargetColumn } from '../types';
import { escape } from 'sqlstring';

export const isNullValue = (v: TDataType): boolean => v !== 'NULL';

export const wrapBracket = (v: string): string => `(${v})`;

export const wrapSingleQuotation = (v: TDataType): string => (isNullValue(v) ? escape(v) : `${v}`);

export const toTargetColumn = (v: string | TTargetColumn): TTargetColumn =>
  typeof v !== 'string' ? v : { columnName: v };

export const toArray = <T>(v: T | T[]): T[] => (Array.isArray(v) ? v : [v]);
