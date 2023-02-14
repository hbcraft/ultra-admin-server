import { NestFactory } from '@nestjs/core';
import { GLOBAL_PREFIX, LISTEN_PORT } from './app.config';
import { AppModule } from './app.module';

/**
 * 启动应用
 */
async function bootstrap() {
  // 创建应用实例
  const app = await NestFactory.create(AppModule);
  // 设置全局api前缀
  app.setGlobalPrefix(GLOBAL_PREFIX);
  // 监听端口
  await app.listen(LISTEN_PORT);
}
bootstrap();
