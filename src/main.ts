import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  DOCUMENT_DESCRIPTION,
  DOCUMENT_TITLE,
  DOCUMENT_VERSION,
  GLOBAL_PREFIX,
  LISTEN_PORT,
} from './app.config';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';

/**
 * 创建swagger文档
 * @param app nest应用实例
 */
function createDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(DOCUMENT_TITLE)
    .setDescription(DOCUMENT_DESCRIPTION)
    .setVersion(DOCUMENT_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/v1/doc', app, document);
}

/**
 * 启动应用
 */
async function bootstrap() {
  // 创建应用实例
  const app = await NestFactory.create(AppModule);
  // 允许跨域
  app.enableCors();
  // 设置全局api前缀
  app.setGlobalPrefix(GLOBAL_PREFIX);
  // 使用全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 创建swagger文档
  createDocument(app);
  // 监听端口
  await app.listen(LISTEN_PORT);
}
bootstrap();
