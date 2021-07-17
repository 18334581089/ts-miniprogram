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
    var wx_request2 = new Promise(function (resolve, _reject) {
        wx.request({
            url: url,
            success: function (res) {
                resolve(res.data.data);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBMEI7QUFDMUIsc0NBQWdDO0FBRXhCLElBQUEsUUFBUSxHQUFlLGFBQU0sU0FBckIsRUFBRSxRQUFRLEdBQUssYUFBTSxTQUFYLENBQVc7QUFDckMsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsU0FBUyxjQUFjLENBQ3JCLEdBQWlCO0lBRWpCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVixJQUFBLEtBQTBCLEdBQUcsQ0FBQyxJQUFJLEVBQWhDLElBQUksVUFBQSxFQUFFLElBQUksVUFBQSxFQUFFLE9BQU8sYUFBYSxDQUFBO0lBQ3hDLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtRQUNoQixPQUFPLElBQUksQ0FBQTtLQUNaO1NBQU0sSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1FBQ3ZCLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtRQUM3QixjQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUM3QixPQUFPLElBQUksQ0FBQTtLQUNaO1NBQU07UUFDTCxjQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3BCLE9BQU8sSUFBSSxDQUFBO0tBQ1o7QUFDSCxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQ2xCLEdBQWtCO0lBRWxCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZCLGNBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDckIsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDO0FBRVksUUFBQSxPQUFPLEdBQUcsVUFDckIsR0FBVyxFQUNYLEtBQVcsRUFDWCxNQUF3QixFQUN4QixPQUFZO0lBRFosdUJBQUEsRUFBQSxjQUF3QjtJQUN4Qix3QkFBQSxFQUFBLFlBQVk7SUFFWixJQUFNLE1BQU0sY0FDVixhQUFhLEVBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUM1QyxPQUFPLENBQ1gsQ0FBQTtJQUNELElBQU0sSUFBSSxjQUNSLE9BQU8sRUFBRSxRQUFRLElBQ2QsS0FBSyxDQUNULENBQUE7SUFDRCxJQUFNLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1FBQzdDLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDVCxHQUFHLEtBQUE7WUFDSCxJQUFJLE1BQUE7WUFDSixNQUFNLFFBQUE7WUFDTixNQUFNLFFBQUE7WUFHTixPQUFPLFlBQUMsR0FBRztnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDZCxDQUFDO1lBRUQsSUFBSSxFQUFFLFVBQUMsR0FBRyxJQUFLLE9BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFYLENBQVc7U0FFM0IsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7SUFHRixJQUFNLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBZ0IsVUFBVSxPQUFPLEVBQUUsT0FBTztRQUN2RSxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ1QsR0FBRyxLQUFBO1lBQ0gsT0FBTyxFQUFQLFVBQVEsR0FBdUI7Z0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3hCLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUNGLE9BQU8sVUFBVSxDQUFBO0FBQ25CLENBQUMsQ0FBQTtBQUVZLFFBQUEsT0FBTyxHQUFHLFVBQ3JCLEdBQVMsRUFBRSxJQUFTLEVBQUUsT0FBWTtJQUFsQyxvQkFBQSxFQUFBLFNBQVM7SUFBRSxxQkFBQSxFQUFBLFNBQVM7SUFBRSx3QkFBQSxFQUFBLFlBQVk7SUFFbEMsT0FBTyxlQUFPLENBQUksUUFBUSxhQUFRLEdBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ2hFLENBQUMsQ0FBQTtBQUNZLFFBQUEsUUFBUSxHQUFHLFVBQ3RCLEdBQVMsRUFBRSxJQUFTO0lBQXBCLG9CQUFBLEVBQUEsU0FBUztJQUFFLHFCQUFBLEVBQUEsU0FBUztJQUVwQixPQUFPLGVBQU8sQ0FBSSxRQUFRLGFBQVEsR0FBRyxpQkFBWSxRQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQzVFLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25maWcgZnJvbSAnLi9lbnYnXHJcbmltcG9ydCB1dGlsIGZyb20gJy4uL3V0aWxzL3V0aWwnXHJcblxyXG5jb25zdCB7IEJBU0VfVVJMLCBTVE9SRV9JRCB9ID0gY29uZmlnXHJcbmNvbnN0IEFQUCA9IGdldEFwcDxJQXBwT3B0aW9uPigpXHJcblxyXG5mdW5jdGlvbiBzdWNjZXNzX2hhbmRsZTxUPihcclxuICByZXM6IElfcmVwb25zZTxUPlxyXG4pOiBUIHwgbnVsbCB7XHJcbiAgY29uc29sZS5sb2cocmVzKVxyXG4gIGNvbnN0IHsgY29kZSwgZGF0YSwgbWVzc2FnZSB9ID0gcmVzLmRhdGFcclxuICBpZiAoY29kZSA9PT0gMjAwKSB7XHJcbiAgICByZXR1cm4gZGF0YVxyXG4gIH0gZWxzZSBpZiAoY29kZSA9PT0gNDAzKSB7XHJcbiAgICBBUFAuZ2xvYmFsRGF0YS5jYW5fcmVnID0gdHJ1ZVxyXG4gICAgdXRpbC53eF9lcnIobWVzc2FnZSwgJ2xvZ2luJylcclxuICAgIHJldHVybiBudWxsXHJcbiAgfSBlbHNlIHtcclxuICAgIHV0aWwud3hfZXJyKG1lc3NhZ2UpXHJcbiAgICByZXR1cm4gbnVsbFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZmFpbF9oYW5kbGUoXHJcbiAgZXJyOiBJX3JlcG9uc2VfZXJyXHJcbik6IG51bGwge1xyXG4gIGNvbnNvbGUubG9nKGVyci5lcnJNc2cpXHJcbiAgdXRpbC53eF9lcnIoJ+e9kee7nOWHuumUmeS6hiEnKVxyXG4gIHJldHVybiBudWxsXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXF1ZXN0ID0gPHJlc190PihcclxuICB1cmw6IHN0cmluZyxcclxuICBkYXRhcz86IGFueSxcclxuICBtZXRob2Q6IFRfbWV0aG9kID0gJ0dFVCcsXHJcbiAgaGVhZGVycyA9IHt9XHJcbikgPT4geyAgLy8gOiBQcm9taXNlPHJlc190IHwgbnVsbD5cclxuICBjb25zdCBoZWFkZXIgPSB7XHJcbiAgICBBdXRob3JpemF0aW9uOiAnQmVhcmVyICcgKyBBUFAuZ2xvYmFsRGF0YS50b2tlbixcclxuICAgIC4uLmhlYWRlcnNcclxuICB9XHJcbiAgY29uc3QgZGF0YSA9IHtcclxuICAgIHN0b3JlSWQ6IFNUT1JFX0lELFxyXG4gICAgLi4uZGF0YXNcclxuICB9XHJcbiAgY29uc3Qgd3hfcmVxdWVzdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICB1cmwsXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIG1ldGhvZCxcclxuICAgICAgaGVhZGVyLFxyXG4gICAgICAvLyBzdWNjZXNzOiAocmVzOiBUX3d4X3JlczxyZXNfdD4pID0+IHtcclxuICAgICAgLy8gc3VjY2VzcyAocmVzOiBQcm9taXNlTGlrZTxyZXNfdD4pIHtcclxuICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICByZXNvbHZlKHJlcylcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGZhaWw6IChlcnIpID0+IHJlamVjdChlcnIpLFxyXG4gICAgICAvLyBjb21wbGV0ZTogd3guaGlkZUxvYWRpbmcgLy8g5aaC5L2V5oqKbG9hZGluZ+WGmeWcqOWFrOWFseaWueazlemHjFxyXG4gICAgfSlcclxuICB9KVxyXG4gIC8vIC50aGVuKChyZXM6IElfcmVwb25zZTxUPikgPT4gc3VjY2Vzc19oYW5kbGUocmVzKSlcclxuICAvLyAuY2F0Y2goZmFpbF9oYW5kbGUpXHJcbiAgY29uc3Qgd3hfcmVxdWVzdDIgPSBuZXcgUHJvbWlzZTxudW1iZXIgfCBudWxsPihmdW5jdGlvbiAocmVzb2x2ZSwgX3JlamVjdCkge1xyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybCxcclxuICAgICAgc3VjY2VzcyhyZXM6IFRfcmVzcG9uc2U8bnVtYmVyPikge1xyXG4gICAgICAgIHJlc29sdmUocmVzLmRhdGEuZGF0YSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KVxyXG4gIHJldHVybiB3eF9yZXF1ZXN0XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhcGlfZ2V0ID0gPFQ+KFxyXG4gIHVybCA9ICcvJywgZGF0YSA9IHt9LCBoZWFkZXJzID0ge31cclxuKTogUHJvbWlzZTxUIHwgbnVsbD4gPT4ge1xyXG4gIHJldHVybiByZXF1ZXN0KGAke0JBU0VfVVJMfS9hcGkvJHt1cmx9YCwgZGF0YSwgJ0dFVCcsIGhlYWRlcnMpXHJcbn1cclxuZXhwb3J0IGNvbnN0IGFwaV9wb3N0ID0gPFQ+KFxyXG4gIHVybCA9ICcvJywgZGF0YSA9IHt9XHJcbik6IFByb21pc2U8VCB8IG51bGw+ID0+IHtcclxuICByZXR1cm4gcmVxdWVzdChgJHtCQVNFX1VSTH0vYXBpLyR7dXJsfT9zdG9yZUlkPSR7U1RPUkVfSUR9YCwgZGF0YSwgJ1BPU1QnKVxyXG59XHJcblxyXG5pbnRlcmZhY2Ugd3hfc3VjY2VzcyA8VD57XHJcbiAgY29kZTogbnVtYmVyLFxyXG4gIGRhdGE6IFQsIFxyXG4gIG1lc3NhZ2U6IHN0cmluZ1xyXG59XHJcbnR5cGUgVF9yZXNwb25zZTxUPiA9IFdlY2hhdE1pbmlwcm9ncmFtLlJlcXVlc3RTdWNjZXNzQ2FsbGJhY2tSZXN1bHQ8d3hfc3VjY2VzczxUPj5cclxudHlwZSBUX21ldGhvZCA9ICdHRVQnIHwgJ1BPU1QnXHJcbnR5cGUgVF93eF9yZXM8VD4gPSBXZWNoYXRNaW5pcHJvZ3JhbS5SZXF1ZXN0U3VjY2Vzc0NhbGxiYWNrUmVzdWx0PFQ+XHJcbmludGVyZmFjZSBJX3JlcG9uc2U8VD4ge1xyXG4gIGRhdGE6IHtcclxuICAgIGNvZGU6IG51bWJlclxyXG4gICAgbWVzc2FnZTogc3RyaW5nXHJcbiAgICBkYXRhOiBUXHJcbiAgfVxyXG59XHJcbmludGVyZmFjZSBJX3JlcG9uc2VfZXJyIHtcclxuICBlcnJNc2c6IHN0cmluZ1xyXG59Il19