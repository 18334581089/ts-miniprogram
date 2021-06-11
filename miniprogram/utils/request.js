"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api_post = exports.api_get = exports.request = void 0;
var env_1 = require("./env");
var util_1 = require("../utils/util");
var BASE_URL = env_1.default.BASE_URL, STORE_ID = env_1.default.STORE_ID;
var APP = getApp();
function success_handle(res) {
    console.log(res);
    var _a = res.data, code = _a.code, data = _a.data, message = _a.message;
    if (code === 200) {
        return data;
    }
    else if (code === 403) {
        APP.globalData.can_reg = true;
        util_1.default.wx_err(message, 'login');
        return null;
    }
    else {
        util_1.default.wx_err(message);
        return null;
    }
}
function fail_handle(err) {
    console.log(err.errMsg);
    util_1.default.wx_err('网络出错了!');
    return null;
}
exports.request = function (url, datas, method, headers) {
    if (method === void 0) { method = 'GET'; }
    if (headers === void 0) { headers = {}; }
    var header = __assign({ Authorization: 'Bearer ' + APP.globalData.token }, headers);
    var data = __assign({ storeId: STORE_ID }, datas);
    var wx_request = new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: method,
            header: header,
            success: function (res) {
                resolve(res);
            },
            fail: function (err) { return reject(err); },
        });
    });
    return wx_request;
};
exports.api_get = function (url, data, headers) {
    if (url === void 0) { url = '/'; }
    if (data === void 0) { data = {}; }
    if (headers === void 0) { headers = {}; }
    return exports.request(BASE_URL + "/api/" + url, data, 'GET', headers);
};
exports.api_post = function (url, data) {
    if (url === void 0) { url = '/'; }
    if (data === void 0) { data = {}; }
    return exports.request(BASE_URL + "/api/" + url + "?storeId=" + STORE_ID, data, 'POST');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBMEI7QUFDMUIsc0NBQWdDO0FBR3hCLElBQUEsUUFBUSxHQUFlLGFBQU0sU0FBckIsRUFBRSxRQUFRLEdBQUssYUFBTSxTQUFYLENBQVc7QUFDckMsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsU0FBUyxjQUFjLENBQ3JCLEdBQWlCO0lBRWpCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVixJQUFBLEtBQTBCLEdBQUcsQ0FBQyxJQUFJLEVBQWhDLElBQUksVUFBQSxFQUFFLElBQUksVUFBQSxFQUFFLE9BQU8sYUFBYSxDQUFBO0lBQ3hDLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtRQUNoQixPQUFPLElBQUksQ0FBQTtLQUNaO1NBQU0sSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1FBQ3ZCLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtRQUM3QixjQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUM3QixPQUFPLElBQUksQ0FBQTtLQUNaO1NBQU07UUFDTCxjQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3BCLE9BQU8sSUFBSSxDQUFBO0tBQ1o7QUFDSCxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQ2xCLEdBQWtCO0lBRWxCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZCLGNBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDckIsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDO0FBRVksUUFBQSxPQUFPLEdBQUcsVUFDckIsR0FBVyxFQUNYLEtBQVcsRUFDWCxNQUF3QixFQUN4QixPQUFZO0lBRFosdUJBQUEsRUFBQSxjQUF3QjtJQUN4Qix3QkFBQSxFQUFBLFlBQVk7SUFFWixJQUFNLE1BQU0sY0FDVixhQUFhLEVBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUM1QyxPQUFPLENBQ1gsQ0FBQTtJQUNELElBQU0sSUFBSSxjQUNSLE9BQU8sRUFBRSxRQUFRLElBQ2QsS0FBSyxDQUNULENBQUE7SUFDRCxJQUFNLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBVyxVQUFDLE9BQU8sRUFBRSxNQUFNO1FBQ3ZELEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDVCxHQUFHLEtBQUE7WUFDSCxJQUFJLE1BQUE7WUFDSixNQUFNLFFBQUE7WUFDTixNQUFNLFFBQUE7WUFDTixPQUFPLEVBQUUsVUFBQyxHQUFnQjtnQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2QsQ0FBQztZQUVELElBQUksRUFBRSxVQUFDLEdBQUcsSUFBSyxPQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBWCxDQUFXO1NBRTNCLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBR0YsT0FBTyxVQUFVLENBQUE7QUFDbkIsQ0FBQyxDQUFBO0FBRVksUUFBQSxPQUFPLEdBQUcsVUFDckIsR0FBUyxFQUFFLElBQVMsRUFBRSxPQUFZO0lBQWxDLG9CQUFBLEVBQUEsU0FBUztJQUFFLHFCQUFBLEVBQUEsU0FBUztJQUFFLHdCQUFBLEVBQUEsWUFBWTtJQUVsQyxPQUFPLGVBQU8sQ0FBSSxRQUFRLGFBQVEsR0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDaEUsQ0FBQyxDQUFBO0FBQ1ksUUFBQSxRQUFRLEdBQUcsVUFDdEIsR0FBUyxFQUFFLElBQVM7SUFBcEIsb0JBQUEsRUFBQSxTQUFTO0lBQUUscUJBQUEsRUFBQSxTQUFTO0lBRXBCLE9BQU8sZUFBTyxDQUFJLFFBQVEsYUFBUSxHQUFHLGlCQUFZLFFBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDNUUsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2VudidcclxuaW1wb3J0IHV0aWwgZnJvbSAnLi4vdXRpbHMvdXRpbCdcclxuaW1wb3J0IHsgRGVmaW5pdGlvbkluZm9BbmRCb3VuZFNwYW5SZXBvbnNlIH0gZnJvbSAnLi4vLi4vJG5vZGVfbW9kdWxlcy90eXBlc2NyaXB0L2xpYi9wcm90b2NvbCdcclxuXHJcbmNvbnN0IHsgQkFTRV9VUkwsIFNUT1JFX0lEIH0gPSBjb25maWdcclxuY29uc3QgQVBQID0gZ2V0QXBwPElBcHBPcHRpb24+KClcclxuXHJcbmZ1bmN0aW9uIHN1Y2Nlc3NfaGFuZGxlPFQ+KFxyXG4gIHJlczogSV9yZXBvbnNlPFQ+XHJcbik6IFQgfCBudWxsIHtcclxuICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgY29uc3QgeyBjb2RlLCBkYXRhLCBtZXNzYWdlIH0gPSByZXMuZGF0YVxyXG4gIGlmIChjb2RlID09PSAyMDApIHtcclxuICAgIHJldHVybiBkYXRhXHJcbiAgfSBlbHNlIGlmIChjb2RlID09PSA0MDMpIHtcclxuICAgIEFQUC5nbG9iYWxEYXRhLmNhbl9yZWcgPSB0cnVlXHJcbiAgICB1dGlsLnd4X2VycihtZXNzYWdlLCAnbG9naW4nKVxyXG4gICAgcmV0dXJuIG51bGxcclxuICB9IGVsc2Uge1xyXG4gICAgdXRpbC53eF9lcnIobWVzc2FnZSlcclxuICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmYWlsX2hhbmRsZShcclxuICBlcnI6IElfcmVwb25zZV9lcnJcclxuKTogbnVsbCB7XHJcbiAgY29uc29sZS5sb2coZXJyLmVyck1zZylcclxuICB1dGlsLnd4X2Vycign572R57uc5Ye66ZSZ5LqGIScpXHJcbiAgcmV0dXJuIG51bGxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlcXVlc3QgPSA8VD4oXHJcbiAgdXJsOiBzdHJpbmcsXHJcbiAgZGF0YXM/OiBhbnksXHJcbiAgbWV0aG9kOiBUX21ldGhvZCA9ICdHRVQnLFxyXG4gIGhlYWRlcnMgPSB7fVxyXG4pOiBQcm9taXNlPFQgfCBudWxsPiA9PiB7XHJcbiAgY29uc3QgaGVhZGVyID0ge1xyXG4gICAgQXV0aG9yaXphdGlvbjogJ0JlYXJlciAnICsgQVBQLmdsb2JhbERhdGEudG9rZW4sXHJcbiAgICAuLi5oZWFkZXJzXHJcbiAgfVxyXG4gIGNvbnN0IGRhdGEgPSB7XHJcbiAgICBzdG9yZUlkOiBTVE9SRV9JRCxcclxuICAgIC4uLmRhdGFzXHJcbiAgfVxyXG4gIGNvbnN0IHd4X3JlcXVlc3QgPSBuZXcgUHJvbWlzZTxUIHwgbnVsbD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybCxcclxuICAgICAgZGF0YSxcclxuICAgICAgbWV0aG9kLFxyXG4gICAgICBoZWFkZXIsXHJcbiAgICAgIHN1Y2Nlc3M6IChyZXM6IFRfd3hfcmVzPFQ+KSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBmYWlsOiAoZXJyKSA9PiByZWplY3QoZXJyKSxcclxuICAgICAgLy8gY29tcGxldGU6IHd4LmhpZGVMb2FkaW5nIC8vIOWmguS9leaKimxvYWRpbmflhpnlnKjlhazlhbHmlrnms5Xph4xcclxuICAgIH0pXHJcbiAgfSlcclxuICAvLyAudGhlbigocmVzOiBJX3JlcG9uc2U8VD4pID0+IHN1Y2Nlc3NfaGFuZGxlKHJlcykpXHJcbiAgLy8gLmNhdGNoKGZhaWxfaGFuZGxlKVxyXG4gIHJldHVybiB3eF9yZXF1ZXN0XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhcGlfZ2V0ID0gPFQ+KFxyXG4gIHVybCA9ICcvJywgZGF0YSA9IHt9LCBoZWFkZXJzID0ge31cclxuKTogUHJvbWlzZTxUIHwgbnVsbD4gPT4ge1xyXG4gIHJldHVybiByZXF1ZXN0KGAke0JBU0VfVVJMfS9hcGkvJHt1cmx9YCwgZGF0YSwgJ0dFVCcsIGhlYWRlcnMpXHJcbn1cclxuZXhwb3J0IGNvbnN0IGFwaV9wb3N0ID0gPFQ+KFxyXG4gIHVybCA9ICcvJywgZGF0YSA9IHt9XHJcbik6IFByb21pc2U8VCB8IG51bGw+ID0+IHtcclxuICByZXR1cm4gcmVxdWVzdChgJHtCQVNFX1VSTH0vYXBpLyR7dXJsfT9zdG9yZUlkPSR7U1RPUkVfSUR9YCwgZGF0YSwgJ1BPU1QnKVxyXG59XHJcblxyXG50eXBlIFRfbWV0aG9kID0gJ0dFVCcgfCAnUE9TVCdcclxudHlwZSBUX3d4X3JlcyA9IFdlY2hhdE1pbmlwcm9ncmFtLlJlcXVlc3RTdWNjZXNzQ2FsbGJhY2tSZXN1bHQ8c3RyaW5nIHwgUmVjb3JkPHN0cmluZywgYW55PiB8IEFycmF5QnVmZmVyPlxyXG5pbnRlcmZhY2UgSV9yZXBvbnNlPFQ+IHtcclxuICBkYXRhOiB7XHJcbiAgICBjb2RlOiBudW1iZXJcclxuICAgIG1lc3NhZ2U6IHN0cmluZ1xyXG4gICAgZGF0YTogVFxyXG4gIH1cclxufVxyXG5pbnRlcmZhY2UgSV9yZXBvbnNlX2VyciB7XHJcbiAgZXJyTXNnOiBzdHJpbmdcclxufSJdfQ==