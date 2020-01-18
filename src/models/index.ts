import { InsertQueryBuilder } from './insert';
import { SelectQueryBuilder } from './select';
import { UpdateQueryBuilder } from './update';
import { DeleteQueryBuilder } from './delete';

export { InsertQueryBuilder, SelectQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder };
export class SqlQueryFactory {
  static select(tableName: string) {
    return new SelectQueryBuilder(tableName);
  }
  static update(tableName: string) {
    return new UpdateQueryBuilder(tableName);
  }
  static insert(tableName: string) {
    return new InsertQueryBuilder(tableName);
  }
  static delete(tableName: string) {
    return new DeleteQueryBuilder(tableName);
  }
}
