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
var pure_1 = require("../../utils/pure");
var util_1 = require("../../utils/util");
Page({
    data: {
        params: pure_1.declaration_default,
        departmentlist: [],
        prolist: [],
        radios: pure_1.PURE_SEX,
        show_select_dep: false,
        show_select_pro: false,
        depname_value: '',
        project_value: ''
    },
    select_launch: function () {
        this.setData({
            "params.projectId": '',
            "params.projectName": '',
            show_select_pro: false,
            show_select_dep: true,
            project_value: ''
        });
    },
    select_launch2: function () {
        if (this.data.prolist.length > 0) {
            this.setData({
                show_select_dep: false,
                show_select_pro: true
            });
        }
    },
    onLoad: function () {
        this.setData({
            'params.patientPhone': wx.getStorageSync('phone')
        });
        this.a_departmentlist();
    },
    on_add: function () {
        var isok = true;
        for (var key in this.data.params) {
            var element = this.data.params[key];
            if (!element) {
                isok = false;
                wx.showToast({
                    title: '还有没有填的空',
                    icon: 'none'
                });
            }
        }
        if (isok) {
            this.a_add();
        }
    },
    bindKeyChange: function (e) {
        var _a;
        var name = 'params.' + e.target.dataset.name;
        this.setData((_a = {},
            _a[name] = e.detail.value,
            _a));
    },
    radioChange: function (e) {
        this.setData({
            'params.sex': e.detail.value
        });
    },
    checkboxChange: function (e) {
        var _a = e.target.dataset.item, depId = _a.depId, depName = _a.depName, treeId = _a.treeId;
        this.setData({
            "params.deptId": depId,
            "params.deptName": depName,
            depname_value: depName,
            show_select_dep: false
        });
        this.a_prolist(treeId);
    },
    checkboxChange2: function (e) {
        var _a = e.target.dataset.item, consultProjectId = _a.consultProjectId, consultProjectName = _a.consultProjectName;
        this.setData({
            "params.projectId": consultProjectId,
            "params.projectName": consultProjectName,
            project_value: consultProjectName,
            show_select_pro: false
        });
    },
    a_departmentlist: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, api_channel_1.default.dep_list()];
                    case 1:
                        res = _a.sent();
                        if (res) {
                            this.setData({
                                departmentlist: res.response
                            });
                        }
                        return [2];
                }
            });
        });
    },
    a_prolist: function (_treeId) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, api_channel_1.default.pro_list(_treeId)];
                    case 1:
                        res = _a.sent();
                        if (res) {
                            this.setData({
                                prolist: res.response
                            });
                        }
                        return [2];
                }
            });
        });
    },
    a_add: function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, api_channel_1.default.add(this.data.params)];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            util_1.default.wx_success('添加成功', function () { return util_1.default.wx_nav('index'); });
                        }
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjbGFyYXRpb25BZGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWNsYXJhdGlvbkFkZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUE2SDtBQUM3SCx5Q0FBZ0U7QUFDaEUseUNBQW1DO0FBRW5DLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLE1BQU0sRUFBa0IsMEJBQW1CO1FBQzNDLGNBQWMsRUFBNkIsRUFBRTtRQUM3QyxPQUFPLEVBQTZCLEVBQUU7UUFDdEMsTUFBTSxFQUFhLGVBQVE7UUFDM0IsZUFBZSxFQUFFLEtBQUs7UUFDdEIsZUFBZSxFQUFFLEtBQUs7UUFDdEIsYUFBYSxFQUFFLEVBQUU7UUFDakIsYUFBYSxFQUFFLEVBQUU7S0FDbEI7SUFDRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLGtCQUFrQixFQUFFLEVBQUU7WUFDdEIsb0JBQW9CLEVBQUUsRUFBRTtZQUN4QixlQUFlLEVBQUUsS0FBSztZQUN0QixlQUFlLEVBQUUsSUFBSTtZQUNyQixhQUFhLEVBQUUsRUFBRTtTQUNsQixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsY0FBYztRQUNaLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLGVBQWUsRUFBRSxLQUFLO2dCQUN0QixlQUFlLEVBQUUsSUFBSTthQUN0QixDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7SUFDRCxNQUFNLEVBQU47UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gscUJBQXFCLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7U0FDbEQsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7SUFDekIsQ0FBQztJQUNELE1BQU0sRUFBTjtRQUNF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QUFDLE1BQU0sRUFBRSxjQUFNLE9BQUEsY0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFBO3lCQUNwRDs7Ozs7S0FDRjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcGlfY2hhbm5lbCwgeyBJMF9kZWNsYXJhdGlvbiwgSXByb19pdGVtLCBJZGVwX2l0ZW0sIElkZXBhcnRtZW50LCBJcHJvamVjdCwgSTBfcmVzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpX2NoYW5uZWwnXG5pbXBvcnQgeyBQVVJFX1NFWCwgZGVjbGFyYXRpb25fZGVmYXVsdCB9IGZyb20gJy4uLy4uL3V0aWxzL3B1cmUnXG5pbXBvcnQgdXRpbCBmcm9tICcuLi8uLi91dGlscy91dGlsJ1xuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIHBhcmFtczogPEkwX2RlY2xhcmF0aW9uPmRlY2xhcmF0aW9uX2RlZmF1bHQsXG4gICAgZGVwYXJ0bWVudGxpc3Q6IDxBcnJheTxJZGVwX2l0ZW0+Pjx1bmtub3duPltdLFxuICAgIHByb2xpc3Q6IDxBcnJheTxJcHJvX2l0ZW0+Pjx1bmtub3duPltdLFxuICAgIHJhZGlvczogPElfc2V4TGlzdD5QVVJFX1NFWCxcbiAgICBzaG93X3NlbGVjdF9kZXA6IGZhbHNlLFxuICAgIHNob3dfc2VsZWN0X3BybzogZmFsc2UsXG4gICAgZGVwbmFtZV92YWx1ZTogJycsXG4gICAgcHJvamVjdF92YWx1ZTogJydcbiAgfSxcbiAgc2VsZWN0X2xhdW5jaCAoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIFwicGFyYW1zLnByb2plY3RJZFwiOiAnJyxcbiAgICAgIFwicGFyYW1zLnByb2plY3ROYW1lXCI6ICcnLFxuICAgICAgc2hvd19zZWxlY3RfcHJvOiBmYWxzZSxcbiAgICAgIHNob3dfc2VsZWN0X2RlcDogdHJ1ZSxcbiAgICAgIHByb2plY3RfdmFsdWU6ICcnXG4gICAgfSlcbiAgfSxcbiAgc2VsZWN0X2xhdW5jaDIgKCkge1xuICAgIGlmICh0aGlzLmRhdGEucHJvbGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBzaG93X3NlbGVjdF9kZXA6IGZhbHNlLFxuICAgICAgICBzaG93X3NlbGVjdF9wcm86IHRydWVcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBvbkxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICdwYXJhbXMucGF0aWVudFBob25lJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Bob25lJylcbiAgICB9KVxuICAgIHRoaXMuYV9kZXBhcnRtZW50bGlzdCgpXG4gIH0sXG4gIG9uX2FkZCgpOiB2b2lkIHtcbiAgICBsZXQgaXNvayA9IHRydWVcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmRhdGEucGFyYW1zKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5kYXRhLnBhcmFtc1trZXldXG4gICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgaXNvayA9IGZhbHNlXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfov5jmnInmsqHmnInloavnmoTnqbonLFxuICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNvaykge1xuICAgICAgdGhpcy5hX2FkZCgpXG4gICAgfVxuICB9LFxuICBiaW5kS2V5Q2hhbmdlKGU6IFRfaW5wdXQpOiB2b2lkIHtcbiAgICBjb25zdCBuYW1lID0gJ3BhcmFtcy4nICsgZS50YXJnZXQuZGF0YXNldC5uYW1lXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIFtuYW1lXTogZS5kZXRhaWwudmFsdWVcbiAgICB9KVxuICB9LFxuICByYWRpb0NoYW5nZShlOiBXZWNoYXRNaW5pcHJvZ3JhbS5SYWRpb0dyb3VwQ2hhbmdlKTogdm9pZCB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICdwYXJhbXMuc2V4JzogZS5kZXRhaWwudmFsdWUgYXMgVF9zZXhcbiAgICB9KVxuICB9LFxuICBjaGVja2JveENoYW5nZShlOiBXZWNoYXRNaW5pcHJvZ3JhbS5DaGVja2JveEdyb3VwQ2hhbmdlKTogdm9pZCB7XG4gICAgY29uc3QgeyBkZXBJZCwgZGVwTmFtZSwgdHJlZUlkIH06IElkZXBfaXRlbSA9IGUudGFyZ2V0LmRhdGFzZXQuaXRlbVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBcInBhcmFtcy5kZXB0SWRcIjogZGVwSWQsXG4gICAgICBcInBhcmFtcy5kZXB0TmFtZVwiOiBkZXBOYW1lLFxuICAgICAgZGVwbmFtZV92YWx1ZTogZGVwTmFtZSxcbiAgICAgIHNob3dfc2VsZWN0X2RlcDogZmFsc2VcbiAgICB9KVxuICAgIHRoaXMuYV9wcm9saXN0KHRyZWVJZClcbiAgfSxcbiAgY2hlY2tib3hDaGFuZ2UyKGU6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29uc3VsdFByb2plY3RJZCwgY29uc3VsdFByb2plY3ROYW1lIH06IElwcm9faXRlbSA9IGUudGFyZ2V0LmRhdGFzZXQuaXRlbVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBcInBhcmFtcy5wcm9qZWN0SWRcIjogY29uc3VsdFByb2plY3RJZCxcbiAgICAgIFwicGFyYW1zLnByb2plY3ROYW1lXCI6IGNvbnN1bHRQcm9qZWN0TmFtZSxcbiAgICAgIHByb2plY3RfdmFsdWU6IGNvbnN1bHRQcm9qZWN0TmFtZSxcbiAgICAgIHNob3dfc2VsZWN0X3BybzogZmFsc2VcbiAgICB9KVxuICB9LFxuICBhc3luYyBhX2RlcGFydG1lbnRsaXN0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJlczogSWRlcGFydG1lbnQgfCBudWxsID0gYXdhaXQgYXBpX2NoYW5uZWwuZGVwX2xpc3QoKVxuICAgIGlmIChyZXMpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGRlcGFydG1lbnRsaXN0OiByZXMucmVzcG9uc2VcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBhc3luYyBhX3Byb2xpc3QoX3RyZWVJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcmVzOiBJcHJvamVjdCB8IG51bGwgPSBhd2FpdCBhcGlfY2hhbm5lbC5wcm9fbGlzdChfdHJlZUlkKVxuICAgIGlmIChyZXMpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHByb2xpc3Q6IHJlcy5yZXNwb25zZVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGFfYWRkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGRhdGE6IEkwX3JlcyB8IG51bGwgPSBhd2FpdCBhcGlfY2hhbm5lbC5hZGQodGhpcy5kYXRhLnBhcmFtcylcbiAgICBpZiAoZGF0YSkge1xuICAgICAgdXRpbC53eF9zdWNjZXNzKCfmt7vliqDmiJDlip8nLCAoKSA9PiB1dGlsLnd4X25hdignaW5kZXgnKSlcbiAgICB9XG4gIH1cbn0pIl19