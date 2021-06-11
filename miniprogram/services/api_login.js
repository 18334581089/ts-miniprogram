"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("../utils/request");
exports.default = {
    login2: function (code) {
        return request_1.api_get("checkCode", { code: code });
    },
    login3: function (params) {
        return request_1.api_post("channelRegisterloginMobile", params);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpX2xvZ2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpX2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQW9EO0FBRXBELGtCQUFlO0lBQ2IsTUFBTSxFQUFOLFVBQU8sSUFBWTtRQUNqQixPQUFPLGlCQUFPLENBQWdCLFdBQVcsRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQTtJQUN0RCxDQUFDO0lBQ0QsTUFBTSxFQUFOLFVBQU8sTUFBaUI7UUFDdEIsT0FBTyxrQkFBUSxDQUFnQiw0QkFBNEIsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN0RSxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFwaV9nZXQsIGFwaV9wb3N0IH0gZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2dpbjIoY29kZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gYXBpX2dldDxsb2dpbkJhY2tEYXRhPihgY2hlY2tDb2RlYCwgeyBjb2RlIH0pXHJcbiAgfSxcclxuICBsb2dpbjMocGFyYW1zOiBJUmVnaXN0ZXIpIHtcclxuICAgIHJldHVybiBhcGlfcG9zdDxsb2dpbkJhY2tEYXRhPihgY2hhbm5lbFJlZ2lzdGVybG9naW5Nb2JpbGVgLCBwYXJhbXMpXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlZ2lzdGVyIHtcclxuICBlbmNyeXB0ZWQ6IHN0cmluZ1xyXG4gIGl2OiBzdHJpbmdcclxuICBjb2RlOiBzdHJpbmcsXHJcbiAgaW1nOiBzdHJpbmdcclxuICBuaWNrbmFtZTogc3RyaW5nXHJcbiAgc2V4OiBzdHJpbmdcclxufSJdfQ==