import { IDatabaseConfig } from './database.config';
import { IMainConfig } from './main.config';

export interface IAllConfig extends IMainConfig {
  database: IDatabaseConfig;
}
