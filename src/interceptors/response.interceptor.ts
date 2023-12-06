import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import {
  BaseResponse,
  WrappedResponseData,
} from '../entities/response/base.response';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, WrappedResponseData<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ):
    | Observable<WrappedResponseData<T>>
    | Promise<Observable<WrappedResponseData<T>>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof BaseResponse) {
          return data as WrappedResponseData<T>;
        } else {
          return new BaseResponse(data) as WrappedResponseData<T>;
        }
      }),
    );
  }
}
