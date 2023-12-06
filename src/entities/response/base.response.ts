export class BaseResponse<T = unknown> {
  public time: Date = new Date();
  constructor(public data: T) {}
}
export type WrappedResponseData<T> = T extends BaseResponse
  ? T
  : BaseResponse<T>;
