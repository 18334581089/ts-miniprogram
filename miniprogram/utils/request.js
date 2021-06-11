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
var success_handle = function (res) {
    console.log(res);
    var code = res.data.code;
    if (code === 200) {
        return res.data.data || res.data;
    }
    else {
        util_1.default.wx_err(res.data.message);
        if (code === 403) {
            util_1.default.wx_nav('login');
            getApp().globalData.can_reg = true;
        }
        return null;
    }
};
var fail_handle = function (err) {
    console.log(err);
    util_1.default.wx_err('网络出错了!');
    return null;
};
exports.request = function (url, datas, method, headers) {
    if (method === void 0) { method = 'GET'; }
    if (headers === void 0) { headers = {}; }
    var header = __assign({ Authorization: 'Bearer ' + APP.globalData.token }, headers);
    var data = __assign({ storeId: STORE_ID }, datas);
    var request = new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: method,
            header: header,
            success: function (res) { return resolve(res); },
            fail: function (err) { return reject(err); },
        });
    })
        .then(success_handle)
        .catch(fail_handle);
    return request;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBMEI7QUFDMUIsc0NBQWdDO0FBRXhCLElBQUEsUUFBUSxHQUFlLGFBQU0sU0FBckIsRUFBRSxRQUFRLEdBQUssYUFBTSxTQUFYLENBQVc7QUFDckMsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFHaEMsSUFBTSxjQUFjLEdBQUcsVUFBQyxHQUFRO0lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDaEIsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDMUIsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1FBQ2hCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQTtLQUNqQztTQUFNO1FBQ0wsY0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzdCLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtZQUNoQixjQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3BCLE1BQU0sRUFBYyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO1NBQy9DO1FBQ0QsT0FBTyxJQUFJLENBQUE7S0FDWjtBQUNILENBQUMsQ0FBQTtBQUVELElBQU0sV0FBVyxHQUFHLFVBQUMsR0FBUTtJQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2hCLGNBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDckIsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDLENBQUE7QUFFWSxRQUFBLE9BQU8sR0FBRyxVQUNyQixHQUFXLEVBQ1gsS0FBVyxFQUNYLE1BQXNCLEVBQ3RCLE9BQVk7SUFEWix1QkFBQSxFQUFBLGNBQXNCO0lBQ3RCLHdCQUFBLEVBQUEsWUFBWTtJQUVaLElBQU0sTUFBTSxjQUNWLGFBQWEsRUFBRSxTQUFTLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQzVDLE9BQU8sQ0FDWCxDQUFBO0lBQ0QsSUFBTSxJQUFJLGNBQ1IsT0FBTyxFQUFFLFFBQVEsSUFDZCxLQUFLLENBQ1QsQ0FBQTtJQUNELElBQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFXLFVBQUMsT0FBTyxFQUFFLE1BQU07UUFDcEQsRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNULEdBQUcsS0FBQTtZQUNILElBQUksTUFBQTtZQUNKLE1BQU0sUUFBQTtZQUNOLE1BQU0sUUFBQTtZQUNOLE9BQU8sRUFBRSxVQUFDLEdBQVEsSUFBSyxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBWixDQUFZO1lBQ25DLElBQUksRUFBRSxVQUFDLEdBQUcsSUFBSyxPQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBWCxDQUFXO1NBRTNCLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQztTQUNDLElBQUksQ0FBQyxjQUFjLENBQUM7U0FDcEIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3JCLE9BQU8sT0FBTyxDQUFBO0FBQ2hCLENBQUMsQ0FBQTtBQUVZLFFBQUEsT0FBTyxHQUFHLFVBQ3JCLEdBQVMsRUFBRSxJQUFTLEVBQUUsT0FBWTtJQUFsQyxvQkFBQSxFQUFBLFNBQVM7SUFBRSxxQkFBQSxFQUFBLFNBQVM7SUFBRSx3QkFBQSxFQUFBLFlBQVk7SUFFbEMsT0FBTyxlQUFPLENBQUksUUFBUSxhQUFRLEdBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ2hFLENBQUMsQ0FBQTtBQUNZLFFBQUEsUUFBUSxHQUFHLFVBQ3RCLEdBQVMsRUFBRSxJQUFTO0lBQXBCLG9CQUFBLEVBQUEsU0FBUztJQUFFLHFCQUFBLEVBQUEsU0FBUztJQUVwQixPQUFPLGVBQU8sQ0FBSSxRQUFRLGFBQVEsR0FBRyxpQkFBWSxRQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQzVFLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25maWcgZnJvbSAnLi9lbnYnXHJcbmltcG9ydCB1dGlsIGZyb20gJy4uL3V0aWxzL3V0aWwnXHJcblxyXG5jb25zdCB7IEJBU0VfVVJMLCBTVE9SRV9JRCB9ID0gY29uZmlnXHJcbmNvbnN0IEFQUCA9IGdldEFwcDxJQXBwT3B0aW9uPigpXHJcbnR5cGUgTWV0aG9kID0gJ0dFVCcgfCAnUE9TVCdcclxuXHJcbmNvbnN0IHN1Y2Nlc3NfaGFuZGxlID0gKHJlczogYW55KSA9PiB7XHJcbiAgY29uc29sZS5sb2cocmVzKVxyXG4gIGNvbnN0IGNvZGUgPSByZXMuZGF0YS5jb2RlXHJcbiAgaWYgKGNvZGUgPT09IDIwMCkge1xyXG4gICAgcmV0dXJuIHJlcy5kYXRhLmRhdGEgfHwgcmVzLmRhdGFcclxuICB9IGVsc2Uge1xyXG4gICAgdXRpbC53eF9lcnIocmVzLmRhdGEubWVzc2FnZSlcclxuICAgIGlmIChjb2RlID09PSA0MDMpIHtcclxuICAgICAgdXRpbC53eF9uYXYoJ2xvZ2luJylcclxuICAgICAgZ2V0QXBwPElBcHBPcHRpb24+KCkuZ2xvYmFsRGF0YS5jYW5fcmVnID0gdHJ1ZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGxcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGZhaWxfaGFuZGxlID0gKGVycjogYW55KSA9PiB7XHJcbiAgY29uc29sZS5sb2coZXJyKVxyXG4gIHV0aWwud3hfZXJyKCfnvZHnu5zlh7rplJnkuoYhJylcclxuICByZXR1cm4gbnVsbFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVxdWVzdCA9IDxUPihcclxuICB1cmw6IHN0cmluZyxcclxuICBkYXRhcz86IGFueSxcclxuICBtZXRob2Q6IE1ldGhvZCA9ICdHRVQnLFxyXG4gIGhlYWRlcnMgPSB7fVxyXG4pOiBQcm9taXNlPFQgfCBudWxsPiA9PiB7XHJcbiAgY29uc3QgaGVhZGVyID0ge1xyXG4gICAgQXV0aG9yaXphdGlvbjogJ0JlYXJlciAnICsgQVBQLmdsb2JhbERhdGEudG9rZW4sXHJcbiAgICAuLi5oZWFkZXJzXHJcbiAgfVxyXG4gIGNvbnN0IGRhdGEgPSB7XHJcbiAgICBzdG9yZUlkOiBTVE9SRV9JRCxcclxuICAgIC4uLmRhdGFzXHJcbiAgfVxyXG4gIGNvbnN0IHJlcXVlc3QgPSBuZXcgUHJvbWlzZTxUIHwgbnVsbD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybCxcclxuICAgICAgZGF0YSxcclxuICAgICAgbWV0aG9kLFxyXG4gICAgICBoZWFkZXIsXHJcbiAgICAgIHN1Y2Nlc3M6IChyZXM6IGFueSkgPT4gcmVzb2x2ZShyZXMpLFxyXG4gICAgICBmYWlsOiAoZXJyKSA9PiByZWplY3QoZXJyKSxcclxuICAgICAgLy8gY29tcGxldGU6IHd4LmhpZGVMb2FkaW5nIC8vIOWmguS9leaKimxvYWRpbmflhpnlnKjlhazlhbHmlrnms5Xph4xcclxuICAgIH0pXHJcbiAgfSlcclxuICAgIC50aGVuKHN1Y2Nlc3NfaGFuZGxlKVxyXG4gICAgLmNhdGNoKGZhaWxfaGFuZGxlKVxyXG4gIHJldHVybiByZXF1ZXN0XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhcGlfZ2V0ID0gPFQ+KFxyXG4gIHVybCA9ICcvJywgZGF0YSA9IHt9LCBoZWFkZXJzID0ge31cclxuKTogUHJvbWlzZTxUIHwgbnVsbD4gPT4ge1xyXG4gIHJldHVybiByZXF1ZXN0KGAke0JBU0VfVVJMfS9hcGkvJHt1cmx9YCwgZGF0YSwgJ0dFVCcsIGhlYWRlcnMpXHJcbn1cclxuZXhwb3J0IGNvbnN0IGFwaV9wb3N0ID0gPFQ+KFxyXG4gIHVybCA9ICcvJywgZGF0YSA9IHt9XHJcbik6IFByb21pc2U8VCB8IG51bGw+ID0+IHtcclxuICByZXR1cm4gcmVxdWVzdChgJHtCQVNFX1VSTH0vYXBpLyR7dXJsfT9zdG9yZUlkPSR7U1RPUkVfSUR9YCwgZGF0YSwgJ1BPU1QnKVxyXG59XHJcbiJdfQ==