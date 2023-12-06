import { registerAs } from '@nestjs/config';

export interface IDatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export const databaseConfig = registerAs<IDatabaseConfig>('database', () => ({
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'ultra_admin',
}));
