import { InsertQueryBuilder } from './insert';
import { SelectQueryBuilder } from './select';
import { UpdateQueryBuilder } from './update';
import { DeleteQueryBuilder } from './delete';

export { InsertQueryBuilder, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder };
export class SqlQueryFactory {
  static select<T>(tableName: T) {
    return new SelectQueryBuilder(tableName);
  }
  static update<T>(tableName: T) {
    return new UpdateQueryBuilder(tableName);
  }
  static insert<T>(tableName: T) {
    return new InsertQueryBuilder(tableName);
  }
  static delete<T>(tableName: T) {
    return new DeleteQueryBuilder(tableName);
  }
}
