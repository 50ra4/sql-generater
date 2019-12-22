export type TTableName = 'users' | 'projects';
export type TDataType = string | number | Date | 'NULL';
export type TTargetColumn = {
  columnName: string;
  asName?: string;
  value?: TDataType;
};
