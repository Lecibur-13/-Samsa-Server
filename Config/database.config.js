import { OracleClient } from './OracleClient';
import { PostgresClient } from './PostgresClient';
import { MySQLClient } from './MySQLClient';
import { MongoDbClient } from './MongoDbClient';

function DatabaseClient() {
  const dbType = process.env.DB_TYPE;

  switch (dbType) {
    case 'oracle':
      return new OracleClient();
    case 'postgres':
      return new PostgresClient();
    case 'mysql':
      return new MySQLClient();
    case 'mongodb':
      return new MongoDbClient();
    default:
      throw new Error('Unsupported database type');
  }
}

global.DB = DatabaseClient();

export { DatabaseClient };
