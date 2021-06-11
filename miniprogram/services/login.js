"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("../utils/request");
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
var data1 = {
    "deptId": "wk",
    "deptName": "外科",
    "remark": "",
    "projectId": "2009102243520023241979",
    "projectName": "三级",
    "patientPhone": "13600000002",
    "patientName": "222",
    "sex": "UNKNOWN"
};
exports.default = {
    wx_code: wx_code,
    login: function (params) {
        return request_1.api_post("channelRegisterlogin", params);
    },
    decrypt: function (params) {
        return request_1.api_get("channelDecryptPhoneNumber", params);
    },
    fn1: function () {
        return request_1.api_get("channel/channelDeclarationList");
    },
    fn11: function () {
        return request_1.api_get("channel/hisDepart");
    },
    fn2: function () {
        return request_1.api_post("channel/addChannelDeclaration", data1);
    },
    fn3: function () {
        return request_1.api_get("channel/hisIntentProjects/" + 10);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUFvRDtBQWFwRCxJQUFNLE9BQU8sR0FBRztJQUNkLE9BQU8sSUFBSSxPQUFPLENBQWdCLFVBQUMsT0FBTyxFQUFFLE1BQU07UUFDaEQsSUFBTSxJQUFJLEdBQUc7WUFDWCxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxNQUFNO2FBQ2QsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2QsQ0FBQyxDQUFBO1FBQ0QsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNQLE9BQU8sWUFBQyxHQUFHO2dCQUNULElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtvQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO2lCQUNsQjtxQkFBTTtvQkFDTCxJQUFJLEVBQUUsQ0FBQTtpQkFDUDtZQUNILENBQUM7WUFDRCxJQUFJLE1BQUE7U0FDTCxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUNELElBQU0sS0FBSyxHQUFHO0lBQ1osUUFBUSxFQUFDLElBQUk7SUFDYixVQUFVLEVBQUMsSUFBSTtJQUNmLFFBQVEsRUFBQyxFQUFFO0lBQ1gsV0FBVyxFQUFDLHdCQUF3QjtJQUNwQyxhQUFhLEVBQUMsSUFBSTtJQUNsQixjQUFjLEVBQUMsYUFBYTtJQUM1QixhQUFhLEVBQUMsS0FBSztJQUNuQixLQUFLLEVBQUMsU0FBUztDQUNmLENBQUE7QUFDRixrQkFBZTtJQUNiLE9BQU8sU0FBQTtJQUNQLEtBQUssRUFBTCxVQUFNLE1BQXdCO1FBQzVCLE9BQU8sa0JBQVEsQ0FBZ0Isc0JBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDaEUsQ0FBQztJQUNELE9BQU8sRUFBUCxVQUFRLE1BQWlCO1FBQ3ZCLE9BQU8saUJBQU8sQ0FBUywyQkFBMkIsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0lBQ0QsR0FBRyxFQUFIO1FBQ0UsT0FBTyxpQkFBTyxDQUFNLGdDQUFnQyxDQUFDLENBQUE7SUFDdkQsQ0FBQztJQUNELElBQUksRUFBSjtRQUNFLE9BQU8saUJBQU8sQ0FBTSxtQkFBbUIsQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFDRCxHQUFHLEVBQUg7UUFDRSxPQUFPLGtCQUFRLENBQU0sK0JBQStCLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQUNELEdBQUcsRUFBSDtRQUNFLE9BQU8saUJBQU8sQ0FBTSwrQkFBNkIsRUFBSSxDQUFDLENBQUE7SUFDeEQsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcGlfZ2V0LCBhcGlfcG9zdCB9IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGxvZ2luQmFja0RhdGEge1xyXG5cclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIGxvZ2luUmVxdWVzdERhdGEge1xyXG5cclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElQZGVjcnlwdCB7XHJcbiAgaXY6IHN0cmluZyxcclxuICBlbmNyeXB0ZWQ6IHN0cmluZyxcclxuICBjb2RlOiBzdHJpbmdcclxufVxyXG5jb25zdCB3eF9jb2RlID0gKCkgPT4ge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmcgfCBudWxsPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjb25zdCBmYWlsID0gKCkgPT4ge1xyXG4gICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgIHRpdGxlOiAn5Ye66ZSZ5LqGISdcclxuICAgICAgfSlcclxuICAgICAgcmVqZWN0KG51bGwpXHJcbiAgICB9XHJcbiAgICB3eC5sb2dpbih7XHJcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgaWYgKHJlcy5jb2RlKSB7XHJcbiAgICAgICAgICByZXNvbHZlKHJlcy5jb2RlKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmYWlsKClcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWxcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5jb25zdCBkYXRhMSA9IHtcclxuICBcImRlcHRJZFwiOlwid2tcIixcclxuICBcImRlcHROYW1lXCI6XCLlpJbnp5FcIixcclxuICBcInJlbWFya1wiOlwiXCIsIFxyXG4gIFwicHJvamVjdElkXCI6XCIyMDA5MTAyMjQzNTIwMDIzMjQxOTc5XCIsXHJcbiAgXCJwcm9qZWN0TmFtZVwiOlwi5LiJ57qnXCIsXHJcbiAgXCJwYXRpZW50UGhvbmVcIjpcIjEzNjAwMDAwMDAyXCIsXHJcbiAgXCJwYXRpZW50TmFtZVwiOlwiMjIyXCIsXHJcbiAgXCJzZXhcIjpcIlVOS05PV05cIlxyXG4gfVxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgd3hfY29kZSxcclxuICBsb2dpbihwYXJhbXM6IGxvZ2luUmVxdWVzdERhdGEpIHtcclxuICAgIHJldHVybiBhcGlfcG9zdDxsb2dpbkJhY2tEYXRhPihgY2hhbm5lbFJlZ2lzdGVybG9naW5gLCBwYXJhbXMpXHJcbiAgfSxcclxuICBkZWNyeXB0KHBhcmFtczogSVBkZWNyeXB0KSB7XHJcbiAgICByZXR1cm4gYXBpX2dldDxzdHJpbmc+KGBjaGFubmVsRGVjcnlwdFBob25lTnVtYmVyYCwgcGFyYW1zKVxyXG4gIH0sXHJcbiAgZm4xICgpIHtcclxuICAgIHJldHVybiBhcGlfZ2V0PGFueT4oYGNoYW5uZWwvY2hhbm5lbERlY2xhcmF0aW9uTGlzdGApXHJcbiAgfSxcclxuICBmbjExICgpIHtcclxuICAgIHJldHVybiBhcGlfZ2V0PGFueT4oYGNoYW5uZWwvaGlzRGVwYXJ0YClcclxuICB9LFxyXG4gIGZuMiAoKSB7XHJcbiAgICByZXR1cm4gYXBpX3Bvc3Q8YW55PihgY2hhbm5lbC9hZGRDaGFubmVsRGVjbGFyYXRpb25gLCBkYXRhMSlcclxuICB9LFxyXG4gIGZuMyAoKSB7XHJcbiAgICByZXR1cm4gYXBpX2dldDxhbnk+KGBjaGFubmVsL2hpc0ludGVudFByb2plY3RzLyR7MTB9YClcclxuICB9LFxyXG59Il19