export type TDataType = string | number | 'NULL';
export type TTargetColumn = {
  columnName: string;
  asName?: string;
  value?: TDataType;
};
