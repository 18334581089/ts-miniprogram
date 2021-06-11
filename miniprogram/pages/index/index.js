"use strict";
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
var api_channel_1 = require("../../services/api_channel");
var util_1 = require("../../utils/util");
Page({
    data: {
        input_vlaue: '',
        phone_vlaue: '',
        list: [],
        dialog: false,
        params: {
            page: 1,
            limit: 20,
            queryStr: ''
        }
    },
    onShow: function () {
        this.click_search();
    },
    handle_more: function () {
        this.setData({
            'params.page': ++this.data.params.page
        }, this.a_list);
    },
    click_search: function () {
        if (this.data.params.page === 1) {
            this.a_list();
        }
        else {
            this.setData({
                'params.page': 1
            }, this.a_list);
        }
    },
    click_dialog: function () {
        this.setData({
            dialog: true
        });
    },
    click_add: function () {
        var phone_vlaue = this.data.phone_vlaue;
        if (phone_vlaue && phone_vlaue.length === 11) {
            this.a_phone();
        }
        else {
            wx.showToast({
                title: '内容有误!',
                icon: 'none'
            });
        }
    },
    handle_input: function (e) {
        var _a;
        var name = e.target.dataset.name;
        this.setData((_a = {},
            _a[name] = e.detail.value,
            _a));
    },
    handle_close: function () {
        this.setData({
            dialog: false,
            phone_vlaue: ''
        });
    },
    a_phone: function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, api_channel_1.default.checkMobile(this.data.phone_vlaue)];
                    case 1:
                        data = _a.sent();
                        wx.setStorageSync('phone', this.data.phone_vlaue);
                        if (data) {
                            this.setData({
                                dialog: false,
                                phone_vlaue: ''
                            }, function () { return util_1.default.wx_nav('declarationAdd'); });
                        }
                        return [2];
                }
            });
        });
    },
    a_list: function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, data, _list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = this.data.params.page;
                        return [4, api_channel_1.default.list(this.data.params)];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            _list = data.response.rows;
                            this.setData({
                                list: (page === 1) ? _list : this.data.list.concat(_list)
                            });
                            if (page > 1 && _list.length === 0) {
                                util_1.default.wx_tip_mask('没有更多!');
                            }
                        }
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUErRjtBQUMvRix5Q0FBbUM7QUFFbkMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFhO1FBQ2YsV0FBVyxFQUFFLEVBQUU7UUFDZixXQUFXLEVBQUUsRUFBRTtRQUNmLElBQUksRUFBRSxFQUFFO1FBQ1IsTUFBTSxFQUFFLEtBQUs7UUFDYixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsQ0FBQztZQUNQLEtBQUssRUFBRSxFQUFFO1lBQ1QsUUFBUSxFQUFFLEVBQUU7U0FDYjtLQUNGO0lBQ0QsTUFBTSxFQUFOO1FBQ0UsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFDRCxXQUFXLEVBQVg7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsYUFBYSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTtTQUN2QyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNqQixDQUFDO0lBQ0QsWUFBWSxFQUFaO1FBQ0UsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtTQUNkO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLGFBQWEsRUFBRSxDQUFDO2FBQ2pCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQ2hCO0lBQ0gsQ0FBQztJQUNELFlBQVksRUFBWjtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxTQUFTLEVBQVQ7UUFDRSxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQTtRQUN6QyxJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDZjthQUFNO1lBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDWCxLQUFLLEVBQUUsT0FBTztnQkFDZCxJQUFJLEVBQUUsTUFBTTthQUNiLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUNELFlBQVksRUFBWixVQUFhLENBQVU7O1FBQ3JCLElBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUNsQyxJQUFJLENBQUMsT0FBTztZQUNWLEdBQUMsSUFBSSxJQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFDdEIsQ0FBQTtJQUNKLENBQUM7SUFDRCxZQUFZLEVBQVo7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsTUFBTSxFQUFFLEtBQUs7WUFDYixXQUFXLEVBQUUsRUFBRTtTQUNoQixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0ssT0FBTzs7Ozs7NEJBQ0UsV0FBTSxxQkFBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFBOzt3QkFBM0QsSUFBSSxHQUFHLFNBQW9EO3dCQUNqRSxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO3dCQUNqRCxJQUFJLElBQUksRUFBRTs0QkFDUixJQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNYLE1BQU0sRUFBRSxLQUFLO2dDQUNiLFdBQVcsRUFBRSxFQUFFOzZCQUNoQixFQUFFLGNBQU0sT0FBQSxjQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FBQTt5QkFDeEM7Ozs7O0tBQ0Y7SUFDSyxNQUFNLEVBQVo7Ozs7Ozt3QkFDVSxJQUFJLEdBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQXJCLENBQXFCO3dCQUNHLFdBQU0scUJBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQXRFLElBQUksR0FBMEIsU0FBd0M7d0JBQzVFLElBQUksSUFBSSxFQUFFOzRCQUNGLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQTs0QkFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDWCxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs2QkFDMUQsQ0FBQyxDQUFBOzRCQUNGLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQ0FDbEMsY0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQTs2QkFDMUI7eUJBQ0Y7Ozs7O0tBQ0Y7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBpX2NoYW5uZWwsIHsgSTNfZGVjbGFyYXRpb24sIElfZGVjX2l0ZW0sIEkzX3BhcmFtcyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaV9jaGFubmVsJ1xuaW1wb3J0IHV0aWwgZnJvbSAnLi4vLi4vdXRpbHMvdXRpbCdcblxuUGFnZSh7XG4gIGRhdGE6IDxJUGFnZURhdGE+e1xuICAgIGlucHV0X3ZsYXVlOiAnJyxcbiAgICBwaG9uZV92bGF1ZTogJycsXG4gICAgbGlzdDogW10sXG4gICAgZGlhbG9nOiBmYWxzZSxcbiAgICBwYXJhbXM6IHtcbiAgICAgIHBhZ2U6IDEsXG4gICAgICBsaW1pdDogMjAsXG4gICAgICBxdWVyeVN0cjogJydcbiAgICB9XG4gIH0sXG4gIG9uU2hvdygpOiB2b2lkIHtcbiAgICB0aGlzLmNsaWNrX3NlYXJjaCgpXG4gIH0sXG4gIGhhbmRsZV9tb3JlKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAncGFyYW1zLnBhZ2UnOiArK3RoaXMuZGF0YS5wYXJhbXMucGFnZVxuICAgIH0sIHRoaXMuYV9saXN0KVxuICB9LFxuICBjbGlja19zZWFyY2goKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGF0YS5wYXJhbXMucGFnZSA9PT0gMSkge1xuICAgICAgdGhpcy5hX2xpc3QoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAncGFyYW1zLnBhZ2UnOiAxXG4gICAgICB9LCB0aGlzLmFfbGlzdClcbiAgICB9XG4gIH0sXG4gIGNsaWNrX2RpYWxvZygpOiB2b2lkIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZGlhbG9nOiB0cnVlXG4gICAgfSlcbiAgfSxcbiAgY2xpY2tfYWRkKCk6IHZvaWQge1xuICAgIGNvbnN0IHBob25lX3ZsYXVlID0gdGhpcy5kYXRhLnBob25lX3ZsYXVlXG4gICAgaWYgKHBob25lX3ZsYXVlICYmIHBob25lX3ZsYXVlLmxlbmd0aCA9PT0gMTEpIHtcbiAgICAgIHRoaXMuYV9waG9uZSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn5YaF5a655pyJ6K+vIScsXG4gICAgICAgIGljb246ICdub25lJ1xuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIGhhbmRsZV9pbnB1dChlOiBUX2lucHV0KTogdm9pZCB7XG4gICAgY29uc3QgbmFtZSA9IGUudGFyZ2V0LmRhdGFzZXQubmFtZVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBbbmFtZV06IGUuZGV0YWlsLnZhbHVlXG4gICAgfSlcbiAgfSxcbiAgaGFuZGxlX2Nsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBkaWFsb2c6IGZhbHNlLFxuICAgICAgcGhvbmVfdmxhdWU6ICcnXG4gICAgfSlcbiAgfSxcbiAgYXN5bmMgYV9waG9uZSgpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgYXBpX2NoYW5uZWwuY2hlY2tNb2JpbGUodGhpcy5kYXRhLnBob25lX3ZsYXVlKVxuICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdwaG9uZScsIHRoaXMuZGF0YS5waG9uZV92bGF1ZSlcbiAgICBpZiAoZGF0YSkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgZGlhbG9nOiBmYWxzZSxcbiAgICAgICAgcGhvbmVfdmxhdWU6ICcnXG4gICAgICB9LCAoKSA9PiB1dGlsLnd4X25hdignZGVjbGFyYXRpb25BZGQnKSlcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGFfbGlzdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IHBhZ2UgfSA9IHRoaXMuZGF0YS5wYXJhbXNcbiAgICBjb25zdCBkYXRhOiBJM19kZWNsYXJhdGlvbiB8IG51bGwgPSBhd2FpdCBhcGlfY2hhbm5lbC5saXN0KHRoaXMuZGF0YS5wYXJhbXMpXG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGNvbnN0IF9saXN0ID0gZGF0YS5yZXNwb25zZS5yb3dzXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBsaXN0OiAocGFnZSA9PT0gMSkgPyBfbGlzdCA6IHRoaXMuZGF0YS5saXN0LmNvbmNhdChfbGlzdClcbiAgICAgIH0pXG4gICAgICBpZiAocGFnZSA+IDEgJiYgX2xpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHV0aWwud3hfdGlwX21hc2soJ+ayoeacieabtOWkmiEnKVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcblxuaW50ZXJmYWNlIElQYWdlRGF0YSB7XG4gIGlucHV0X3ZsYXVlOiBzdHJpbmdcbiAgcGhvbmVfdmxhdWU6IHN0cmluZ1xuICBsaXN0OiBBcnJheTxJX2RlY19pdGVtPlxuICBkaWFsb2c6IGJvb2xlYW5cbiAgcGFyYW1zOiBJM19wYXJhbXNcbn1cbiJdfQ==