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
var pure_1 = require("./pure");
var wx_api_1 = require("./wx_api");
var formatNumber = function (n) {
    var s = n.toString();
    return s[1] ? s : '0' + s;
};
var formatTime = function (T) {
    var date = new Date(+T * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return ([year, month, day].map(formatNumber).join('/') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':'));
};
var format_sex = function (gender) {
    var item = pure_1.PURE_SEX[gender];
    return item.value;
};
exports.default = __assign(__assign({}, wx_api_1.default), { format_sex: format_sex,
    formatTime: formatTime });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUFpQztBQUNqQyxtQ0FBNkI7QUFFN0IsSUFBTSxZQUFZLEdBQUcsVUFBQyxDQUFTO0lBQzdCLElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUN0QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFBO0FBQzNCLENBQUMsQ0FBQTtBQUVELElBQU0sVUFBVSxHQUFHLFVBQ2pCLENBQWtCO0lBRWxCLElBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO0lBQ2hDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMvQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ2pDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUMxQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDNUIsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ2hDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUNoQyxPQUFPLENBQ0wsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzlDLEdBQUc7UUFDSCxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDbkQsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVELElBQU0sVUFBVSxHQUFHLFVBQUMsTUFBYztJQUNoQyxJQUFNLElBQUksR0FBRyxlQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDN0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0FBQ25CLENBQUMsQ0FBQTtBQUVELHdDQUNLLGdCQUFNLEtBQ1QsVUFBVSxZQUFBO0lBQ1YsVUFBVSxZQUFBLElBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQVVJFX1NFWCB9IGZyb20gJy4vcHVyZSdcbmltcG9ydCB3eF9hcGkgZnJvbSAnLi93eF9hcGknXG5cbmNvbnN0IGZvcm1hdE51bWJlciA9IChuOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBzID0gbi50b1N0cmluZygpXG4gIHJldHVybiBzWzFdID8gcyA6ICcwJyArIHNcbn1cblxuY29uc3QgZm9ybWF0VGltZSA9IChcbiAgVDogc3RyaW5nIHwgbnVtYmVyXG4pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoK1QgKiAxMDAwKVxuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMVxuICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuICBjb25zdCBob3VyID0gZGF0ZS5nZXRIb3VycygpXG4gIGNvbnN0IG1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpXG4gIGNvbnN0IHNlY29uZCA9IGRhdGUuZ2V0U2Vjb25kcygpXG4gIHJldHVybiAoXG4gICAgW3llYXIsIG1vbnRoLCBkYXldLm1hcChmb3JtYXROdW1iZXIpLmpvaW4oJy8nKSArXG4gICAgJyAnICtcbiAgICBbaG91ciwgbWludXRlLCBzZWNvbmRdLm1hcChmb3JtYXROdW1iZXIpLmpvaW4oJzonKVxuICApXG59XG5cbmNvbnN0IGZvcm1hdF9zZXggPSAoZ2VuZGVyOiBudW1iZXIpOiBUX3NleCA9PiB7XG4gIGNvbnN0IGl0ZW0gPSBQVVJFX1NFWFtnZW5kZXJdXG4gIHJldHVybiBpdGVtLnZhbHVlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4ud3hfYXBpLFxuICBmb3JtYXRfc2V4LFxuICBmb3JtYXRUaW1lXG59Il19