import * as dotenv from 'dotenv';
import * as process from 'process';
import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
dotenv.config({ path: '.env' });

const migrationDir = path.join(
  __dirname,
  'dist',
  'src',
  'database',
  'migrations',
  '*.js',
);

export const ormconfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    path.join(
      __dirname,
      'src',
      'database',
      'entities',
      '**',
      '*.entity{.js,.ts}',
    ),
  ],
  // synchronize: process.env.DB_NAME !== 'marketing',
  synchronize: true,
  logging: true,
  migrations: [migrationDir],
};
