/**
 * http请求方法枚举
 */
declare type HttpMethod = | 'GET' | 'OPTIONS' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';

/**
 * http 请求封装
 */
interface HttpRequest {
  url: string;
  method?: HttpMethod;
  data?: any;
  token?: boolean;
}

/**
 * http请求回调
 */
interface HttpCallback {
  onSuccess: SuccessCallback;
  onServerError: ErrorCallback;
  onNetworkError: ErrorCallback;
}

/**
 * 成功的callback
 */
type SuccessCallback = (data: string | Object | ArrayBuffer) => void;

/**
 * 错误的callback
 */
type ErrorCallback = (error: HttpError) => void;

/**
 * 请求错误
 */
interface HttpError {
  code: number;
  errMsg: string;
}

/**
 * http请求拦截器
 */
interface HttpInterceptor {
  handleResponse(
    statusCode: number,
    data: string | Object | ArrayBuffer,
    callback: HttpCallback
  ): void;
}

/**
 * 默认的网络拦截器
 */
class DefaultHttpInterceptor implements HttpInterceptor {
  private readonly CODE_SUCCESS: number = 200;
  public constructor() { }

  handleResponse(statusCode: number,
    data: string | Object | ArrayBuffer,
    callback: HttpCallback) {
    let error: ServerError;
    if (statusCode == this.CODE_SUCCESS) {
      callback.onSuccess(data);
      return;
    }

    error = new ServerError(statusCode, data, callback.onServerError);
    error.processError();
  }
}

// 默认回调
export class DefaultCallback implements HttpCallback {
  onSuccess: SuccessCallback;
  onServerError: ErrorCallback;
  onNetworkError: ErrorCallback;

  constructor(success: SuccessCallback, serverError?: ErrorCallback, networkError?: ErrorCallback) {
    this.onSuccess = success;

    if (serverError) {
      this.onServerError = serverError;
    } else {
      this.onServerError = error => {
        console.error(error.errMsg);
      };
    }

    if (networkError) {
      this.onNetworkError = networkError;
    } else {
      this.onNetworkError = error => {
        console.error(error.errMsg);
      };
    }
  }
}

/**
 * 服务器返回错误，如401,500等
 */
class ServerError implements HttpError {
  private readonly ERROR_CODE_UNAUTH: number = 401;
  private readonly ERROR_CODE_SERVER_ERROR: number = 500;

  code: number;
  errMsg: string;
  callback: ErrorCallback;
  constructor(code: number, data: any, callback: { (error: HttpError): void }) {
    this.code = code;
    this.errMsg = data.msg;
    this.callback = callback;
  }

  /**
   * 网络请求错误处理
   * @param callback
   */
  processError() {
    console.error('error code: ' + this.code + ', error message: ' + this.errMsg);
    if (this.code == this.ERROR_CODE_UNAUTH) {
      // 处理401未认证错误
    } else if (this.code >= this.ERROR_CODE_SERVER_ERROR) {
      // 处理500服务器返回错误
    } else {
      // 处理未知错误
    }
  }
}

/**
 * 网络请求客户端
 */
class HttpClient {
  private static readonly host: string = 'http://127.0.0.1:8686';
  private static instance: HttpClient;
  private DefaultInterceptor: HttpInterceptor;
  private constructor() {
    this.DefaultInterceptor = new DefaultHttpInterceptor();
  }

  /**
   * 单例
   */
  public static getInstance(): HttpClient {
    if (!this.instance) {
      this.instance = new HttpClient();
    }

    return this.instance;
  }

  /**
   * 网络请求方法
   * @param request 网络请求元素
   * @param callback 请求回调
   * @param interceptor 自定义拦截器
   */
  public request(request: HttpRequest, callback: DefaultCallback, interceptor?: HttpInterceptor) {
    let method = request.method === undefined ? 'GET' : request.method;
    wx.request({
      url: this.buildUrl(request.url),
      data: request.data,
      method: method,
      header: this.buildHeader(method, request.token),
      success: res => {
        console.log(res);
        if (interceptor) {
          interceptor.handleResponse(res.statusCode, res.data, callback);
        } else {
          this.DefaultInterceptor.handleResponse(res.statusCode, res.data, callback);
        }
      },
      fail: (err) => {
        console.log(err);
        if (callback.onNetworkError) {
          callback.onNetworkError(err as HttpError);
        }
      },
    });
  }

  /**
   * 构建header
   * @param method
   * @param needToken
   */
  private buildHeader(method: HttpMethod, needToken = false): Object {
    let contentType: string;
    if (method == 'GET') {
      contentType = '';
    } else {
      contentType = '';
    }

    return {
      contentType: contentType,
      token: needToken ? 'token' : '',
    };
  }

  /**
   * 构建url
   * @param url
   */
  private buildUrl(url: string): string {
    return HttpClient.host + url;
  }
}

export const Api = HttpClient.getInstance();

// import { Api, DefaultCallback } from '../../utils/request';
// Api.request({
//   url: '/api/login',
//   method: 'POST',
//   data: {
//     password: 'ng201212',
//     username: 'nggaox',
//   },
// }, new DefaultCallback(data = > {
//   console.log(data);
// }));
// 二、使用Promise封装
// request.ts

// const baseURL = 'http://127.0.0.1:8686/api/';

// const request = (url: string, params: { method?: string; data?: any; header?: object }) => {
//   return new Promise(function (resolve, reject) {
//     let header = {
//       'content-type': 'application/json',
//     };
//     wx.request({
//       method: params.method === undefined ? 'GET' : params.method,
//       url: baseURL + url,
//       data: params.data,
//       header: Object.assign(header, params.header),
//       success(res) {
//         if (res.statusCode == 200) {
//           //请求成功
//           resolve(res);
//         } else {
//           //其他异常
//           reject(res.data.msg);
//         }
//       },
//       fail(err) {
//         //请求失败
//         reject(err.errMsg);
//       },
//     });
//   });
// };

// export default request;