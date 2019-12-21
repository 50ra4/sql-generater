import { TDataType } from '../types';

export const wrapSingleQuotation = (v: TDataType): string => (typeof v === 'string' ? `'${v}'` : `${v}`);
