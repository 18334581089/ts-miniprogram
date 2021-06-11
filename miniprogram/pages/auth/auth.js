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
var api_login_1 = require("../../services/api_login");
var util_1 = require("../../utils/util");
Page({
    onSureClick: function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, api_login_1.default.isBinding()];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            if (data.isBinding === 'YES') {
                                util_1.default.wx_success('已绑定', 'index');
                            }
                            else {
                                util_1.default.wx_tip('未绑定');
                            }
                        }
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBZ0Q7QUFDaEQseUNBQW1DO0FBRW5DLElBQUksQ0FBQztJQUNHLFdBQVcsRUFBakI7Ozs7OzRCQUNxQyxXQUFNLG1CQUFTLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF4RCxJQUFJLEdBQXlCLFNBQTJCO3dCQUM5RCxJQUFJLElBQUksRUFBRTs0QkFDUixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssS0FBSyxFQUFFO2dDQUM1QixjQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTs2QkFDaEM7aUNBQU07Z0NBQ0wsY0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTs2QkFDbkI7eUJBQ0Y7Ozs7O0tBQ0Y7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBpX2xvZ2luIGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hcGlfbG9naW5cIlxyXG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vLi4vdXRpbHMvdXRpbFwiXHJcblxyXG5QYWdlKHtcclxuICBhc3luYyBvblN1cmVDbGljaygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IGRhdGE6IGxvZ2luQmFja0RhdGEgfCBudWxsID0gYXdhaXQgYXBpX2xvZ2luLmlzQmluZGluZygpXHJcbiAgICBpZiAoZGF0YSkge1xyXG4gICAgICBpZiAoZGF0YS5pc0JpbmRpbmcgPT09ICdZRVMnKSB7XHJcbiAgICAgICAgdXRpbC53eF9zdWNjZXNzKCflt7Lnu5HlrponLCAnaW5kZXgnKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHV0aWwud3hfdGlwKCfmnKrnu5HlrponKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KSJdfQ==