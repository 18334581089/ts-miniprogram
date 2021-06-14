/**
 * http请求方法枚举
 */
export declare type HttpMethod = | 'GET' | 'OPTIONS' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';

/**
 * http 请求封装
 */
export interface HttpRequest {
  url: string;
  method?: HttpMethod;
  data?: any;
  token?: boolean;
}

/**
 * http请求回调
 */
export interface HttpCallback {
  onSuccess: SuccessCallback;
  onServerError: ErrorCallback;
  onNetworkError: ErrorCallback;
}

/**
 * 成功的callback
 */
export type SuccessCallback = (data: string | Object | ArrayBuffer) => void;

/**
 * 错误的callback
 */
export type ErrorCallback = (error: HttpError) => void;

/**
 * 请求错误
 */
export interface HttpError {
  code: number;
  errMsg: string;
}

/**
 * http请求拦截器
 */
export interface HttpInterceptor {
  handleResponse(
    statusCode: number,
    data: string | Object | ArrayBuffer,
    callback: HttpCallback
  ): void;
}