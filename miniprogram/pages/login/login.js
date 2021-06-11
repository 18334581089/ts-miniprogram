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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_login_1 = require("../../services/api_login");
var util_1 = require("../../utils/util");
var APP = getApp();
var DESC = '用于完善您的用户资料';
Page({
    data: {
        canIUseGetUserProfile: true,
        has_user_info: false,
        can_reg: APP.globalData.can_reg
    },
    onLoad: function () {
        this.login2();
    },
    onLoginClick: function () {
        var _this = this;
        wx.getUserProfile({
            desc: DESC,
            success: function (res) {
                APP.globalData.userInfo = res.userInfo;
                util_1.default.wx_err('首次登录需要绑定您的手机号!');
                _this.setData({ has_user_info: true });
            },
            fail: function (err) {
                console.log(err);
                wx.showToast({
                    title: '获取失败!',
                    icon: 'none'
                });
            },
            complete: function () {
            }
        });
    },
    handle_login: function (e) {
        console.log(e);
    },
    on_login_btn: function () {
        var _this = this;
        wx.getUserProfile({
            desc: DESC,
            success: function (res) {
                APP.globalData.userInfo = res.userInfo;
                wx.setStorageSync('userInfo', res.userInfo);
                util_1.default.wx_tip('首次登录需要绑定您的手机号!');
                _this.setData({ has_user_info: true });
            },
            fail: function () {
                util_1.default.wx_err('获取失败!');
            }
        });
    },
    handle_data: function (data) {
        if (data) {
            APP.globalData.token = data.token;
            var page_name = data.isBinding === 'YES' ? 'index' : 'auth';
            util_1.default.wx_nav(page_name);
        }
        else {
            this.handle_fail();
        }
    },
    handle_fail: function () {
        this.setData({
            can_reg: APP.globalData.can_reg,
            canIUseGetUserProfile: wx.getUserProfile !== undefined,
            has_user_info: APP.globalData.userInfo !== null
        });
    },
    onGetPhoneClick: function (_a) {
        var detail = _a.detail;
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_b) {
                if (APP.globalData.userInfo) {
                    params = {
                        code: '',
                        iv: detail.iv,
                        encrypted: detail.encryptedData,
                        img: APP.globalData.userInfo.avatarUrl,
                        nickname: APP.globalData.userInfo.nickName,
                        sex: util_1.default.format_sex(APP.globalData.userInfo.gender)
                    };
                    this.login3(params);
                }
                else {
                    util_1.default.wx_err('数据异常!');
                    this.setData({
                        has_user_info: false
                    });
                }
                return [2];
            });
        });
    },
    login3: function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var code, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        util_1.default.wx_load('正在登陆...');
                        return [4, util_1.default.wx_code()];
                    case 1:
                        code = _a.sent();
                        if (!code) return [3, 3];
                        return [4, api_login_1.default.login3(__assign(__assign({}, params), { code: code }))];
                    case 2:
                        data = _a.sent();
                        util_1.default.wx_load_hide();
                        this.handle_data(data);
                        return [3, 4];
                    case 3:
                        util_1.default.wx_load_hide();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    },
    login2: function () {
        return __awaiter(this, void 0, void 0, function () {
            var code, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        util_1.default.wx_load('正在登陆...');
                        return [4, util_1.default.wx_code()];
                    case 1:
                        code = _a.sent();
                        if (!code) return [3, 3];
                        return [4, api_login_1.default.login2(code)];
                    case 2:
                        data = _a.sent();
                        util_1.default.wx_load_hide();
                        this.handle_data(data);
                        return [3, 4];
                    case 3:
                        util_1.default.wx_load_hide();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQStEO0FBQy9ELHlDQUFtQztBQUNuQyxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQTtBQUNoQyxJQUFNLElBQUksR0FBRyxZQUFZLENBQUE7QUFFekIsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFlO1FBQ2pCLHFCQUFxQixFQUFFLElBQUk7UUFDM0IsYUFBYSxFQUFFLEtBQUs7UUFDcEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTztLQUNoQztJQUNELE1BQU0sRUFBTjtRQUNFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNmLENBQUM7SUFDRCxZQUFZLEVBQVo7UUFBQSxpQkFrQkM7UUFqQkMsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUNoQixJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxVQUFDLEdBQUc7Z0JBQ1gsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQTtnQkFDdEMsY0FBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO2dCQUM3QixLQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7WUFDdkMsQ0FBQztZQUNELElBQUksRUFBRSxVQUFBLEdBQUc7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDaEIsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDWCxLQUFLLEVBQUUsT0FBTztvQkFDZCxJQUFJLEVBQUUsTUFBTTtpQkFDYixDQUFDLENBQUE7WUFDSixDQUFDO1lBQ0QsUUFBUTtZQUNSLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsWUFBWSxF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WSxFQUFFLENBQUE7d0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7Ozt3QkFFdEIsY0FBSSxDQUFDLFlBQVksRUFBRSxDQUFBOzs7Ozs7S0FFdEI7SUFDSyxNQUFNLEVBQVo7Ozs7Ozt3QkFDRSxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO3dCQUNLLFdBQU0sY0FBSSxDQUFDLE9BQU8sRUFBRSxFQUFBOzt3QkFBMUMsSUFBSSxHQUFrQixTQUFvQjs2QkFDNUMsSUFBSSxFQUFKLGNBQUk7d0JBQzZCLFdBQU0sbUJBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUF6RCxJQUFJLEdBQXlCLFNBQTRCO3dCQUMvRCxjQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7d0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7Ozt3QkFFdEIsY0FBSSxDQUFDLFlBQVksRUFBRSxDQUFBOzs7Ozs7S0FFdEI7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBpX2xvZ2luLCB7IElSZWdpc3RlciB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaV9sb2dpbidcbmltcG9ydCB1dGlsIGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnXG5jb25zdCBBUFAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuY29uc3QgREVTQyA9ICfnlKjkuo7lrozlloTmgqjnmoTnlKjmiLfotYTmlpknXG5cblBhZ2Uoe1xuICBkYXRhOiA8SUxvZ2luX2RhdGE+e1xuICAgIGNhbklVc2VHZXRVc2VyUHJvZmlsZTogdHJ1ZSxcbiAgICBoYXNfdXNlcl9pbmZvOiBmYWxzZSxcbiAgICBjYW5fcmVnOiBBUFAuZ2xvYmFsRGF0YS5jYW5fcmVnXG4gIH0sXG4gIG9uTG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ2luMigpXG4gIH0sXG4gIG9uTG9naW5DbGljaygpOiB2b2lkIHtcbiAgICB3eC5nZXRVc2VyUHJvZmlsZSh7XG4gICAgICBkZXNjOiBERVNDLFxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBBUFAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICB1dGlsLnd4X2Vycign6aaW5qyh55m75b2V6ZyA6KaB57uR5a6a5oKo55qE5omL5py65Y+3IScpXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7IGhhc191c2VyX2luZm86IHRydWUgfSlcbiAgICAgIH0sXG4gICAgICBmYWlsOiBlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfojrflj5blpLHotKUhJyxcbiAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZSgpIHtcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBoYW5kbGVfbG9naW4oZTogYmFja3VzZXJfZGF0YSk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKGUpXG4gICAgLy8gdGhpcy5zZXREYXRhKHtcbiAgICAvLyAgIHVzZXJJbmZvOiBlLmRldGFpbC51c2VySW5mbyxcbiAgICAvLyAgIGhhc1VzZXJJbmZvOiB0cnVlXG4gICAgLy8gfSlcbiAgfSxcbiAgb25fbG9naW5fYnRuKCk6IHZvaWQge1xuICAgIHd4LmdldFVzZXJQcm9maWxlKHtcbiAgICAgIGRlc2M6IERFU0MsXG4gICAgICBzdWNjZXNzOiAoXG4gICAgICAgIHJlczogcHJvZmlsZV9kYXRhXG4gICAgICApOiB2b2lkID0+IHtcbiAgICAgICAgQVBQLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJywgcmVzLnVzZXJJbmZvKVxuICAgICAgICB1dGlsLnd4X3RpcCgn6aaW5qyh55m75b2V6ZyA6KaB57uR5a6a5oKo55qE5omL5py65Y+3IScpXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7IGhhc191c2VyX2luZm86IHRydWUgfSlcbiAgICAgIH0sXG4gICAgICBmYWlsKCkge1xuICAgICAgICB1dGlsLnd4X2Vycign6I635Y+W5aSx6LSlIScpXG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgaGFuZGxlX2RhdGEoZGF0YTogbG9naW5CYWNrRGF0YSB8IG51bGwpOiB2b2lkIHtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgQVBQLmdsb2JhbERhdGEudG9rZW4gPSBkYXRhLnRva2VuXG4gICAgICBjb25zdCBwYWdlX25hbWUgPSBkYXRhLmlzQmluZGluZyA9PT0gJ1lFUycgPyAnaW5kZXgnIDogJ2F1dGgnXG4gICAgICB1dGlsLnd4X25hdihwYWdlX25hbWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFuZGxlX2ZhaWwoKVxuICAgIH1cbiAgfSxcbiAgaGFuZGxlX2ZhaWwoKTogdm9pZCB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGNhbl9yZWc6IEFQUC5nbG9iYWxEYXRhLmNhbl9yZWcsXG4gICAgICBjYW5JVXNlR2V0VXNlclByb2ZpbGU6IHd4LmdldFVzZXJQcm9maWxlICE9PSB1bmRlZmluZWQsXG4gICAgICBoYXNfdXNlcl9pbmZvOiBBUFAuZ2xvYmFsRGF0YS51c2VySW5mbyAhPT0gbnVsbFxuICAgIH0pXG4gIH0sXG4gIGFzeW5jIG9uR2V0UGhvbmVDbGljayh7IGRldGFpbCB9OiBwaG9uZV9kYXRhKSB7XG4gICAgaWYgKEFQUC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSA8SVJlZ2lzdGVyPntcbiAgICAgICAgY29kZTogJycsXG4gICAgICAgIGl2OiBkZXRhaWwuaXYsXG4gICAgICAgIGVuY3J5cHRlZDogZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICAgIGltZzogQVBQLmdsb2JhbERhdGEudXNlckluZm8uYXZhdGFyVXJsLFxuICAgICAgICBuaWNrbmFtZTogQVBQLmdsb2JhbERhdGEudXNlckluZm8ubmlja05hbWUsXG4gICAgICAgIHNleDogPFRfc2V4PnV0aWwuZm9ybWF0X3NleChBUFAuZ2xvYmFsRGF0YS51c2VySW5mby5nZW5kZXIpXG4gICAgICB9XG4gICAgICB0aGlzLmxvZ2luMyhwYXJhbXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHV0aWwud3hfZXJyKCfmlbDmja7lvILluLghJylcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGhhc191c2VyX2luZm86IGZhbHNlXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgYXN5bmMgbG9naW4zKHBhcmFtczogSVJlZ2lzdGVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdXRpbC53eF9sb2FkKCfmraPlnKjnmbvpmYYuLi4nKVxuICAgIGNvbnN0IGNvZGU6IHN0cmluZyB8IG51bGwgPSBhd2FpdCB1dGlsLnd4X2NvZGUoKVxuICAgIGlmIChjb2RlKSB7XG4gICAgICBjb25zdCBkYXRhOiBsb2dpbkJhY2tEYXRhIHwgbnVsbCA9IGF3YWl0IGFwaV9sb2dpbi5sb2dpbjMoe1xuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgIGNvZGVcbiAgICAgIH0pXG4gICAgICB1dGlsLnd4X2xvYWRfaGlkZSgpXG4gICAgICB0aGlzLmhhbmRsZV9kYXRhKGRhdGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIHV0aWwud3hfbG9hZF9oaWRlKClcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGxvZ2luMigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB1dGlsLnd4X2xvYWQoJ+ato+WcqOeZu+mZhi4uLicpXG4gICAgY29uc3QgY29kZTogc3RyaW5nIHwgbnVsbCA9IGF3YWl0IHV0aWwud3hfY29kZSgpXG4gICAgaWYgKGNvZGUpIHtcbiAgICAgIGNvbnN0IGRhdGE6IGxvZ2luQmFja0RhdGEgfCBudWxsID0gYXdhaXQgYXBpX2xvZ2luLmxvZ2luMihjb2RlKVxuICAgICAgdXRpbC53eF9sb2FkX2hpZGUoKVxuICAgICAgdGhpcy5oYW5kbGVfZGF0YShkYXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICB1dGlsLnd4X2xvYWRfaGlkZSgpXG4gICAgfVxuICB9XG59KVxudHlwZSBwaG9uZV9kYXRhID0gV2VjaGF0TWluaXByb2dyYW0uQnV0dG9uR2V0UGhvbmVOdW1iZXJcbnR5cGUgcHJvZmlsZV9kYXRhID0gV2VjaGF0TWluaXByb2dyYW0uR2V0VXNlclByb2ZpbGVTdWNjZXNzQ2FsbGJhY2tSZXN1bHRcbnR5cGUgYmFja3VzZXJfZGF0YSA9IFdlY2hhdE1pbmlwcm9ncmFtLkJ1dHRvbkdldFVzZXJJbmZvXG5pbnRlcmZhY2UgSUxvZ2luX2RhdGEge1xuICBjYW5JVXNlR2V0VXNlclByb2ZpbGU6IGJvb2xlYW5cbiAgaGFzX3VzZXJfaW5mbzogYm9vbGVhblxuICBjYW5fcmVnOiBib29sZWFuXG59Il19