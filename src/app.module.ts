import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createMainConfig } from './config/main.config';
import { IDatabaseConfig, databaseConfig } from './config/database.config';
import { IAllConfig } from './config/all.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [createMainConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      name: 'default',
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<IAllConfig, true>) => {
        const _databaseConfig: IDatabaseConfig = configService.get('database', {
          infer: true,
        });
        return {
          type: 'mysql',
          host: _databaseConfig.host,
          port: _databaseConfig.port,
          username: _databaseConfig.username,
          password: _databaseConfig.password,
          database: _databaseConfig.database,
          entities: [],
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
