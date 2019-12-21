export type TTableName = 'users' | 'projects';
export type TDataType = string | number | Date;
export type TTargetColumn = {
  columnName: string;
  replacedName?: string;
  value?: TDataType;
};
