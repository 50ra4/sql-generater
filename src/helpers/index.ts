import { TDataType } from '../types';

const isStringArray = (arr: any): arr is string[] => Array.isArray(arr) && arr.length > 0 && typeof arr[0] === 'string';
const isNumberArray = (arr: any): arr is number[] => Array.isArray(arr) && arr.length > 0 && typeof arr[0] === 'number';

export const wrapSingleQuotation = (v: TDataType | string[] | number[]): string => {
  if (typeof v === 'string' && v !== 'NULL') {
    return `'${v}'`;
  }
  // TODO: 配列の型変換が上手くいかず。。。
  if (isStringArray(v)) {
    return `(${v.map(wrapSingleQuotation)})`;
  }
  if (isNumberArray(v)) {
    return `(${v.map(wrapSingleQuotation)})`;
  }
  return `${v}`;
};
