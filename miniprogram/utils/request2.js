"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = exports.DefaultCallback = void 0;
var DefaultHttpInterceptor = (function () {
    function DefaultHttpInterceptor() {
        this.CODE_SUCCESS = 200;
    }
    DefaultHttpInterceptor.prototype.handleResponse = function (statusCode, data, callback) {
        var error;
        if (statusCode == this.CODE_SUCCESS) {
            callback.onSuccess(data);
            return;
        }
        error = new ServerError(statusCode, data, callback.onServerError);
        error.processError();
    };
    return DefaultHttpInterceptor;
}());
var DefaultCallback = (function () {
    function DefaultCallback(success, serverError, networkError) {
        this.onSuccess = success;
        if (serverError) {
            this.onServerError = serverError;
        }
        else {
            this.onServerError = function (error) {
                console.error(error.errMsg);
            };
        }
        if (networkError) {
            this.onNetworkError = networkError;
        }
        else {
            this.onNetworkError = function (error) {
                console.error(error.errMsg);
            };
        }
    }
    return DefaultCallback;
}());
exports.DefaultCallback = DefaultCallback;
var ServerError = (function () {
    function ServerError(code, data, callback) {
        this.ERROR_CODE_UNAUTH = 401;
        this.ERROR_CODE_SERVER_ERROR = 500;
        this.code = code;
        this.errMsg = data.msg;
        this.callback = callback;
    }
    ServerError.prototype.processError = function () {
        console.error('error code: ' + this.code + ', error message: ' + this.errMsg);
        if (this.code == this.ERROR_CODE_UNAUTH) {
        }
        else if (this.code >= this.ERROR_CODE_SERVER_ERROR) {
        }
        else {
        }
    };
    return ServerError;
}());
var HttpClient = (function () {
    function HttpClient() {
        this.DefaultInterceptor = new DefaultHttpInterceptor();
    }
    HttpClient.getInstance = function () {
        if (!this.instance) {
            this.instance = new HttpClient();
        }
        return this.instance;
    };
    HttpClient.prototype.buildHeader = function (method, needToken) {
        if (needToken === void 0) { needToken = false; }
        var contentType;
        if (method == 'GET') {
            contentType = '';
        }
        else {
            contentType = '';
        }
        return {
            contentType: contentType,
            token: needToken ? 'token' : '',
        };
    };
    HttpClient.prototype.buildUrl = function (url) {
        return HttpClient.host + url;
    };
    HttpClient.prototype.request = function (request, callback, interceptor) {
        var _this = this;
        var method = request.method === undefined ? 'GET' : request.method;
        wx.request({
            url: this.buildUrl(request.url),
            data: request.data,
            method: method,
            header: this.buildHeader(method, request.token),
            success: function (res) {
                console.log(res);
                if (interceptor) {
                    interceptor.handleResponse(res.statusCode, res.data, callback);
                }
                else {
                    _this.DefaultInterceptor.handleResponse(res.statusCode, res.data, callback);
                }
            },
            fail: function (err) {
                console.log(err);
                if (callback.onNetworkError) {
                    callback.onNetworkError(err);
                }
            },
        });
    };
    HttpClient.host = 'http://127.0.0.1:8686';
    return HttpClient;
}());
exports.Api = HttpClient.getInstance();
var METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};
var extend_1 = require("extend");
var blueimp_md5_1 = require("blueimp-md5");
var simple_console_log_level_1 = require("simple-console-log-level");
var weapp_simple_storage_1 = require("weapp-simple-storage");
var BackendApi = (function () {
    function BackendApi(apiConfig, defaultRequestOptions, loggerLevel) {
        if (apiConfig === void 0) { apiConfig = {}; }
        if (defaultRequestOptions === void 0) { defaultRequestOptions = {}; }
        if (loggerLevel === void 0) { loggerLevel = simple_console_log_level_1.default.LEVEL_WARN; }
        this.apiConfig = apiConfig;
        this.defaultRequestOptions = defaultRequestOptions;
        this.sending = {};
        this.loading = false;
        this.stalled = [];
        this.logger = new simple_console_log_level_1.default({
            level: loggerLevel,
            prefix: '[backend-api]'
        });
    }
    BackendApi.prototype.addApiConfig = function (namespace, apiConfig) {
        var _apiConfig;
        if (arguments.length === 1) {
            _apiConfig = namespace;
        }
        else {
            if (namespace) {
                _apiConfig = {};
                for (var name in apiConfig) {
                    _apiConfig[namespace + '.' + name] = apiConfig[name];
                }
            }
            else {
                _apiConfig = apiConfig;
            }
        }
        for (var name in _apiConfig) {
            if (this.apiConfig[name]) {
                this.logger.warn('覆盖了接口的配置', name, _apiConfig[name], this.apiConfig[name]);
            }
        }
        extend_1.default(this.apiConfig, _apiConfig);
        return this;
    };
    BackendApi.prototype.beforeSend = function (requestOptions) { };
    BackendApi.prototype.afterSend = function (requestOptions, requestResult) { };
    BackendApi.prototype.sendRequest = function (name, options, namespace) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (namespace === void 0) { namespace = ''; }
        if (this.loading) {
            var dfd = new Deferred();
            this.stalled.push(dfd);
            return dfd.then(function () {
                var requestOptions = _this._getRequestOptions(name, options, namespace);
                return _this.$sendHttpRequest(requestOptions);
            });
        }
        else {
            var requestOptions = this._getRequestOptions(name, options, namespace);
            return this.$sendHttpRequest(requestOptions);
        }
    };
    BackendApi.prototype.loadApiConfig = function (requestOptions) {
        var _this = this;
        this.loading = true;
        return this.$sendHttpRequest(requestOptions).then(function (_a) {
            var data = _a[0], requestResult = _a[1];
            _this.addApiConfig(data);
            _this.stalled.forEach(function (dfd) {
                dfd.resolve();
            });
            _this.stalled.length = 0;
            _this.loading = false;
            return [data, requestResult];
        }, function () {
            _this.loading = false;
        });
    };
    BackendApi.prototype.$sendHttpRequest = function (requestOptions) {
        return new Promise(function (resolve, reject) {
            reject('需要子类去实现发送 HTTP 请求');
        });
    };
    BackendApi.prototype._getRequestOptions = function (name, options, namespace) {
        var api;
        if (name) {
            var _name = name;
            var urlAppend = '';
            var slashIndex = name.indexOf('/');
            if (slashIndex != -1) {
                _name = name.substring(0, slashIndex);
                urlAppend = name.substring(slashIndex);
            }
            if (namespace) {
                _name = namespace + '.' + _name;
            }
            var _api = this.apiConfig[_name];
            if (_api) {
                api = extend_1.default(true, {}, _api);
                api.url = api.url + urlAppend;
            }
            else {
                this.logger.warn('没有找到对应的接口配置', _name, this.apiConfig);
            }
        }
        else {
            this.logger.warn('没有配置接口', options);
        }
        return extend_1.default(true, {}, this.defaultRequestOptions, api, options);
    };
    BackendApi.prototype.normalizeRequestResult = function (requestOptions, requestResult) {
        return requestResult;
    };
    return BackendApi;
}());
var Deferred = (function () {
    function Deferred() {
        var _this = this;
        this._state = 'pending';
        this._resolve = null;
        this._reject = null;
        this._promise = new Promise(function (resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
        });
    }
    Deferred.prototype.state = function () {
        return this._state;
    };
    Deferred.prototype.promise = function () {
        return this._promise;
    };
    Deferred.prototype.then = function (onFulfilled, onRejected) {
        return this._promise.then(onFulfilled, onRejected);
    };
    Deferred.prototype.resolve = function (value) {
        this._resolve(value);
        this._state = 'fulfilled';
    };
    Deferred.prototype.reject = function (reason) {
        this._reject(reason);
        this._state = 'rejected';
    };
    return Deferred;
}());
var WeappBackendApi = (function (_super) {
    __extends(WeappBackendApi, _super);
    function WeappBackendApi(apiConfig, defaultRequestOptions, loggerLevel) {
        if (defaultRequestOptions === void 0) { defaultRequestOptions = WeappBackendApi.defaults.requestOptions; }
        var _this = _super.call(this, apiConfig, defaultRequestOptions, loggerLevel) || this;
        _this.simpleStorage = new weapp_simple_storage_1.default({
            name: 'backend-api-cache',
            loggerLevel: loggerLevel
        });
        return _this;
    }
    WeappBackendApi.prototype.beforeSend = function (requestOptions) {
        var cachedRequestResult = this.simpleStorage.get(this._getRequestInfoHash(requestOptions));
        if (this._isSending(requestOptions) && requestOptions._interceptDuplicateRequest) {
            return this._interceptDuplicateRequest(requestOptions);
        }
        else if (cachedRequestResult) {
            this.logger.log('----------------------');
            this.logger.log('from cache');
            this.logger.log('----------------------');
            return Promise.resolve(cachedRequestResult);
        }
        else {
            this._showLoading(requestOptions);
        }
    };
    WeappBackendApi.prototype._interceptDuplicateRequest = function (requestOptions) {
        var requestInfoHash = this._getRequestInfoHash(requestOptions);
        this.logger.warn('拦截到重复请求', requestInfoHash, this.sending[requestInfoHash], this.sending);
        this.logger.warn('----------------------');
        return new Promise(function () { });
    };
    WeappBackendApi.prototype.afterSend = function (requestOptions, requestResult) {
        this._removeFromSending(requestOptions);
        if (!this._isAnySending(true)) {
            this._hideLoading(requestOptions);
        }
    };
    WeappBackendApi.prototype._showLoading = function (requestOptions) {
        if (requestOptions._showLoading !== false) {
            wx.showLoading({
                icon: 'loading',
                title: WeappBackendApi.defaults.LOADING_MESSAGE,
                mask: requestOptions._showLoadingMask
            });
        }
        wx.showNavigationBarLoading();
    };
    WeappBackendApi.prototype._hideLoading = function (requestOptions) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
    };
    WeappBackendApi.prototype.$sendHttpRequest = function (requestOptions) {
        var _this = this;
        requestOptions._url = requestOptions.url;
        var promise = null;
        var beforeSendResult = this.beforeSend(requestOptions);
        if (beforeSendResult) {
            promise = beforeSendResult;
        }
        else {
            promise = new Promise(function (resolve, reject) {
                requestOptions.success = function (requestResult) {
                    var isHttpRequestSuccess = requestResult.statusCode >= 200 && requestResult.statusCode < 300 || requestResult.statusCode === 304;
                    if (isHttpRequestSuccess) {
                        resolve(requestResult);
                    }
                    else {
                        reject(requestResult);
                    }
                };
                requestOptions.fail = function (requestResult) {
                    reject(requestResult);
                };
                if (requestOptions._type === 'uploadFile') {
                    wx.uploadFile(requestOptions);
                }
                else {
                    wx.request(requestOptions);
                }
                _this._addToSending(requestOptions);
            });
        }
        return promise.then(function (requestResult) {
            _this.afterSend(requestOptions, requestResult);
            return _this._successHandler(requestOptions, requestResult);
        }, function (requestResult) {
            _this.afterSend(requestOptions, requestResult);
            return _this._failHandler(requestOptions, requestResult);
        });
    };
    WeappBackendApi.prototype._getRequestInfoHash = function (requestOptions) {
        var data = '';
        if (requestOptions.data) {
            try {
                data = JSON.stringify(requestOptions.data);
            }
            catch (error) {
                data = requestOptions.data.toString();
                this.logger.warn('获取一个请求数据的 JSON 字符串失败', requestOptions.data, error);
            }
        }
        var requestInfo = requestOptions.method + ' ' + requestOptions._url + ' ' + data;
        var requestInfoHash = requestInfo;
        try {
            requestInfoHash = blueimp_md5_1.default(requestInfo);
        }
        catch (error) {
            this.logger.warn('获取一个请求的关键信息的 MD5 失败', requestInfo, error);
        }
        return requestInfoHash;
    };
    WeappBackendApi.prototype._addToSending = function (requestOptions) {
        this.sending[this._getRequestInfoHash(requestOptions)] = requestOptions;
    };
    WeappBackendApi.prototype._removeFromSending = function (requestOptions) {
        var requestInfoHash = this._getRequestInfoHash(requestOptions);
        var result = delete this.sending[requestInfoHash];
        if (!result) {
            this.logger.warn('将请求从发送中的队列中移除失败', requestInfoHash, requestOptions);
        }
    };
    WeappBackendApi.prototype._isSending = function (requestOptions) {
        return this.sending.hasOwnProperty(this._getRequestInfoHash(requestOptions));
    };
    WeappBackendApi.prototype._isAnySending = function (excludeNoLoading) {
        var sendingCount = 0;
        if (excludeNoLoading) {
            for (var key in this.sending) {
                var requestOptions = this.sending[key];
                if (requestOptions._showLoading !== false) {
                    sendingCount += 1;
                }
            }
        }
        else {
            sendingCount = Object.keys(this.sending).length;
        }
        return sendingCount !== 0;
    };
    WeappBackendApi.prototype._successHandler = function (requestOptions, requestResult) {
        this._normalizeRequestResult(requestOptions, requestResult);
        var result = requestResult.data;
        if (this._ifApiSuccess(requestOptions, requestResult)) {
            this.logger.log(requestOptions.method, requestOptions.url, requestOptions.data, requestOptions, requestResult);
            this.logger.log('----------------------');
            if (requestOptions._cacheTtl >= 0) {
                var requestInfoHash = this._getRequestInfoHash(requestOptions);
                if (!this.simpleStorage.has(requestInfoHash)) {
                    this.simpleStorage.set(requestInfoHash, requestResult, {
                        ttl: requestOptions._cacheTtl
                    });
                }
            }
            return [
                result ? result.data : result,
                requestResult
            ];
        }
        else {
            if (!result) {
                requestResult.data = result = {};
            }
            result._errorType = 'B';
            return this.commonFailStatusHandler(requestOptions, requestResult);
        }
    };
    WeappBackendApi.prototype._failHandler = function (requestOptions, requestResult) {
        var result = {};
        if (typeof requestResult.statusCode != 'undefined') {
            result = {
                status: requestResult.statusCode,
                _errorType: 'H',
                statusInfo: {
                    message: WeappBackendApi.defaults.REQUEST_HTTP_FAIL_MESSAGE,
                    detail: {
                        requestOptions: requestOptions,
                        requestResult: requestResult.statusCode
                    }
                }
            };
        }
        else {
            var message = WeappBackendApi.defaults.REQUEST_API_FAIL_MESSAGE;
            var status = WeappBackendApi.defaults.REQUEST_API_FAIL_STATUS;
            if (requestResult.errMsg) {
                var errMsgDetail = requestResult.errMsg.replace('request:fail ', '');
                if (errMsgDetail) {
                    message = errMsgDetail;
                    status = errMsgDetail.charCodeAt(0);
                }
            }
            result = {
                status: status,
                _errorType: 'A',
                statusInfo: {
                    message: message,
                    detail: {
                        errMsg: requestResult.errMsg
                    }
                }
            };
        }
        requestResult.data = result;
        return this.commonFailStatusHandler(requestOptions, requestResult);
    };
    WeappBackendApi.prototype._ifApiSuccess = function (requestOptions, requestResult) {
        var result = requestResult.data;
        var isApiSuccess = false;
        if (result) {
            isApiSuccess = !result.status || result.status == 0;
        }
        return isApiSuccess;
    };
    WeappBackendApi.prototype._normalizeRequestResult = function (requestOptions, requestResult) {
        var _normalizeRequestResult = requestOptions._normalizeRequestResult ?
            requestOptions._normalizeRequestResult : this.normalizeRequestResult;
        if (requestOptions._type === 'uploadFile') {
            try {
                requestResult.data = JSON.parse(requestResult.data);
            }
            catch (error) {
                this.logger.warn('解析 wx.uploadFile 返回的数据出错', requestOptions, requestResult);
            }
        }
        var result = _normalizeRequestResult.apply(this, [requestOptions, requestResult.data]);
        requestResult.data = result;
    };
    WeappBackendApi.prototype.commonFailStatusHandler = function (requestOptions, requestResult) {
        this.logger.warn("\u63A5\u53E3\u8C03\u7528\u51FA\u9519(" + this._getErrorCode(requestResult.data) + ")", requestOptions.method, requestOptions.url, requestOptions.data, requestOptions, requestResult);
        this.logger.warn('----------------------');
        this.failStatusHandler(requestOptions, requestResult);
        this.commonFailTip(requestOptions, requestResult);
        return Promise.reject(requestResult);
    };
    WeappBackendApi.prototype.failStatusHandler = function (requestOptions, requestResult) {
    };
    WeappBackendApi.prototype.commonFailTip = function (requestOptions, requestResult) {
        if (requestOptions._showFailTip !== false) {
            var message = this.getFailTipMessage(requestOptions, requestResult);
            var toastOptions = {
                icon: 'none',
                title: message
            };
            if (typeof requestOptions._showFailTipDuration !== 'undefined') {
                toastOptions.duration = requestOptions._showFailTipDuration;
            }
            wx.showToast(toastOptions);
        }
    };
    WeappBackendApi.prototype._getErrorCode = function (result) {
        return "" + result._errorType + (result.status ? result.status : '');
    };
    WeappBackendApi.prototype.getFailTipMessage = function (requestOptions, requestResult) {
        var result = requestResult.data;
        var message = (result.statusInfo && result.statusInfo.message) ?
            result.statusInfo.message : WeappBackendApi.defaults.FAIL_MESSAGE;
        return message + "\n(\u9519\u8BEF\u7801:" + this._getErrorCode(result) + ")";
    };
    return WeappBackendApi;
}(BackendApi));
WeappBackendApi.defaults = {
    LOADING_MESSAGE: '',
    FAIL_MESSAGE: '系统繁忙',
    REQUEST_HTTP_FAIL_MESSAGE: '请求超时，请重试',
    REQUEST_API_FAIL_STATUS: 1,
    REQUEST_API_FAIL_MESSAGE: '请求失败，请重试',
    requestOptions: {
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json'
    }
};
exports.default = WeappBackendApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdDIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXF1ZXN0Mi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBYUE7SUFFRTtRQURpQixpQkFBWSxHQUFXLEdBQUcsQ0FBQztJQUNyQixDQUFDO0lBRXhCLCtDQUFjLEdBQWQsVUFBZSxVQUFrQixFQUMvQixJQUFtQyxFQUNuQyxRQUFzQjtRQUN0QixJQUFJLEtBQWtCLENBQUM7UUFDdkIsSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLE9BQU87U0FDUjtRQUVELEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsRSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQUdEO0lBS0UseUJBQVksT0FBd0IsRUFBRSxXQUEyQixFQUFFLFlBQTRCO1FBQzdGLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBRXpCLElBQUksV0FBVyxFQUFFO1lBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7U0FDbEM7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBQSxLQUFLO2dCQUN4QixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUM7U0FDSDtRQUVELElBQUksWUFBWSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO1NBQ3BDO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQUEsS0FBSztnQkFDekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIs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Q0FBQyxDQUFDLEVBQUUsQ0FBRSxDQUFDO0lBQ3ZFLENBQUM7SUFhRCwyQ0FBaUIsR0FBakIsVUFBa0IsY0FBYyxFQUFFLGFBQWE7UUFDM0MsSUFBSSxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztRQUVoQyxJQUFJLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUVoRixPQUFVLE9BQU8sOEJBQVUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBRyxDQUFDO0lBQzdELENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUEzZUQsQ0FBOEIsVUFBVSxHQTJldkM7QUFFRCxlQUFlLENBQUMsUUFBUSxHQUFHO0lBQ3ZCLGVBQWUsRUFBRSxFQUFFO0lBRW5CLFlBQVksRUFBRSxNQUFNO0lBR3BCLHlCQUF5QixFQUFFLFVBQVU7SUFHckMsdUJBQXVCLEVBQUUsQ0FBQztJQUMxQix3QkFBd0IsRUFBRSxVQUFVO0lBR3BDLGNBQWMsRUFBRTtRQUNaLE1BQU0sRUFBRTtZQUNKLGNBQWMsRUFBRSxtQ0FBbUM7U0FDdEQ7UUFDRCxRQUFRLEVBQUUsTUFBTTtLQUNuQjtDQUNKLENBQUM7QUFFRixrQkFBZSxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEh0dHBJbnRlcmNlcHRvcixcclxuICBIdHRwTWV0aG9kLFxyXG4gIEh0dHBDYWxsYmFjayxcclxuICBTdWNjZXNzQ2FsbGJhY2ssXHJcbiAgSHR0cEVycm9yLFxyXG4gIEh0dHBSZXF1ZXN0LFxyXG4gIEVycm9yQ2FsbGJhY2tcclxufSBmcm9tIFwiLi9yZXF1ZXN0M1wiO1xyXG5cclxuLyoqXHJcbiAqIOm7mOiupOeahOe9kee7nOaLpuaIquWZqFxyXG4gKi9cclxuY2xhc3MgRGVmYXVsdEh0dHBJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBDT0RFX1NVQ0NFU1M6IG51bWJlciA9IDIwMDtcclxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgaGFuZGxlUmVzcG9uc2Uoc3RhdHVzQ29kZTogbnVtYmVyLFxyXG4gICAgZGF0YTogc3RyaW5nIHwgT2JqZWN0IHwgQXJyYXlCdWZmZXIsXHJcbiAgICBjYWxsYmFjazogSHR0cENhbGxiYWNrKSB7XHJcbiAgICBsZXQgZXJyb3I6IFNlcnZlckVycm9yO1xyXG4gICAgaWYgKHN0YXR1c0NvZGUgPT0gdGhpcy5DT0RFX1NVQ0NFU1MpIHtcclxuICAgICAgY2FsbGJhY2sub25TdWNjZXNzKGRhdGEpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZXJyb3IgPSBuZXcgU2VydmVyRXJyb3Ioc3RhdHVzQ29kZSwgZGF0YSwgY2FsbGJhY2sub25TZXJ2ZXJFcnJvcik7XHJcbiAgICBlcnJvci5wcm9jZXNzRXJyb3IoKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOm7mOiupOWbnuiwg1xyXG5leHBvcnQgY2xhc3MgRGVmYXVsdENhbGxiYWNrIGltcGxlbWVudHMgSHR0cENhbGxiYWNrIHtcclxuICBvblN1Y2Nlc3M6IFN1Y2Nlc3NDYWxsYmFjaztcclxuICBvblNlcnZlckVycm9yOiBFcnJvckNhbGxiYWNrO1xyXG4gIG9uTmV0d29ya0Vycm9yOiBFcnJvckNhbGxiYWNrO1xyXG5cclxuICBjb25zdHJ1Y3RvcihzdWNjZXNzOiBTdWNjZXNzQ2FsbGJhY2ssIHNlcnZlckVycm9yPzogRXJyb3JDYWxsYmFjaywgbmV0d29ya0Vycm9yPzogRXJyb3JDYWxsYmFjaykge1xyXG4gICAgdGhpcy5vblN1Y2Nlc3MgPSBzdWNjZXNzO1xyXG5cclxuICAgIGlmIChzZXJ2ZXJFcnJvcikge1xyXG4gICAgICB0aGlzLm9uU2VydmVyRXJyb3IgPSBzZXJ2ZXJFcnJvcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub25TZXJ2ZXJFcnJvciA9IGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLmVyck1zZyk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5ldHdvcmtFcnJvcikge1xyXG4gICAgICB0aGlzLm9uTmV0d29ya0Vycm9yID0gbmV0d29ya0Vycm9yO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vbk5ldHdvcmtFcnJvciA9IGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLmVyck1zZyk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbi8qKlxyXG4gKiDmnI3liqHlmajov5Tlm57plJnor6/vvIzlpoI0MDEsNTAw562JXHJcbiAqL1xyXG5jbGFzcyBTZXJ2ZXJFcnJvciBpbXBsZW1lbnRzIEh0dHBFcnJvciB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBFUlJPUl9DT0RFX1VOQVVUSDogbnVtYmVyID0gNDAxO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgRVJST1JfQ09ERV9TRVJWRVJfRVJST1I6IG51bWJlciA9IDUwMDtcclxuXHJcbiAgY29kZTogbnVtYmVyO1xyXG4gIGVyck1zZzogc3RyaW5nO1xyXG4gIGNhbGxiYWNrOiBFcnJvckNhbGxiYWNrO1xyXG4gIGNvbnN0cnVjdG9yKGNvZGU6IG51bWJlciwgZGF0YTogYW55LCBjYWxsYmFjazogeyAoZXJyb3I6IEh0dHBFcnJvcik6IHZvaWQgfSkge1xyXG4gICAgdGhpcy5jb2RlID0gY29kZTtcclxuICAgIHRoaXMuZXJyTXNnID0gZGF0YS5tc2c7XHJcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnvZHnu5zor7fmsYLplJnor6/lpITnkIZcclxuICAgKiBAcGFyYW0gY2FsbGJhY2tcclxuICAgKi9cclxuICBwcm9jZXNzRXJyb3IoKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdlcnJvciBjb2RlOiAnICsgdGhpcy5jb2RlICsgJywgZXJyb3IgbWVzc2FnZTogJyArIHRoaXMuZXJyTXNnKTtcclxuICAgIGlmICh0aGlzLmNvZGUgPT0gdGhpcy5FUlJPUl9DT0RFX1VOQVVUSCkge1xyXG4gICAgICAvLyDlpITnkIY0MDHmnKrorqTor4HplJnor69cclxuICAgIH0gZWxzZSBpZiAodGhpcy5jb2RlID49IHRoaXMuRVJST1JfQ09ERV9TRVJWRVJfRVJST1IpIHtcclxuICAgICAgLy8g5aSE55CGNTAw5pyN5Yqh5Zmo6L+U5Zue6ZSZ6K+vXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyDlpITnkIbmnKrnn6XplJnor69cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnvZHnu5zor7fmsYLlrqLmiLfnq69cclxuICovXHJcbmNsYXNzIEh0dHBDbGllbnQge1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGhvc3Q6IHN0cmluZyA9ICdodHRwOi8vMTI3LjAuMC4xOjg2ODYnO1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBIdHRwQ2xpZW50O1xyXG4gIHByaXZhdGUgRGVmYXVsdEludGVyY2VwdG9yOiBIdHRwSW50ZXJjZXB0b3I7XHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuRGVmYXVsdEludGVyY2VwdG9yID0gbmV3IERlZmF1bHRIdHRwSW50ZXJjZXB0b3IoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWNleS+i1xyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogSHR0cENsaWVudCB7XHJcbiAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBIdHRwQ2xpZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmnoTlu7poZWFkZXJcclxuICAgKiBAcGFyYW0gbWV0aG9kXHJcbiAgICogQHBhcmFtIG5lZWRUb2tlblxyXG4gICAqL1xyXG4gIHByaXZhdGUgYnVpbGRIZWFkZXIobWV0aG9kOiBIdHRwTWV0aG9kLCBuZWVkVG9rZW4gPSBmYWxzZSk6IE9iamVjdCB7XHJcbiAgICBsZXQgY29udGVudFR5cGU6IHN0cmluZztcclxuICAgIGlmIChtZXRob2QgPT0gJ0dFVCcpIHtcclxuICAgICAgY29udGVudFR5cGUgPSAnJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnRlbnRUeXBlID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlLFxyXG4gICAgICB0b2tlbjogbmVlZFRva2VuID8gJ3Rva2VuJyA6ICcnLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaehOW7unVybFxyXG4gICAqIEBwYXJhbSB1cmxcclxuICAgKi9cclxuICBwcml2YXRlIGJ1aWxkVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBIdHRwQ2xpZW50Lmhvc3QgKyB1cmw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnvZHnu5zor7fmsYLmlrnms5VcclxuICAgKiBAcGFyYW0gcmVxdWVzdCDnvZHnu5zor7fmsYLlhYPntKBcclxuICAgKiBAcGFyYW0gY2FsbGJhY2sg6K+35rGC5Zue6LCDXHJcbiAgICogQHBhcmFtIGludGVyY2VwdG9yIOiHquWumuS5ieaLpuaIquWZqFxyXG4gICAqL1xyXG4gIHB1YmxpYyByZXF1ZXN0KFxyXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3QsXHJcbiAgICBjYWxsYmFjazogRGVmYXVsdENhbGxiYWNrLFxyXG4gICAgaW50ZXJjZXB0b3I/OiBIdHRwSW50ZXJjZXB0b3JcclxuICApIHtcclxuICAgIGxldCBtZXRob2QgPSByZXF1ZXN0Lm1ldGhvZCA9PT0gdW5kZWZpbmVkID8gJ0dFVCcgOiByZXF1ZXN0Lm1ldGhvZDtcclxuICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6IHRoaXMuYnVpbGRVcmwocmVxdWVzdC51cmwpLFxyXG4gICAgICBkYXRhOiByZXF1ZXN0LmRhdGEsXHJcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICBoZWFkZXI6IHRoaXMuYnVpbGRIZWFkZXIobWV0aG9kLCByZXF1ZXN0LnRva2VuKSxcclxuICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgIGlmIChpbnRlcmNlcHRvcikge1xyXG4gICAgICAgICAgaW50ZXJjZXB0b3IuaGFuZGxlUmVzcG9uc2UocmVzLnN0YXR1c0NvZGUsIHJlcy5kYXRhLCBjYWxsYmFjayk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuRGVmYXVsdEludGVyY2VwdG9yLmhhbmRsZVJlc3BvbnNlKHJlcy5zdGF0dXNDb2RlLCByZXMuZGF0YSwgY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZmFpbDogKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrLm9uTmV0d29ya0Vycm9yKSB7XHJcbiAgICAgICAgICBjYWxsYmFjay5vbk5ldHdvcmtFcnJvcihlcnIgYXMgSHR0cEVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBBcGkgPSBIdHRwQ2xpZW50LmdldEluc3RhbmNlKCk7XHJcblxyXG4vLyBpbXBvcnQgeyBBcGksIERlZmF1bHRDYWxsYmFjayB9IGZyb20gJy4uLy4uL3V0aWxzL3JlcXVlc3QnO1xyXG4vLyBBcGkucmVxdWVzdCh7XHJcbi8vICAgdXJsOiAnL2FwaS9sb2dpbicsXHJcbi8vICAgbWV0aG9kOiAnUE9TVCcsXHJcbi8vICAgZGF0YToge1xyXG4vLyAgICAgcGFzc3dvcmQ6ICduZzIwMTIxMicsXHJcbi8vICAgICB1c2VybmFtZTogJ25nZ2FveCcsXHJcbi8vICAgfSxcclxuLy8gfSwgbmV3IERlZmF1bHRDYWxsYmFjayhkYXRhID0gPiB7XHJcbi8vICAgY29uc29sZS5sb2coZGF0YSk7XHJcbi8vIH0pKTtcclxuXHJcbi8vIDYvMTQg566A5Lmm5Y+R546wXHJcbmNvbnN0IE1FVEhPRCA9IHtcclxuICBHRVQ6ICdHRVQnLFxyXG4gIFBPU1Q6ICdQT1NUJyxcclxuICBQVVQ6ICdQVVQnLFxyXG4gIERFTEVURTogJ0RFTEVURSdcclxufVxyXG4vLyA2LzE0LGdpdGh1YuWPkeeOsFxyXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCc7XHJcbmltcG9ydCBtZDUgZnJvbSAnYmx1ZWltcC1tZDUnO1xyXG5pbXBvcnQgTG9nZ2VyIGZyb20gJ3NpbXBsZS1jb25zb2xlLWxvZy1sZXZlbCc7XHJcblxyXG5pbXBvcnQgU2ltcGxlU3RvcmFnZSBmcm9tICd3ZWFwcC1zaW1wbGUtc3RvcmFnZSc7XHJcblxyXG4vKipcclxuICog57uf5LiA5bCB6KOF5ZCO56uv5o6l5Y+j55qE6LCD55SoXHJcbiAqIFxyXG4gKiAtIOmbhuS4remFjee9ruaOpeWPo1xyXG4gKiAtIOe7n+S4gOWPkemAgeivt+axglxyXG4gKiAtIOe7n+S4gOWkhOeQhuivt+axgueahOi/lOWbnlxyXG4gKiAtIOe7n+S4gOmAgumFjeivt+axgui/lOWbnueahOaVsOaNruagvOW8j1xyXG4gKiAtIOe7n+S4gOW8guW4uOWkhOeQhlxyXG4gKiAtIOmihOeVmeaJqeWxleeCuVxyXG4gKiBcclxuICog5q2k57G75piv5oq96LGh57G7LCDlhbbku5blubPlj7Dnu6fmib/mraTnsbvmnaXlrp7njrDlhbfkvZPlj5HpgIHor7fmsYLnmoTlip/og71cclxuICog5L6L5aaCOlxyXG4gKiBCYWNrZW5kQXBpIC0+IFdlYXBwQmFja2VuZEFwaSjlvq7kv6HlsI/nqIvluo/lubPlj7DnmoTlsIHoo4UpXHJcbiAqICAgICAgICAgICAgLT4gV2ViJEJhY2tlbmRBcGkoV2Vi5bmz5Y+wLCDln7rkuo5qUXVlcnkvWmVwdG/nmoTlsIHoo4UpXHJcbiAqL1xyXG5jbGFzcyBCYWNrZW5kQXBpIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGFwaUNvbmZpZyDlkI7nq68gSFRUUCDmjqXlj6PnmoTphY3nva4sIOWwhiBIVFRQIOaOpeWPo+eahOiwg+eUqOinhuS4uuS4gOasoei/nOeoi+iwg+eUqChSUEMpXHJcbiAgICAgKiAgICAgICAg6YWN572u6aG55piv5o6l5Y+j5ZCN56ew5ZKM6K+35rGC5Y+C5pWw55qE5pig5bCEXHJcbiAgICAgKiAgICAgICAg5L6L5aaCXHJcbiAgICAgKiAgICAgICAgYGBgamF2YXNjcmlwdFxyXG4gICAgICogICAgICAgIHtcclxuICAgICAqICAgICAgICAgICAgJ2dldExpc3QnOiB7XHJcbiAgICAgKiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICogICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kb21haW4uY29tL2xpc3QnXHJcbiAgICAgKiAgICAgICAgICAgIH0sXHJcbiAgICAgKiAgICAgICAgICAgICdnZXREZXRhaWwnOiB7XHJcbiAgICAgKiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICogICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kb21haW4uY29tL2RldGFpbCdcclxuICAgICAqICAgICAgICAgICAgfVxyXG4gICAgICogICAgICAgIH1cclxuICAgICAqICAgICAgICBgYGBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkZWZhdWx0UmVxdWVzdE9wdGlvbnMg6buY6K6k55qE6K+35rGC5Y+C5pWwXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbG9nZ2VyTGV2ZWwg5pel5b+X57qn5YirLCDpu5jorqTkuLogTG9nZ2VyLkxFVkVMX1dBUk4g57qn5YirXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgVE9ETzog5aaC5p6c5b6u5L+h5bCP56iL5bqP5pSv5oyB6I635Y+W5b2T5YmN6L+Q6KGM55qE54mI5pysKOW8gOWPkeeJiC/kvZPpqozniYgv57q/5LiK54mIKSxcclxuICAgICAqICAgICAgICAgICAgICAgICDpgqPkuYjml6Xlv5fnuqfliKvnmoTpu5jorqTlgLzlj6/ku6XmoLnmja7ov5DooYznmoTniYjmnKzmnaXliKTmlq0sIOmdnue6v+S4iueJiOacrOiHquWKqOS4uiBUUkFDRSDnuqfliKtcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYXBpQ29uZmlnID0ge30sIGRlZmF1bHRSZXF1ZXN0T3B0aW9ucyA9IHt9LCBsb2dnZXJMZXZlbCA9IExvZ2dlci5MRVZFTF9XQVJOKSB7XHJcbiAgICAgICAgdGhpcy5hcGlDb25maWcgPSBhcGlDb25maWc7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0UmVxdWVzdE9wdGlvbnMgPSBkZWZhdWx0UmVxdWVzdE9wdGlvbnM7XHJcblxyXG4gICAgICAgIC8vIOato+WcqOWPkemAgeeahOivt+axglxyXG4gICAgICAgIHRoaXMuc2VuZGluZyA9IHt9O1xyXG5cclxuICAgICAgICAvLyDmmK/lkKblnKjliqDovb3mjqXlj6PphY3nva5cclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAvLyDnrYnlvoXlj5HpgIHnmoTor7fmsYJcclxuICAgICAgICB0aGlzLnN0YWxsZWQgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBuZXcgTG9nZ2VyKHtcclxuICAgICAgICAgICAgbGV2ZWw6IGxvZ2dlckxldmVsLFxyXG4gICAgICAgICAgICBwcmVmaXg6ICdbYmFja2VuZC1hcGldJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg5LiA57uE5ZCO56uvIEhUVFAg5o6l5Y+j55qE6YWN572uXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgb2JqZWN0fSBbbmFtZXNwYWNlXSDnu5nmjqXlj6PlkI3mt7vliqAgbmFtZXNwYWNlLCDkvovlpoI6IOe7mSAnZ2V0VXNlcicg5re75YqgICd1c2VyJyDnmoQgbmFtZXNwYWNlLCDmjqXlj6PlkI3kvJrlj5jkuLogJ3VzZXIuZ2V0VXNlcic7IOWmguaenOWPguaVsOS4uiBvYmplY3Qg57G75Z6LLCDliJnooajnpLrnm7TmjqXmt7vliqDmjqXlj6PphY3nva4sIOS4jeiuvue9riBuYW1lc3BhY2VcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhcGlDb25maWdcclxuICAgICAqIEByZXR1cm4ge0JhY2tlbmRBcGl9IHRoaXNcclxuICAgICAqL1xyXG4gICAgYWRkQXBpQ29uZmlnKG5hbWVzcGFjZSwgYXBpQ29uZmlnKSB7XHJcbiAgICAgICAgdmFyIF9hcGlDb25maWc7XHJcblxyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIF9hcGlDb25maWcgPSBuYW1lc3BhY2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKG5hbWVzcGFjZSkge1xyXG4gICAgICAgICAgICAgICAgX2FwaUNvbmZpZyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBhcGlDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBfYXBpQ29uZmlnW25hbWVzcGFjZSArICcuJyArIG5hbWVdID0gYXBpQ29uZmlnW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX2FwaUNvbmZpZyA9IGFwaUNvbmZpZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5Y+v6IO95a2Y5Zyo6KaG55uW5o6l5Y+j6YWN572u55qE5oOF5Ya1XHJcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBfYXBpQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFwaUNvbmZpZ1tuYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIud2Fybign6KaG55uW5LqG5o6l5Y+j55qE6YWN572uJywgbmFtZSwgX2FwaUNvbmZpZ1tuYW1lXSwgdGhpcy5hcGlDb25maWdbbmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHRlbmQodGhpcy5hcGlDb25maWcsIF9hcGlDb25maWcpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R6YCB6K+35rGC5YmN55qE57uf5LiA5aSE55CGXHJcbiAgICAgKiBcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlcXVlc3RPcHRpb25zXHJcbiAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR8UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgYmVmb3JlU2VuZChyZXF1ZXN0T3B0aW9ucykge31cclxuICAgIC8qKlxyXG4gICAgICog6K+35rGC57uT5p2f5ZCO55qE57uf5LiA5aSE55CGXHJcbiAgICAgKiBcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlcXVlc3RPcHRpb25zXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVxdWVzdFJlc3VsdFxyXG4gICAgICovXHJcbiAgICBhZnRlclNlbmQocmVxdWVzdE9wdGlvbnMsIHJlcXVlc3RSZXN1bHQpIHt9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog57uf5LiA5Y+R6YCBKOaOpeWPoynor7fmsYLnmoTmlrnms5VcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5o6l5Y+j55qE5ZCN56ewXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnM9e31dIOivt+axguWPguaVsFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lc3BhY2U9JyddIOaOpeWPo+WQjeeahCBuYW1lc3BhY2VcclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XHJcbiAgICAgKi9cclxuICAgIHNlbmRSZXF1ZXN0KG5hbWUsIG9wdGlvbnMgPSB7fSwgbmFtZXNwYWNlID0gJycpIHtcclxuICAgICAgICAvLyDlpoLmnpzov5jlnKjliqDovb3mjqXlj6PphY3nva4sIOWImeW7tui/n+aJp+ihjOaOpeWPo+eahOivt+axglxyXG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGRmZCA9IG5ldyBEZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWxsZWQucHVzaChkZmQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRmZC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0T3B0aW9ucyA9IHRoaXMuX2dldFJlcXVlc3RPcHRpb25zKG5hbWUsIG9wdGlvbnMsIG5hbWVzcGFjZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc2VuZEh0dHBSZXF1ZXN0KHJlcXVlc3RPcHRpb25zKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHJlcXVlc3RPcHRpb25zID0gdGhpcy5fZ2V0UmVxdWVzdE9wdGlvbnMobmFtZSwgb3B0aW9ucywgbmFtZXNwYWNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNlbmRIdHRwUmVxdWVzdChyZXF1ZXN0T3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295ZCO56uvIEhUVFAg5o6l5Y+j55qE6YWN572uXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0T3B0aW9ucyDor7fmsYLlj4LmlbBcclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XHJcbiAgICAgKi9cclxuICAgIGxvYWRBcGlDb25maWcocmVxdWVzdE9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRzZW5kSHR0cFJlcXVlc3QocmVxdWVzdE9wdGlvbnMpLnRoZW4oKFtkYXRhLCByZXF1ZXN0UmVzdWx0XSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEFwaUNvbmZpZyhkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIC8vIOa/gOa0u+etieW+heWPkemAgeeahOivt+axglxyXG4gICAgICAgICAgICB0aGlzLnN0YWxsZWQuZm9yRWFjaChmdW5jdGlvbihkZmQpIHtcclxuICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWxsZWQubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFtkYXRhLCByZXF1ZXN0UmVzdWx0XTtcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R6YCBIEhUVFAg6K+35rGC55qE5YW35L2T5a6e546wXHJcbiAgICAgKiBcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlcXVlc3RPcHRpb25zIOivt+axguWPguaVsFxyXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgJHNlbmRIdHRwUmVxdWVzdChyZXF1ZXN0T3B0aW9ucykge1xyXG4gICAgICAgIC8vIOWtkOexu+WFt+S9k+WOu+WunueOsFxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgcmVqZWN0KCfpnIDopoHlrZDnsbvljrvlrp7njrDlj5HpgIEgSFRUUCDor7fmsYInKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluivt+axgueahOWPguaVsFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmjqXlj6PnmoTlkI3np7AsIOaXoumFjee9ruWcqCBgYXBpQ29uZmlnYCDkuK3nmoQga2V5XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICDpkojlr7nmjqXlj6MgVVJMIOS4reaciSBwYXRoIOWPguaVsOeahOaDheWGtSwg6ZyA6KaB5ZyoIG5hbWUg5Lit5Yqg5YWl5pac5p2g5p2l5qCH6K+GLFxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAg5aaC5p6c5LiN5L2/55So6L+Z5Liq5Y+C5pWwLCDkuZ/lj6/ku6Xlj5Hor7fmsYIsIOS9huS4jeaOqOiNkOi/meS5iOS9v+eUqCwg5bqU6K+l5bCG5omA5pyJ5o6l5Y+j6YO96YWN572u5aW9XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyDor7fmsYLlj4LmlbBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2Ug5o6l5Y+j5ZCN55qEIG5hbWVzcGFjZVxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBfZ2V0UmVxdWVzdE9wdGlvbnMobmFtZSwgb3B0aW9ucywgbmFtZXNwYWNlKSB7XHJcbiAgICAgICAgdmFyIGFwaTtcclxuXHJcbiAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIF9uYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgdmFyIHVybEFwcGVuZCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgLy8g6ZKI5a+55o6l5Y+jIFVSTCDkuK3mnIkgcGF0aCDlj4LmlbDnmoTmg4XlhrUsIOS+i+WmgjogLy9kb21haW4uY29tL3VzZXIvMTIzXHJcbiAgICAgICAgICAgIC8vIOmcgOimgeWcqOS8oOWFpeeahCBuYW1lIOS4reWKoOWFpeaWnOadoOadpeagh+ivhiwg5L6L5aaC5Lyg5YWl55qEIG5hbWUg5Li6OiBnZXRVc2VyLzEyM1xyXG4gICAgICAgICAgICAvLyBnZXRVc2VyIOaOpeWPo+eahOmFjee9ruS4juS4gOiIrOeahOmFjee9ruS4gOagt1xyXG4gICAgICAgICAgICAvLyAnZ2V0VXNlcic6IHtcclxuICAgICAgICAgICAgLy8gICAgIHVybDogJy8vZG9tYWluLmNvbS91c2VyJ1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIOS8muWFiOagueaNruaWnOadoOaPkOWPluWHuuazqOWGjOWcqOaOpeWPo+mFjee9ruS4reeahOWQjeWtlzogZ2V0VXNlcixcclxuICAgICAgICAgICAgLy8g5YaN5Y+W5Ye6IGdldFVzZXIg5rOo5YaM5pe255qEIFVSTCwg5bCG5pac5p2g5LmL5ZCO55qEIHBhdGgg5ou85o6l5Yiw5q2kIFVSTCDkuK1cclxuICAgICAgICAgICAgLy8gVE9ETyDogIPomZHmlK/mjIHov5nnp43moLzlvI86IC8vZG9tYWluLmNvbS91c2VyLzp1c2VySWQvcm9vbS86cm9vbUlkXHJcbiAgICAgICAgICAgIHZhciBzbGFzaEluZGV4ID0gbmFtZS5pbmRleE9mKCcvJyk7XHJcbiAgICAgICAgICAgIGlmIChzbGFzaEluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBfbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDAsIHNsYXNoSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdXJsQXBwZW5kID0gbmFtZS5zdWJzdHJpbmcoc2xhc2hJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChuYW1lc3BhY2UpIHtcclxuICAgICAgICAgICAgICAgIF9uYW1lID0gbmFtZXNwYWNlICsgJy4nICsgX25hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIF9hcGkgPSB0aGlzLmFwaUNvbmZpZ1tfbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChfYXBpKSB7XHJcbiAgICAgICAgICAgICAgICBhcGkgPSBleHRlbmQodHJ1ZSwge30sIF9hcGkpO1xyXG4gICAgICAgICAgICAgICAgYXBpLnVybCA9IGFwaS51cmwgKyB1cmxBcHBlbmQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCfmsqHmnInmib7liLDlr7nlupTnmoTmjqXlj6PphY3nva4nLCBfbmFtZSwgdGhpcy5hcGlDb25maWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2Fybign5rKh5pyJ6YWN572u5o6l5Y+jJywgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZXh0ZW5kKHRydWUsIHt9LCB0aGlzLmRlZmF1bHRSZXF1ZXN0T3B0aW9ucywgYXBpLCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagh+WHhuWMluaOpeWPo+i/lOWbnueahOaVsOaNruagvOW8jywg5pa55L6/6YCC6YWN5ZCE56eN5o6l5Y+j6L+U5Zue5pWw5o2u5qC85byP5LiN5ZCM55qE5oOF5Ya1XHJcbiAgICAgKiBcclxuICAgICAqIOagh+WHhuagvOW8j+S4ujpcclxuICAgICAqIGBgYGphdmFzY3JpcHRcclxuICAgICAqIHtcclxuICAgICAqICAgICBcImRhdGFcIjoge30sXHJcbiAgICAgKiAgICAgXCJzdGF0dXNcIjogMCxcclxuICAgICAqICAgICBcInN0YXR1c0luZm9cIjoge1xyXG4gICAgICogICAgICAgICBcIm1lc3NhZ2VcIjogXCLnu5nnlKjmiLfnmoTmj5DnpLrkv6Hmga9cIixcclxuICAgICAqICAgICAgICAgXCJkZXRhaWxcIjogXCLnlKjkuo7mjpLmn6XplJnor6/nmoTor6bnu4bplJnor6/kv6Hmga9cIlxyXG4gICAgICogICAgIH1cclxuICAgICAqIH1cclxuICAgICAqIGBgYFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmVxdWVzdE9wdGlvbnNcclxuICAgICAqIEBwYXJhbSB7YW55fSByZXF1ZXN0UmVzdWx0XHJcbiAgICAgKiBAcmV0dXJuIHthbnl9XHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mMmUtam91cm5leS90cmVhc3VyZS9ibG9iL21hc3Rlci9hcGkubWQjJUU2JThFJUE1JUU1JThGJUEzJUU4JUJGJTk0JUU1JTlCJTlFJUU3JTlBJTg0JUU2JTk1JUIwJUU2JThEJUFFJUU3JUJCJTkzJUU2JTlFJTg0XHJcbiAgICAgKi9cclxuICAgIG5vcm1hbGl6ZVJlcXVlc3RSZXN1bHQocmVxdWVzdE9wdGlvbnMsIHJlcXVlc3RSZXN1bHQpIHtcclxuICAgICAgICByZXR1cm4gcmVxdWVzdFJlc3VsdDtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOW7tui/n+aJp+ihjFxyXG4gKiBcclxuICogQHNlZSBqUXVlcnkuRGVmZXJyZWRcclxuICovXHJcbmNsYXNzIERlZmVycmVkIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlID0gJ3BlbmRpbmcnO1xyXG5cclxuICAgICAgICB0aGlzLl9yZXNvbHZlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9yZWplY3QgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlID0gcmVzb2x2ZTtcclxuICAgICAgICAgICAgdGhpcy5fcmVqZWN0ID0gcmVqZWN0O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1Byb21pc2UjRGVzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgc3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBwcm9taXNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uRnVsZmlsbGVkIFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25SZWplY3RlZCBcclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XHJcbiAgICAgKi9cclxuICAgIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFxyXG4gICAgICovXHJcbiAgICByZXNvbHZlKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzb2x2ZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSAnZnVsZmlsbGVkJztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0geyp9IHJlYXNvbiBcclxuICAgICAqL1xyXG4gICAgcmVqZWN0KHJlYXNvbikge1xyXG4gICAgICAgIHRoaXMuX3JlamVjdChyZWFzb24pO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlID0gJ3JlamVjdGVkJztcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOe7n+S4gOWwgeijheW+ruS/oeWwj+eoi+W6j+W5s+WPsOWQjuerr+aOpeWPo+eahOiwg+eUqFxyXG4gKiBcclxuICogQGV4YW1wbGVcclxuICogYGBgamF2YXNjcmlwdFxyXG4gKiBpbXBvcnQgQmFja2VuZEFwaSBmcm9tICd3ZWFwcC1iYWNrZW5kLWFwaSc7XHJcbiAqIFxyXG4gKiB2YXIgYmFja2VuZEFwaSA9IG5ldyBCYWNrZW5kQXBpKHtcclxuICogICAgICdnZXRMaXN0Jzoge1xyXG4gKiAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAqICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kb21haW4uY29tL2xpc3QnXHJcbiAqICAgICB9XHJcbiAqIH0pO1xyXG4gKiBiYWNrZW5kQXBpLnNlbmRSZXF1ZXN0KCdnZXRMaXN0JykudGhlbihmdW5jdGlvbihbZGF0YV0pIHtcclxuICogICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gKiB9LCBmdW5jdGlvbihyZXF1ZXN0UmVzdWx0KSB7XHJcbiAqICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0UmVzdWx0KTtcclxuICogfSk7XHJcbiAqIGBgYFxyXG4gKi9cclxuY2xhc3MgV2VhcHBCYWNrZW5kQXBpIGV4dGVuZHMgQmFja2VuZEFwaSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhcGlDb25maWcsIGRlZmF1bHRSZXF1ZXN0T3B0aW9ucyA9IFdlYXBwQmFja2VuZEFwaS5kZWZhdWx0cy5yZXF1ZXN0T3B0aW9ucywgbG9nZ2VyTGV2ZWwpIHtcclxuICAgICAgICBzdXBlcihhcGlDb25maWcsIGRlZmF1bHRSZXF1ZXN0T3B0aW9ucywgbG9nZ2VyTGV2ZWwpO1xyXG5cclxuICAgICAgICB0aGlzLnNpbXBsZVN0b3JhZ2UgPSBuZXcgU2ltcGxlU3RvcmFnZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICdiYWNrZW5kLWFwaS1jYWNoZScsXHJcbiAgICAgICAgICAgIGxvZ2dlckxldmVsOiBsb2dnZXJMZXZlbFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YaF572u5aaC5LiL5Yqf6IO9XHJcbiAgICAgKiAtIOafpeivouivt+axgumYn+WIl+aLpuaIqumHjeWkjeivt+axgijkuI3lj5HpgIHor7fmsYIpXHJcbiAgICAgKiAtIOiOt+WPluaOpeWPo+e8k+WtmOaVsOaNrueahOacuuWItiwg5a2Y5Zyo57yT5a2Y5pWw5o2u5YiZ55u05o6l6K+75Y+W57yT5a2Y5pWw5o2uKOS4jeWPkemAgeivt+axgilcclxuICAgICAqIC0g5pi+56S6IGxvYWRpbmcg5o+Q56S6XHJcbiAgICAgKiBcclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICogQHJldHVybiB7dW5kZWZpbmVkfFByb21pc2V9IOWmguaenOi/lOWbniBQcm9taXNlIOWImeS4jeS8muWOu+WPkemAgeivt+axglxyXG4gICAgICovXHJcbiAgICBiZWZvcmVTZW5kKHJlcXVlc3RPcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIGNhY2hlZFJlcXVlc3RSZXN1bHQgPSB0aGlzLnNpbXBsZVN0b3JhZ2UuZ2V0KHRoaXMuX2dldFJlcXVlc3RJbmZvSGFzaChyZXF1ZXN0T3B0aW9ucykpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5faXNTZW5kaW5nKHJlcXVlc3RPcHRpb25zKSAmJiByZXF1ZXN0T3B0aW9ucy5faW50ZXJjZXB0RHVwbGljYXRlUmVxdWVzdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJjZXB0RHVwbGljYXRlUmVxdWVzdChyZXF1ZXN0T3B0aW9ucyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjYWNoZWRSZXF1ZXN0UmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coJ2Zyb20gY2FjaGUnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2FjaGVkUmVxdWVzdFJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8g5YmN6Z2i55qE6K+35rGC5Y+v6IO95rKh5pyJ5byA5ZCvIGxvYWRpbmcsIOWboOatpOS4jeiDveWIpOaWrSAhdGhpcy5faXNBbnlTZW5kaW5nKClcclxuICAgICAgICAgICAgdGhpcy5fc2hvd0xvYWRpbmcocmVxdWVzdE9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaLpuaIqumHjeWkjeivt+axglxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVxdWVzdE9wdGlvbnNcclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XHJcbiAgICAgKi9cclxuICAgIF9pbnRlcmNlcHREdXBsaWNhdGVSZXF1ZXN0KHJlcXVlc3RPcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHJlcXVlc3RJbmZvSGFzaCA9IHRoaXMuX2dldFJlcXVlc3RJbmZvSGFzaChyZXF1ZXN0T3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ+aLpuaIquWIsOmHjeWkjeivt+axgicsIHJlcXVlc3RJbmZvSGFzaCwgdGhpcy5zZW5kaW5nW3JlcXVlc3RJbmZvSGFzaF0sIHRoaXMuc2VuZGluZyk7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybignLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xyXG5cclxuICAgICAgICAvLyDov5Tlm57kuIDkuKogcGVuZGluZyDnirbmgIHnmoQgUHJvbWlzZSwg6Zi75q2i5Y+R6YCB6K+35rGC5LiU5LiN5Lya6Kem5Y+R5Lu75L2V5Zue6LCDXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKCkge30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YaF572u5aaC5LiL5Yqf6IO9XHJcbiAgICAgKiAtIOa4heeQhuivt+axgumYn+WIl1xyXG4gICAgICogLSDlhbPpl60gbG9hZGluZyDmj5DnpLpcclxuICAgICAqIFxyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKi9cclxuICAgIGFmdGVyU2VuZChyZXF1ZXN0T3B0aW9ucywgcmVxdWVzdFJlc3VsdCkge1xyXG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21TZW5kaW5nKHJlcXVlc3RPcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0FueVNlbmRpbmcodHJ1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5faGlkZUxvYWRpbmcocmVxdWVzdE9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2hvd0xvYWRpbmcocmVxdWVzdE9wdGlvbnMpIHtcclxuICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMuX3Nob3dMb2FkaW5nICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICBpY29uOiAnbG9hZGluZycsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogV2VhcHBCYWNrZW5kQXBpLmRlZmF1bHRzLkxPQURJTkdfTUVTU0FHRSxcclxuICAgICAgICAgICAgICAgIG1hc2s6IHJlcXVlc3RPcHRpb25zLl9zaG93TG9hZGluZ01hc2tcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWNs+S9v+iuvue9ruS4uuS4jeaYvuekuiBsb2FkaW5nIOaPkOekuiwg5L2G6aG26YOo55qEIGxvYWRpbmcg5o+Q56S66L+Y5piv6KaB57uZ5Ye655qELFxyXG4gICAgICAgIC8vIOWboOS4uuWPkemAgeS6huivt+axguWHuuWOuywg5oC76KaB57uZ5LqI5LiA5a6a55qE5Y+N6aaI5L+h5oGvKOS+i+Wmguenu+WKqOe9kee7nOacieaVsOaNruS6pOS6kuaXtueahOaPkOekuilcclxuICAgICAgICB3eC5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBfaGlkZUxvYWRpbmcocmVxdWVzdE9wdGlvbnMpIHtcclxuICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgIHd4LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R6YCBIEhUVFAg6K+35rGCXHJcbiAgICAgKiBcclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtyZXF1ZXN0T3B0aW9uc10g5omp5bGV5LqGIHd4LnJlcXVlc3N0IOeahCBvcHRpb25zXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXF1ZXN0T3B0aW9ucy5fc2hvd0xvYWRpbmc9dHJ1ZV0g5piv5ZCm5pi+56S6IGxvYWRpbmcg5o+Q56S6XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXF1ZXN0T3B0aW9ucy5fc2hvd0xvYWRpbmdNYXNrPWZhbHNlXSDmmK/lkKbmmL7npLogbG9hZGluZyDmj5DnpLrnmoQgbWFza1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbcmVxdWVzdE9wdGlvbnMuX2ludGVyY2VwdER1cGxpY2F0ZVJlcXVlc3Q9ZmFsc2VdIOaYr+WQpuaLpuaIqumHjeWkjeivt+axglxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbcmVxdWVzdE9wdGlvbnMuX3Nob3dGYWlsVGlwPXRydWVdIOaOpeWPo+iwg+eUqOWHuumUmeaXtuaYr+WQpue7meeUqOaIt+aPkOekuumUmeivr+a2iOaBr1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtyZXF1ZXN0T3B0aW9ucy5fc2hvd0ZhaWxUaXBEdXJhdGlvbl0g5o6l5Y+j6LCD55So5Ye66ZSZ5pe26ZSZ6K+v5L+h5oGv55qE5pi+56S65aSa6ZW/5pe26Ze0KG1zKVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtyZXF1ZXN0T3B0aW9ucy5fY2FjaGVUdGxdIOe8k+WtmOeahOWtmOa0u+aXtumXtChtcylcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXF1ZXN0T3B0aW9ucy5fbm9ybWFsaXplUmVxdWVzdFJlc3VsdF0g5qCH5YeG5YyW5o6l5Y+j6L+U5Zue55qE5pWw5o2u5qC85byPXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3JlcXVlc3RPcHRpb25zLl90eXBlPSdyZXF1ZXN0J10g6K+35rGC55qE57G75Z6LOiBgcmVxdWVzdGAgfCBgdXBsb2FkRmlsZWBcclxuICAgICAqL1xyXG4gICAgJHNlbmRIdHRwUmVxdWVzdChyZXF1ZXN0T3B0aW9ucykge1xyXG4gICAgICAgIC8vIOWboOS4uuiwg+eUqOi/hyB3eC5yZXF1ZXN0KHJlcXVlc3RPcHRpb25zKSDkuYvlkI4sIOivt+axgueahCBVUkwg5Lya6KKr5b6u5L+h5bCP56iL5bqP55qEIEFQSSDmlLnlhpksXHJcbiAgICAgICAgLy8g5Y2zIHJlcXVlc3RPcHRpb25zLnVybCDlj4LmlbDkvJrooqvmlLnlhpksXHJcbiAgICAgICAgLy8g5L6L5aaC5Y6f5p2l55qEIFVSTCDmmK86IGh0dHBzOi8vZG9taWFuLmNvbS9hICBkYXRhIOaYryB7YToxfVxyXG4gICAgICAgIC8vIOmCo+S5iCBkYXRhIOS8muiiq+i/veWKoOWIsCBVUkwg5LiKLCDlj5jmiJA6IGh0dHBzOi8vZG9taWFuLmNvbS9hP2E9MVxyXG4gICAgICAgIC8vIOeUseS6juaIkeS7rOiuoeeul+WQjOS4gOS4quivt+axgueahOetvuWQjeaYr+agueaNriBVUkwg5p2l55qELCDlpoLmnpzliY3lkI4gVVJMIOS4jeS4gOiHtCwg5bCx5Lya6YCg5oiQ5peg5rOV6L6o5Yir5Ye66YeN5aSN6K+35rGCXHJcbiAgICAgICAgLy8g5Zug5q2k6L+Z6YeM5oiR5Lus6ZyA6KaB5L+d5a2Y5Y6f5aeL55qEIFVSTCDlj4LmlbBcclxuICAgICAgICByZXF1ZXN0T3B0aW9ucy5fdXJsID0gcmVxdWVzdE9wdGlvbnMudXJsO1xyXG5cclxuICAgICAgICB2YXIgcHJvbWlzZSA9IG51bGw7XHJcbiAgICAgICAgdmFyIGJlZm9yZVNlbmRSZXN1bHQgPSB0aGlzLmJlZm9yZVNlbmQocmVxdWVzdE9wdGlvbnMpO1xyXG4gICAgICAgIGlmIChiZWZvcmVTZW5kUmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBiZWZvcmVTZW5kUmVzdWx0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDmlLbliLDlvIDlj5HogIXmnI3liqHlmajmiJDlip/ov5Tlm57nmoTlm57osIPlh73mlbBcclxuICAgICAgICAgICAgICAgIC8vIOazqOaEjzog5pS25Yiw5byA5Y+R6ICF5pyN5Yqh5Zmo6L+U5Zue5bCx5Lya5Zue6LCD6L+Z5Liq5Ye95pWwLCDkuI3nrqEgSFRUUCDnirbmgIHmmK/lkKbkuLogMjAwIOS5n+eul+ivt+axguaIkOWKn1xyXG4gICAgICAgICAgICAgICAgLy8gcmVxdWVzdFJlc3VsdCDljIXlkKvnmoTlsZ7mgKfmnIk6IHN0YXR1c0NvZGUsIGhlYWRlciwgZGF0YSwgZXJyTXNnXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0T3B0aW9ucy5zdWNjZXNzID0gZnVuY3Rpb24ocmVxdWVzdFJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIERldGVybWluZSBpZiBIVFRQIHJlcXVlc3Qgc3VjY2Vzc2Z1bCB8IGpRdWVyeVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0h0dHBSZXF1ZXN0U3VjY2VzcyA9IHJlcXVlc3RSZXN1bHQuc3RhdHVzQ29kZSA+PSAyMDAgJiYgcmVxdWVzdFJlc3VsdC5zdGF0dXNDb2RlIDwgMzAwIHx8IHJlcXVlc3RSZXN1bHQuc3RhdHVzQ29kZSA9PT0gMzA0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNIdHRwUmVxdWVzdFN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXF1ZXN0UmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBIVFRQIOivt+axguWksei0pVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVxdWVzdFJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIC8vIOaOpeWPo+iwg+eUqOWksei0peeahOWbnuiwg+WHveaVsFxyXG4gICAgICAgICAgICAgICAgLy8g6L+Z5Liq5oyHIHd4LnJlcXVlc3QgQVBJIOiwg+eUqOWksei0peeahOaDheWGtSxcclxuICAgICAgICAgICAgICAgIC8vIOS+i+WmguayoeacieS8oCB1cmwg5Y+C5pWw5oiW6ICF5Lyg5YWl55qEIHVybCDmoLzlvI/plJnor6/kuYvnsbvnmoTplJnor6/mg4XlhrVcclxuICAgICAgICAgICAgICAgIC8vIOi/meaXtuS4jeS8muaciSBzdGF0dXNDb2RlIOWtl+autSwg5Lya5pyJIGVyck1zZyDlrZfmrrVcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RPcHRpb25zLmZhaWwgPSBmdW5jdGlvbihyZXF1ZXN0UmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcXVlc3RSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDlj5Hlh7ror7fmsYJcclxuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5fdHlwZSA9PT0gJ3VwbG9hZEZpbGUnKSB7IC8vIOS4iuS8oOaWh+S7tlxyXG4gICAgICAgICAgICAgICAgICAgIHd4LnVwbG9hZEZpbGUocmVxdWVzdE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8g5YW25LuW6K+35rGCXHJcbiAgICAgICAgICAgICAgICAgICAgd3gucmVxdWVzdChyZXF1ZXN0T3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkVG9TZW5kaW5nKHJlcXVlc3RPcHRpb25zKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKChyZXF1ZXN0UmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIOivt+axgue7k+adn+WQjueahOe7n+S4gOWkhOeQhuWmguaenOaUvuWcqCBjb21wbGV0ZSDlm57osIPkuK3lsLHkuI3mlrnkvr/lrp7njrDph43lhpnor7fmsYLov5Tlm57nmoTmlbDmja5cclxuICAgICAgICAgICAgLy8g5L6L5aaC5o6l5Y+j6L+U5Zue55qE5pWw5o2u5piv5Yqg5a+G55qELCDpnIDopoHnu5/kuIDlnKggYWZ0ZXJTZW5kIOS4reWwgeijheino+WvhueahOmAu+i+kSwg5pS55YaZ6K+35rGC6L+U5Zue55qE5pWw5o2uLFxyXG4gICAgICAgICAgICAvLyDlgZrliLDkuIrlsYLlr7nmlbDmja7nmoTop6Plr4bml6DmhJ/nn6VcclxuICAgICAgICAgICAgdGhpcy5hZnRlclNlbmQocmVxdWVzdE9wdGlvbnMsIHJlcXVlc3RSZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3VjY2Vzc0hhbmRsZXIocmVxdWVzdE9wdGlvbnMsIHJlcXVlc3RSZXN1bHQpO1xyXG4gICAgICAgIH0sIChyZXF1ZXN0UmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJTZW5kKHJlcXVlc3RPcHRpb25zLCByZXF1ZXN0UmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZhaWxIYW5kbGVyKHJlcXVlc3RPcHRpb25zLCByZXF1ZXN0UmVzdWx0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluS4gOS4quivt+axgueahOWFs+mUruS/oeaBr1xyXG4gICAgICogXHJcbiAgICAgKiAtIG1ldGhvZFxyXG4gICAgICogLSB1cmxcclxuICAgICAqIC0gZGF0YVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVxdWVzdE9wdGlvbnMgXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IOivt+axguWFs+mUruS/oeaBr+e7hOWQiOeahCBNRDUg5YC8XHJcbiAgICAgKi9cclxuICAgIF9nZXRSZXF1ZXN0SW5mb0hhc2gocmVxdWVzdE9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgZGF0YSA9ICcnO1xyXG4gICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdE9wdGlvbnMuZGF0YSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gcmVxdWVzdE9wdGlvbnMuZGF0YS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIud2Fybign6I635Y+W5LiA5Liq6K+35rGC5pWw5o2u55qEIEpTT04g5a2X56ym5Liy5aSx6LSlJywgcmVxdWVzdE9wdGlvbnMuZGF0YSwgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVxdWVzdEluZm8gPSByZXF1ZXN0T3B0aW9ucy5tZXRob2QgKyAnICcgKyByZXF1ZXN0T3B0aW9ucy5fdXJsICsgJyAnICsgZGF0YTtcclxuXHJcbiAgICAgICAgdmFyIHJlcXVlc3RJbmZvSGFzaCA9IHJlcXVlc3RJbmZvO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RJbmZvSGFzaCA9IG1kNShyZXF1ZXN0SW5mbyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2Fybign6I635Y+W5LiA5Liq6K+35rGC55qE5YWz6ZSu5L+h5oGv55qEIE1ENSDlpLHotKUnLCByZXF1ZXN0SW5mbywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RJbmZvSGFzaDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwhuivt+axguaUvuWFpeWIsOWPkemAgeS4reeahOmYn+WIl+S4rVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVxdWVzdE9wdGlvbnMgXHJcbiAgICAgKi9cclxuICAgIF9hZGRUb1NlbmRpbmcocmVxdWVzdE9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLnNlbmRpbmdbdGhpcy5fZ2V0UmVxdWVzdEluZm9IYXNoKHJlcXVlc3RPcHRpb25zKV0gPSByZXF1ZXN0T3B0aW9ucztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5bCG6K+35rGC5LuO5Y+R6YCB5Lit55qE6Zif5YiX5Lit56e76Zmk5Ye65p2lXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0T3B0aW9ucyBcclxuICAgICAqL1xyXG4gICAgX3JlbW92ZUZyb21TZW5kaW5nKHJlcXVlc3RPcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHJlcXVlc3RJbmZvSGFzaCA9IHRoaXMuX2dldFJlcXVlc3RJbmZvSGFzaChyZXF1ZXN0T3B0aW9ucyk7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IGRlbGV0ZSB0aGlzLnNlbmRpbmdbcmVxdWVzdEluZm9IYXNoXTtcclxuICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCflsIbor7fmsYLku47lj5HpgIHkuK3nmoTpmJ/liJfkuK3np7vpmaTlpLHotKUnLCByZXF1ZXN0SW5mb0hhc2gsIHJlcXVlc3RPcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOafkOS4quivt+axguaYr+WQpuato+WcqOWPkemAgeS4rVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVxdWVzdE9wdGlvbnNcclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIF9pc1NlbmRpbmcocmVxdWVzdE9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kaW5nLmhhc093blByb3BlcnR5KHRoaXMuX2dldFJlcXVlc3RJbmZvSGFzaChyZXF1ZXN0T3B0aW9ucykpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/kuI3mmK/mnInmraPlnKjlj5HpgIHkuK3nmoTor7fmsYJcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBleGNsdWRlTm9Mb2FkaW5nIOaOkumZpOmYn+WIl+S4reayoeacieW8gOWQryBsb2FkaW5nIOeahOivt+axgiwg5Y2zIGBfc2hvd0xvYWRpbmdgIOWPguaVsOS4uiBmYWxzZSDnmoTor7fmsYJcclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIF9pc0FueVNlbmRpbmcoZXhjbHVkZU5vTG9hZGluZykge1xyXG4gICAgICAgIHZhciBzZW5kaW5nQ291bnQgPSAwO1xyXG5cclxuICAgICAgICBpZiAoZXhjbHVkZU5vTG9hZGluZykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5zZW5kaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVxdWVzdE9wdGlvbnMgPSB0aGlzLnNlbmRpbmdba2V5XTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5fc2hvd0xvYWRpbmcgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZGluZ0NvdW50ICs9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZW5kaW5nQ291bnQgPSBPYmplY3Qua2V5cyh0aGlzLnNlbmRpbmcpLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZW5kaW5nQ291bnQgIT09IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmjqXlj6PosIPnlKjmiJDlip/ml7bnmoTpu5jorqTlpITnkIbmlrnms5VcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlcXVlc3RPcHRpb25zIHd4LnJlcXVlc3Qgb3B0aW9uc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlcXVlc3RSZXN1bHQgd3gucmVxdWVzdCBzdWNjZXNzIOi/lOWbnueahOe7k+aenFxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIF9zdWNjZXNzSGFuZGxlcihyZXF1ZXN0T3B0aW9ucywgcmVxdWVzdFJlc3VsdCkge1xyXG4gICAgICAgIHRoaXMuX25vcm1hbGl6ZVJlcXVlc3RSZXN1bHQocmVxdWVzdE9wdGlvbnMsIHJlcXVlc3RSZXN1bHQpO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1ZXN0UmVzdWx0LmRhdGE7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9pZkFwaVN1Y2Nlc3MocmVxdWVzdE9wdGlvbnMsIHJlcXVlc3RSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhyZXF1ZXN0T3B0aW9ucy5tZXRob2QsIHJlcXVlc3RPcHRpb25zLnVybCwgcmVxdWVzdE9wdGlvbnMuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RPcHRpb25zLCByZXF1ZXN0UmVzdWx0KTtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMuX2NhY2hlVHRsID49IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0SW5mb0hhc2ggPSB0aGlzLl9nZXRSZXF1ZXN0SW5mb0hhc2gocmVxdWVzdE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNpbXBsZVN0b3JhZ2UuaGFzKHJlcXVlc3RJbmZvSGFzaCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpbXBsZVN0b3JhZ2Uuc2V0KHJlcXVlc3RJbmZvSGFzaCwgcmVxdWVzdFJlc3VsdCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0dGw6IHJlcXVlc3RPcHRpb25zLl9jYWNoZVR0bFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgLy8g5Y+q6L+U5Zue5qCH5YeG5o6l5Y+j5pWw5o2u5qC85byP5Lit55qE5pWw5o2uXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPyByZXN1bHQuZGF0YSA6IHJlc3VsdCxcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RSZXN1bHRcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9IGVsc2UgeyAvLyDkuJrliqHplJnor69cclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RSZXN1bHQuZGF0YSA9IHJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdC5fZXJyb3JUeXBlID0gJ0InO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21tb25GYWlsU3RhdHVzSGFuZGxlcihyZXF1ZXN0T3B0aW9ucywgcmVxdWVzdFJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o6l5Y+j6LCD55So5aSx6LSl5pe255qE6buY6K6k5aSE55CG5pa55rOVXHJcbiAgICAgKiBcclxuICAgICAqIOaOpeWPo+mUmeivr+eggeinhOiMg1xyXG4gICAgICogLS0tLS0tLS0tLS0tLVxyXG4gICAgICog5qC55o2u5Y+R6YCB6K+35rGC55qE5pyA57uI54q25oCB5a6a5LmJ6ZSZ6K+v55qE5YiG57G7XHJcbiAgICAgKiAtIOWPkemAgeWksei0pSjljbPor7fmsYLmoLnmnKzlsLHmsqHmnInlj5HpgIHlh7rljrspXHJcbiAgICAgKiAtIOWPkemAgeaIkOWKn1xyXG4gICAgICogICAtIEhUVFAg5byC5bi454q25oCBKOS+i+WmgiA0MDQvNTAwLi4uKVxyXG4gICAgICogICAtIEhUVFAg5q2j5bi454q25oCBKOS+i+WmgiAyMDApXHJcbiAgICAgKiAgICAgLSDmjqXlj6PosIPnlKjmiJDlip9cclxuICAgICAqICAgICAtIOaOpeWPo+iwg+eUqOWksei0pSjkuJrliqHplJnor68sIOWNs+aOpeWPo+inhOiMg+S4rSBzdGF0dXMg6Z2eIDAg55qE5oOF5Ya1KVxyXG4gICAgICogXHJcbiAgICAgKiDplJnor6/noIHlj6/kuI3lm7rlrprplb/luqYsIOaVtOS9k+agvOW8j+S4ujog5a2X5q+NK+aVsOWtl1xyXG4gICAgICog5a2X5q+N5L2c5Li66ZSZ6K+v57G75Z6LLCDlj6/mianlsZXmgKfmm7Tlpb0sIOaVsOWtl+W7uuiuruWIkuWIhuWMuumXtOadpee7huWIhumUmeivr1xyXG4gICAgICog5L6L5aaCOlxyXG4gICAgICogLSBBIGZvciBBUEk6IEFQSSDosIPnlKjlpLHotKUo6K+35rGC5Y+R6YCB5aSx6LSlKeeahOmUmeivrywg5L6L5aaCIEExMDAg6KGo56S6IFVSTCDpnZ7ms5VcclxuICAgICAqIC0gSCBmb3IgSFRUUCwgSFRUUCDlvILluLjnirbmgIHnmoTplJnor68sIOS+i+WmgiBINDA0IOihqOekuiBIVFRQIOivt+axgjQwNOmUmeivr1xyXG4gICAgICogLSBCIGZvciBiYWNrZW5kIG9yIGJ1c2luZXNzLCDmjqXlj6PosIPnlKjlpLHotKXnmoTplJnor68sIOS+i+WmgiBCMTAwIOS4muWKoUHplJnor68sIEIyMDAg5Lia5YqhQumUmeivr1xyXG4gICAgICogLSBDIGZvciBDbGllbnQ6IOWuouaIt+err+mUmeivrywg5L6L5aaCIEMxMDAg6KGo56S66Kej5p6QIEpTT04g5aSx6LSlXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0T3B0aW9ucyB3eC5yZXF1ZXN0IG9wdGlvbnNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0UmVzdWx0IHd4LnJlcXVlc3Qgc3VjY2VzcyDmiJbogIUgZmFpbCDov5Tlm57nmoTnu5PmnpxcclxuICAgICAqIEBwYXJhbSB7UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgX2ZhaWxIYW5kbGVyKHJlcXVlc3RPcHRpb25zLCByZXF1ZXN0UmVzdWx0KSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG5cclxuICAgICAgICAvLyDlpoLmnpwgd3gucmVxdWV0IEFQSSDosIPnlKjmmK/miJDlip/nmoQsIOWImeS4gOWumuS8muaciSBzdGF0dXNDb2RlIOWtl+autVxyXG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdFJlc3VsdC5zdGF0dXNDb2RlICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogcmVxdWVzdFJlc3VsdC5zdGF0dXNDb2RlLFxyXG4gICAgICAgICAgICAgICAgX2Vycm9yVHlwZTogJ0gnLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzSW5mbzoge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFdlYXBwQmFja2VuZEFwaS5kZWZhdWx0cy5SRVFVRVNUX0hUVFBfRkFJTF9NRVNTQUdFLFxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0T3B0aW9uczogcmVxdWVzdE9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RSZXN1bHQ6IHJlcXVlc3RSZXN1bHQuc3RhdHVzQ29kZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFdlYXBwQmFja2VuZEFwaS5kZWZhdWx0cy5SRVFVRVNUX0FQSV9GQUlMX01FU1NBR0U7XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSBXZWFwcEJhY2tlbmRBcGkuZGVmYXVsdHMuUkVRVUVTVF9BUElfRkFJTF9TVEFUVVM7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdFJlc3VsdC5lcnJNc2cpIHtcclxuICAgICAgICAgICAgICAgIC8vIOmAmui/hyBlcnJNc2cg5p2l55Sf5oiQ5LiN5ZCM55qEIHN0YXR1cyDlgLwsIOWNs+aWueS+v+S4gOecvOWwseiDveWkn+efpemBk+WHuuS6huS7gOS5iOmUmeivr1xyXG4gICAgICAgICAgICAgICAgdmFyIGVyck1zZ0RldGFpbCA9IHJlcXVlc3RSZXN1bHQuZXJyTXNnLnJlcGxhY2UoJ3JlcXVlc3Q6ZmFpbCAnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyTXNnRGV0YWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGVyck1zZ0RldGFpbDtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSBlcnJNc2dEZXRhaWwuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzdWx0ID0ge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXMsXHJcbiAgICAgICAgICAgICAgICBfZXJyb3JUeXBlOiAnQScsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXNJbmZvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyTXNnOiByZXF1ZXN0UmVzdWx0LmVyck1zZ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcXVlc3RSZXN1bHQuZGF0YSA9IHJlc3VsdDtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25GYWlsU3RhdHVzSGFuZGxlcihyZXF1ZXN0T3B0aW9ucywgcmVxdWVzdFJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mjqXlj6Por7fmsYLosIPnlKjmmK/lkKbmiJDlip9cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlcXVlc3RPcHRpb25zIHd4LnJlcXVlc3Qgb3B0aW9uc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlcXVlc3RSZXN1bHQgd3gucmVxdWVzdCBzdWNjZXNzIOi/lOWbnueahOe7k+aenFxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgX2lmQXBpU3VjY2VzcyhyZXF1ZXN0T3B0aW9ucywgcmVxdWVzdFJlc3VsdCkge1xyXG4gICAgICAgIC8vIOaOpeWPo+i/lOWbnueahOaVsOaNrlxyXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1ZXN0UmVzdWx0LmRhdGE7XHJcbiAgICAgICAgdmFyIGlzQXBpU3VjY2VzcyA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaXNBcGlTdWNjZXNzID0gIXJlc3VsdC5zdGF0dXMgfHwgcmVzdWx0LnN0YXR1cyA9PSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNBcGlTdWNjZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCH5YeG5YyW5o6l5Y+j55qE6L+U5Zue5pWw5o2uLCDkvJrmlLnlhpkgYHJlcXVlc3RSZXN1bHQuZGF0YWAg55qE5YaF5a65XHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0T3B0aW9ucyBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0UmVzdWx0IFxyXG4gICAgICovXHJcbiAgICBfbm9ybWFsaXplUmVxdWVzdFJlc3VsdChyZXF1ZXN0T3B0aW9ucywgcmVxdWVzdFJlc3VsdCkge1xyXG4gICAgICAgIHZhciBfbm9ybWFsaXplUmVxdWVzdFJlc3VsdCA9IHJlcXVlc3RPcHRpb25zLl9ub3JtYWxpemVSZXF1ZXN0UmVzdWx0ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0T3B0aW9ucy5fbm9ybWFsaXplUmVxdWVzdFJlc3VsdCA6IHRoaXMubm9ybWFsaXplUmVxdWVzdFJlc3VsdDtcclxuXHJcbiAgICAgICAgLy8gd3gudXBsb2FkRmlsZSDov5Tlm57nmoTmlbDmja7mmK8gc3RyaW5nIOexu+Weiywg6ZyA6KaB6Kej5p6Q5Li65a+56LGhXHJcbiAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLl90eXBlID09PSAndXBsb2FkRmlsZScpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RSZXN1bHQuZGF0YSA9IEpTT04ucGFyc2UocmVxdWVzdFJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ+ino+aekCB3eC51cGxvYWRGaWxlIOi/lOWbnueahOaVsOaNruWHuumUmScsIHJlcXVlc3RPcHRpb25zLCByZXF1ZXN0UmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IF9ub3JtYWxpemVSZXF1ZXN0UmVzdWx0LmFwcGx5KHRoaXMsIFtyZXF1ZXN0T3B0aW9ucywgcmVxdWVzdFJlc3VsdC5kYXRhXSk7XHJcbiAgICAgICAgcmVxdWVzdFJlc3VsdC5kYXRhID0gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5o6l5Y+j5aSE55CG5aSx6LSl5pe26YCa55So55qE6ZSZ6K+v54q25oCB5aSE55CGXHJcbiAgICAgKiBcclxuICAgICAqIOS+i+WmgjpcclxuICAgICAqIC0g5o6l5Y+j5Ye66ZSZ5pe257uf5LiA5by55Ye66ZSZ6K+v5o+Q56S65L+h5oGvXHJcbiAgICAgKiAtIOaOpeWPo+WHuumUmeaXtuagueaNriBzdGF0dXMg5YGa6YCa55So55qE6ZSZ6K+v5aSE55CGKOS+i+WmgueUqOaItyBzZXNzaW9uIOi2heaXtiwg5byV5Yiw55So5oi36YeN5paw55m75b2VKVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVxdWVzdE9wdGlvbnMgd3gucmVxdWVzdCBvcHRpb25zXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVxdWVzdFJlc3VsdCB3eC5yZXF1ZXN0IHN1Y2Nlc3Mg5oiW6ICFIGZhaWwg6L+U5Zue55qE57uT5p6cXHJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBjb21tb25GYWlsU3RhdHVzSGFuZGxlcihyZXF1ZXN0T3B0aW9ucywgcmVxdWVzdFJlc3VsdCkge1xyXG4gICAgICAgIC8vIOaOpeWPo+iwg+eUqOWksei0pSwg6L6T5Ye65aSx6LSl55qE5pel5b+X5L+h5oGvLCDpnIDopoHljIXlkKvlpoLkuIvph43opoHkv6Hmga9cclxuICAgICAgICAvLyAtIEhUVFAgbWV0aG9kXHJcbiAgICAgICAgLy8gLSBIVFRQIFVSTFxyXG4gICAgICAgIC8vIC0g5o6l5Y+j55qE5Y+C5pWwXHJcbiAgICAgICAgLy8gLSDmjqXlj6PnmoTov5Tlm57nirbmgIFcclxuICAgICAgICAvLyAtIOaOpeWPo+eahOi/lOWbnuaVsOaNrlxyXG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYOaOpeWPo+iwg+eUqOWHuumUmSgke3RoaXMuX2dldEVycm9yQ29kZShyZXF1ZXN0UmVzdWx0LmRhdGEpfSlgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdE9wdGlvbnMubWV0aG9kLCByZXF1ZXN0T3B0aW9ucy51cmwsIHJlcXVlc3RPcHRpb25zLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0T3B0aW9ucywgcmVxdWVzdFJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybignLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xyXG5cclxuICAgICAgICB0aGlzLmZhaWxTdGF0dXNIYW5kbGVyKHJlcXVlc3RPcHRpb25zLCByZXF1ZXN0UmVzdWx0KTtcclxuICAgICAgICB0aGlzLmNvbW1vbkZhaWxUaXAocmVxdWVzdE9wdGlvbnMsIHJlcXVlc3RSZXN1bHQpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXF1ZXN0UmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmSiOWvuemUmeivr+eKtuaAgeWBmuiHquWumuS5ieWkhOeQhlxyXG4gICAgICogXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0T3B0aW9ucyB3eC5yZXF1ZXN0IG9wdGlvbnNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0UmVzdWx0IHd4LnJlcXVlc3Qgc3VjY2VzcyDmiJbogIUgZmFpbCDov5Tlm57nmoTnu5PmnpxcclxuICAgICAqL1xyXG4gICAgZmFpbFN0YXR1c0hhbmRsZXIocmVxdWVzdE9wdGlvbnMsIHJlcXVlc3RSZXN1bHQpIHtcclxuICAgICAgICAvLyDlrZDnsbvlhbfkvZPljrvlrp7njrBcclxuICAgICAgICAvLyDkvovlpoJcclxuICAgICAgICAvLyB2YXIgcmVzdWx0ID0gcmVxdWVzdFJlc3VsdC5kYXRhO1xyXG4gICAgICAgIC8vIGlmIChyZXN1bHQuc3RhdHVzID09PSBXZWFwcEJhY2tlbmRBcGkuZGVmYXVsdHMuUkVRVUVTVF9BUElfRkFJTF9TVEFUVVMpIHtcclxuICAgICAgICAvLyAgICAgLy8gWFhYIHlvdXIgY29kZSBoZXJlXHJcbiAgICAgICAgLy8gfSBlbHNlIGlmIChyZXN1bHQuc3RhdHVzID09IDQwMSkgeyAvLyDkvovlpoLnlKjmiLfmnKrnmbvlvZXnu5/kuIDot7PovazliLDnmbvlvZXpobVcclxuICAgICAgICAvLyAgICAgLy8gWFhYIHlvdXIgY29kZSBoZXJlXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o6l5Y+j5Ye66ZSZ5pe257uf5LiA5by55Ye66ZSZ6K+v5o+Q56S65L+h5oGvXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0T3B0aW9ucyB3eC5yZXF1ZXN0IG9wdGlvbnNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0UmVzdWx0IHd4LnJlcXVlc3Qgc3VjY2VzcyDmiJbogIUgZmFpbCDov5Tlm57nmoTnu5PmnpxcclxuICAgICAqL1xyXG4gICAgY29tbW9uRmFpbFRpcChyZXF1ZXN0T3B0aW9ucywgcmVxdWVzdFJlc3VsdCkge1xyXG4gICAgICAgIC8vIOWcqOS4gOS6m+WcuuaZr+S4i+mcgOimgSwg5L6L5aaC5o+Q56S655So5oi355m75b2V55qE5pe25YCZLCDkuI3luIzmnJvnnIvop4HkuIDkuKrplJnor6/mj5DnpLosIOaIluiAheaDs+iHquWumuS5iemUmeivr+aPkOekuueahOaXtuWAmVxyXG4gICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5fc2hvd0ZhaWxUaXAgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gdGhpcy5nZXRGYWlsVGlwTWVzc2FnZShyZXF1ZXN0T3B0aW9ucywgcmVxdWVzdFJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAvLyBYWFgg55Sx5LqOIHd4LnNob3dMb2FkaW5nIOW6leWxguWwseaYr+iwg+eUqOeahCBzaG93VG9hc3QsXHJcbiAgICAgICAgICAgIC8vIHRvYXN0IOWunueOsOaYr+WNleS+iywg5YWo5bGA5Y+q5pyJ5LiA5LiqLCDlm6DmraTkvb/nlKggc2hvd1RvYXN0IOS8mumAoOaIkCBsb2FkaW5nIOiiq+WFs+aOiVxyXG4gICAgICAgICAgICB2YXIgdG9hc3RPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG1lc3NhZ2VcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdE9wdGlvbnMuX3Nob3dGYWlsVGlwRHVyYXRpb24gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdE9wdGlvbnMuZHVyYXRpb24gPSByZXF1ZXN0T3B0aW9ucy5fc2hvd0ZhaWxUaXBEdXJhdGlvbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHRvYXN0T3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6ZSZ6K+v56CBXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXN1bHQg5qCH5YeG55qE5o6l5Y+j5pWw5o2uXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIF9nZXRFcnJvckNvZGUocmVzdWx0KSB7XHJcbiAgICAgICAgcmV0dXJuIGAke3Jlc3VsdC5fZXJyb3JUeXBlfSR7cmVzdWx0LnN0YXR1cyA/IHJlc3VsdC5zdGF0dXMgOiAnJ31gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W57uZ55So5oi355qE6ZSZ6K+v5o+Q56S6XHJcbiAgICAgKiBcclxuICAgICAqIOS+i+Wmgjog5o+Q5L6b57uZ55So5oi355yL55qE5raI5oGv5qC85byP5Y+C6ICDIFFRIOeahOmUmeivr+aPkOekuua2iOaBr1xyXG4gICAgICog5o+Q56S65raI5oGvXHJcbiAgICAgKiAo6ZSZ6K+v56CBOiB4eHgp54Gw6Imy5a2XXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0T3B0aW9ucyBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0UmVzdWx0IFxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXRGYWlsVGlwTWVzc2FnZShyZXF1ZXN0T3B0aW9ucywgcmVxdWVzdFJlc3VsdCkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1ZXN0UmVzdWx0LmRhdGE7XHJcblxyXG4gICAgICAgIHZhciBtZXNzYWdlID0gKHJlc3VsdC5zdGF0dXNJbmZvICYmIHJlc3VsdC5zdGF0dXNJbmZvLm1lc3NhZ2UpID9cclxuICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXNJbmZvLm1lc3NhZ2UgOiBXZWFwcEJhY2tlbmRBcGkuZGVmYXVsdHMuRkFJTF9NRVNTQUdFO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7bWVzc2FnZX1cXG4o6ZSZ6K+v56CBOiR7dGhpcy5fZ2V0RXJyb3JDb2RlKHJlc3VsdCl9KWA7XHJcbiAgICB9XHJcbn1cclxuXHJcbldlYXBwQmFja2VuZEFwaS5kZWZhdWx0cyA9IHtcclxuICAgIExPQURJTkdfTUVTU0FHRTogJycsXHJcblxyXG4gICAgRkFJTF9NRVNTQUdFOiAn57O757uf57mB5b+ZJyxcclxuXHJcbiAgICAvLyDmjqXlj6Por7fmsYLlpLHotKUoSFRUUOWNj+iuruWxgumdoinml7bnmoTnirbmgIHnoIEsIOeUqOS6juS4juS4muWKoeeKtuaAgeeggeWMuuWIhuW8gFxyXG4gICAgUkVRVUVTVF9IVFRQX0ZBSUxfTUVTU0FHRTogJ+ivt+axgui2heaXtu+8jOivt+mHjeivlScsXHJcblxyXG4gICAgLy8gd3gucmVxdWVzdCBBUEkg6LCD55So5aSx6LSlXHJcbiAgICBSRVFVRVNUX0FQSV9GQUlMX1NUQVRVUzogMSxcclxuICAgIFJFUVVFU1RfQVBJX0ZBSUxfTUVTU0FHRTogJ+ivt+axguWksei0pe+8jOivt+mHjeivlScsXHJcblxyXG4gICAgLy8g6buY6K6k55qE6K+35rGC5Y+C5pWwXHJcbiAgICByZXF1ZXN0T3B0aW9uczoge1xyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbidcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYXBwQmFja2VuZEFwaTsiXX0=