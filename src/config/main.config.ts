import { ConfigFactory } from '@nestjs/config';
import isProductionMode from 'src/util/isProductionMode';

/**
 * api主版本号
 */
export const MAJOR_VERSION = 1;
/**
 * api次要版本号
 */
export const MINOR_VERSION = 0;
/**
 * api补丁版本号
 */
export const PATCH_VERSION = 0;
/**
 * api全局前缀
 */
export const GLOBAL_PREFIX = `/v${MAJOR_VERSION}/api`;
/**
 * 文档标题
 */
export const DOCUMENT_TITLE = 'Ultra Admin';
/**
 * 文档描述
 */
export const DOCUMENT_DESCRIPTION = 'Ultra Admin Server Api Document';
/**
 * 文档的版本号
 */
export const DOCUMENT_VERSION = `${MAJOR_VERSION}.${MINOR_VERSION}`;
/**
 * 服务器监听端口
 */
export const LISTEN_PORT = 3001;

export interface IMainConfig {
  allowCORS: boolean;
  listenPort: number;
  globalPrefix: string;
  majorVersion: number;
  minorVersion: number;
  patchVersion: number;
  documentTitle: string;
  documentDescription: string;
  documentVersion: string;
}

export const createMainConfig: ConfigFactory<IMainConfig> = () => ({
  allowCORS: !isProductionMode(),
  listenPort: LISTEN_PORT,
  globalPrefix: `/v${MAJOR_VERSION}/api`,
  majorVersion: MAJOR_VERSION,
  minorVersion: MINOR_VERSION,
  patchVersion: PATCH_VERSION,
  documentTitle: DOCUMENT_TITLE,
  documentDescription: DOCUMENT_DESCRIPTION,
  documentVersion: DOCUMENT_VERSION,
});
