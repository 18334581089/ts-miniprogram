"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var page_tabBar = ['index', 'expert', 'user'];
var APP = getApp();
var duration = 1500;
var wx_load = function (title) {
    if (title === void 0) { title = '加载中'; }
    wx.showLoading({ title: title });
};
var wx_load_hide = function () {
    wx.hideLoading();
};
var cur_tip_loading = false;
var wx_tip = function (title, icon, handle) {
    if (cur_tip_loading) {
        wx.hideToast();
    }
    cur_tip_loading = true;
    wx.showToast({
        title: title,
        icon: icon || 'none',
        duration: duration,
        mask: true
    });
    var time_id = setTimeout(function () {
        if (handle) {
            if (typeof handle === 'string') {
                wx_nav(handle);
            }
            else {
                handle();
            }
        }
        clearTimeout(time_id);
        cur_tip_loading = false;
    }, 1400);
};
var wx_err = function (title, handle) {
    if (title === void 0) { title = '出错了'; }
    wx_tip(title, 'none', handle);
};
var wx_success = function (title, handle) {
    if (title === void 0) { title = '成功了'; }
    wx_tip(title, 'success', handle);
};
var wx_tip_mask = function (title) {
    if (cur_tip_loading) {
        wx.hideToast();
    }
    cur_tip_loading = true;
    wx.showToast({
        title: title,
        duration: 1500,
        icon: 'none'
    });
    var time_id = setTimeout(function () {
        clearTimeout(time_id);
        cur_tip_loading = false;
    }, 1400);
};
var wx_nav = function (page, is_relaunch) {
    if (is_relaunch === void 0) { is_relaunch = false; }
    if (page === 'login') {
        if (APP.globalData.cur_login) {
            return;
        }
        else {
            APP.globalData.cur_login = true;
        }
    }
    var option = {
        url: "/pages/" + page + "/" + page
    };
    if (is_relaunch) {
        wx.reLaunch(option);
    }
    else if (page_tabBar.includes(page)) {
        wx.switchTab(option);
    }
    else {
        wx.navigateTo(option);
    }
};
var wx_code = function () {
    return new Promise(function (resolve, reject) {
        var fail = function () {
            wx.showToast({
                title: '出错了!'
            });
            reject(null);
        };
        wx.login({
            success: function (res) {
                if (res.code) {
                    resolve(res.code);
                }
                else {
                    fail();
                }
            },
            fail: fail
        });
    });
};
exports.default = {
    wx_load: wx_load,
    wx_load_hide: wx_load_hide,
    wx_tip: wx_tip,
    wx_err: wx_err,
    wx_success: wx_success,
    wx_tip_mask: wx_tip_mask,
    wx_code: wx_code,
    wx_nav: wx_nav
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3hfYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3hfYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQy9DLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBQ2hDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQTtBQU9yQixJQUFNLE9BQU8sR0FBRyxVQUFDLEtBQWE7SUFBYixzQkFBQSxFQUFBLGFBQWE7SUFDNUIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUMsQ0FBQTtBQUMzQixDQUFDLENBQUE7QUFJRCxJQUFNLFlBQVksR0FBRztJQUNuQixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7QUFDbEIsQ0FBQyxDQUFBO0FBUUQsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFBO0FBQzNCLElBQU0sTUFBTSxHQUFHLFVBQ2IsS0FBYSxFQUNiLElBQW1CLEVBQ25CLE1BQWU7SUFFZixJQUFJLGVBQWUsRUFBRTtRQUNuQixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUE7S0FDZjtJQUNELGVBQWUsR0FBRyxJQUFJLENBQUE7SUFDdEIsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUNYLEtBQUssT0FBQTtRQUNMLElBQUksRUFBRSxJQUFJLElBQUksTUFBTTtRQUNwQixRQUFRLFVBQUE7UUFDUixJQUFJLEVBQUUsSUFBSTtLQUNYLENBQUMsQ0FBQTtJQUVGLElBQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUN6QixJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO2dCQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7YUFDZjtpQkFBTTtnQkFDTCxNQUFNLEVBQUUsQ0FBQTthQUNUO1NBQ0Y7UUFDRCxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDckIsZUFB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ZXInXVxyXG5jb25zdCBBUFAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxyXG5jb25zdCBkdXJhdGlvbiA9IDE1MDBcclxudHlwZSBUX2ljb24gPSAnc3VjY2VzcycgfCAnZXJyb3InIHwgJ2xvYWRpbmcnIHwgJ25vbmUnXHJcblxyXG4vKipcclxuICog6buY6K6kLCDliqDovb3kuK1cclxuICogQHBhcmFtIHRpdGxlIOaPkOekuuWGheWuuVxyXG4gKi9cclxuY29uc3Qgd3hfbG9hZCA9ICh0aXRsZSA9ICfliqDovb3kuK0nKTogdm9pZCA9PiB7XHJcbiAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZSB9KVxyXG59XHJcbi8qKlxyXG4gKiDlj5bmtojliqDovb1cclxuICovXHJcbmNvbnN0IHd4X2xvYWRfaGlkZSA9ICgpOiB2b2lkID0+IHtcclxuICB3eC5oaWRlTG9hZGluZygpXHJcbn1cclxuLyoqXHJcbiAqIOaPkOekuiwxLjVz5ZCO6Ieq5Yqo5YWz6ZetXHJcbiAqIEBwYXJhbSB0aXRsZSDmj5DnpLrlhoXlrrlcclxuICogQHBhcmFtIGljb24g5o+Q56S6aWNvblxyXG4gKiBAcGFyYW0gaGFuZGxlIOaPkOekuue7k+adn+WQjueahOWbnuiwg+WHveaVsFxyXG4gKi9cclxudHlwZSBUaGFuZGxlID0gc3RyaW5nIHwgRnVuY3Rpb24gfCB2b2lkXHJcbmxldCBjdXJfdGlwX2xvYWRpbmcgPSBmYWxzZVxyXG5jb25zdCB3eF90aXAgPSAoXHJcbiAgdGl0bGU6IHN0cmluZyxcclxuICBpY29uOiBUX2ljb24gfCB2b2lkLFxyXG4gIGhhbmRsZTogVGhhbmRsZVxyXG4pOiB2b2lkID0+IHtcclxuICBpZiAoY3VyX3RpcF9sb2FkaW5nKSB7XHJcbiAgICB3eC5oaWRlVG9hc3QoKVxyXG4gIH1cclxuICBjdXJfdGlwX2xvYWRpbmcgPSB0cnVlXHJcbiAgd3guc2hvd1RvYXN0KHtcclxuICAgIHRpdGxlLFxyXG4gICAgaWNvbjogaWNvbiB8fCAnbm9uZScsXHJcbiAgICBkdXJhdGlvbixcclxuICAgIG1hc2s6IHRydWVcclxuICB9KVxyXG4gIC8vIOi/memHjOaciWJ1ZyzlnKgxLjXnp5LlhoXlho3mrKHlj5Hlh7rkuIDkuKp0aXBcclxuICBjb25zdCB0aW1lX2lkID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBpZiAoaGFuZGxlKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgaGFuZGxlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHd4X25hdihoYW5kbGUpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaGFuZGxlKClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVfaWQpXHJcbiAgICBjdXJfdGlwX2xvYWRpbmcgPSBmYWxzZVxyXG4gIH0sIDE0MDApXHJcbn1cclxuY29uc3Qgd3hfZXJyID0gKFxyXG4gIHRpdGxlOiBzdHJpbmcgPSAn5Ye66ZSZ5LqGJyxcclxuICBoYW5kbGU6IFRoYW5kbGVcclxuKTogdm9pZCA9PiB7XHJcbiAgd3hfdGlwKHRpdGxlLCAnbm9uZScsIGhhbmRsZSlcclxufVxyXG5jb25zdCB3eF9zdWNjZXNzID0gKFxyXG4gIHRpdGxlOiBzdHJpbmcgPSAn5oiQ5Yqf5LqGJyxcclxuICBoYW5kbGU6IFRoYW5kbGVcclxuKTogdm9pZCA9PiB7XHJcbiAgd3hfdGlwKHRpdGxlLCAnc3VjY2VzcycsIGhhbmRsZSlcclxufVxyXG5jb25zdCB3eF90aXBfbWFzayA9ICh0aXRsZTogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgaWYgKGN1cl90aXBfbG9hZGluZykge1xyXG4gICAgd3guaGlkZVRvYXN0KClcclxuICB9XHJcbiAgY3VyX3RpcF9sb2FkaW5nID0gdHJ1ZVxyXG4gIHd4LnNob3dUb2FzdCh7XHJcbiAgICB0aXRsZSxcclxuICAgIGR1cmF0aW9uOiAxNTAwLFxyXG4gICAgaWNvbjogJ25vbmUnXHJcbiAgfSlcclxuICAvLyDov5nph4zmnIlidWcs5ZyoMS4156eS5YaF5YaN5qyh5Y+R5Ye65LiA5LiqdGlwXHJcbiAgY29uc3QgdGltZV9pZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVfaWQpXHJcbiAgICBjdXJfdGlwX2xvYWRpbmcgPSBmYWxzZVxyXG4gIH0sIDE0MDApXHJcbn1cclxuLyoqXHJcbiAqIOi3s+i9rFxyXG4gKiBAcGFyYW0gcGFnZSDpobXpnaLlkI3np7BcclxuICogQHBhcmFtIGlzX3JlbGF1bmNoIOaYr+WQpuWFs+mXreaJgOaciemhtemdolxyXG4gKiDlkI7mnJ8gaXNfcmVsYXVuY2gg5YGa5aSE55CGLOaYr+WPguaVsOi/mOaYr+WFs+mXreaJgOaciemhtemdolxyXG4gKi9cclxuY29uc3Qgd3hfbmF2ID0gKFxyXG4gIHBhZ2U6IHN0cmluZyxcclxuICBpc19yZWxhdW5jaCA9IGZhbHNlXHJcbikgPT4ge1xyXG4gIGlmIChwYWdlID09PSAnbG9naW4nKSB7XHJcbiAgICBpZiAoQVBQLmdsb2JhbERhdGEuY3VyX2xvZ2luKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgQVBQLmdsb2JhbERhdGEuY3VyX2xvZ2luID0gdHJ1ZVxyXG4gICAgfVxyXG4gIH1cclxuICBjb25zdCBvcHRpb24gPSB7XHJcbiAgICB1cmw6IGAvcGFnZXMvJHtwYWdlfS8ke3BhZ2V9YFxyXG4gIH1cclxuICBpZiAoaXNfcmVsYXVuY2gpIHtcclxuICAgIHd4LnJlTGF1bmNoKG9wdGlvbilcclxuICB9IGVsc2UgaWYgKHBhZ2VfdGFiQmFyLmluY2x1ZGVzKHBhZ2UpKSB7XHJcbiAgICB3eC5zd2l0Y2hUYWIob3B0aW9uKVxyXG4gIH0gZWxzZSB7XHJcbiAgICB3eC5uYXZpZ2F0ZVRvKG9wdGlvbilcclxuICB9XHJcbn1cclxuXHJcbi8vIOWwgeijheWIsHd4X2FwaemHjOmdolxyXG5jb25zdCB3eF9jb2RlID0gKCkgPT4ge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmcgfCBudWxsPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjb25zdCBmYWlsID0gKCkgPT4ge1xyXG4gICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgIHRpdGxlOiAn5Ye66ZSZ5LqGISdcclxuICAgICAgfSlcclxuICAgICAgcmVqZWN0KG51bGwpXHJcbiAgICB9XHJcbiAgICB3eC5sb2dpbih7XHJcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgaWYgKHJlcy5jb2RlKSB7XHJcbiAgICAgICAgICByZXNvbHZlKHJlcy5jb2RlKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmYWlsKClcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWxcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHd4X2xvYWQsXHJcbiAgd3hfbG9hZF9oaWRlLFxyXG4gIHd4X3RpcCxcclxuICB3eF9lcnIsXHJcbiAgd3hfc3VjY2VzcyxcclxuICB3eF90aXBfbWFzayxcclxuICB3eF9jb2RlLFxyXG4gIHd4X25hdlxyXG59XHJcbiJdfQ==