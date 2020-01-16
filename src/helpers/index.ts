import { TDataType, TTargetColumn } from '../types';

export const isWrapValue = (v: TDataType): boolean => typeof v === 'string' && v !== 'NULL';

export const wrapBracket = (v: string): string => `(${v})`;

export const wrapSingleQuotation = (v: TDataType): string => (isWrapValue(v) ? `'${v}'` : `${v}`);

export const toTargetColumn = (v: string | TTargetColumn): TTargetColumn =>
  typeof v !== 'string' ? v : { columnName: v };

export const toArray = <T>(v: T | T[]): T[] => (Array.isArray(v) ? v : [v]);
