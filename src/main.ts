import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { IAllConfig } from './config/all.config';

/**
 * 创建swagger文档
 * @param app nest应用实例
 */
function createDocument(
  app: INestApplication,
  configService: ConfigService<IAllConfig, true>,
) {
  const documentTitle = configService.get('documentTitle', { infer: true });
  const documentDescription = configService.get('documentDescription', {
    infer: true,
  });
  const documentVersion = configService.get('documentVersion', { infer: true });
  const majorVersion = configService.get('majorVersion', { infer: true });
  const docConfig = new DocumentBuilder()
    .setTitle(documentTitle)
    .setDescription(documentDescription)
    .setVersion(documentVersion)
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup(`/v${majorVersion}/doc`, app, document);
}

/**
 * 启动应用
 */
async function bootstrap() {
  // 创建应用实例
  const app = await NestFactory.create(AppModule);
  // 获取配置服务
  const configService = app.get(ConfigService<IAllConfig, true>);
  // 判断是否允许跨域请求
  if (configService.get('allowCORS', { infer: true })) {
    // 允许跨域
    app.enableCors();
  }
  // 设置全局api前缀
  app.setGlobalPrefix(
    configService.get('globalPrefix', '/api', { infer: true }),
  );
  // 使用全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 创建swagger文档
  createDocument(app, configService);
  // 监听端口
  await app.listen(configService.get<number>('listenPort', 3000));
}
bootstrap();
