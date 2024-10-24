import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrationsTableName: 'migrations',
  migrations: ['dist/migrations/*.js'],
  synchronize: true,
};
export default new DataSource(dataSourceOptions);
