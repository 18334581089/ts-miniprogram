"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("../utils/request");
exports.default = {
    list: function (params) {
        return request_1.api_get("channel/channelDeclarationList", params);
    },
    add: function (params) {
        return request_1.api_post("channel/addChannelDeclaration", params);
    },
    pro_list: function (treeId) {
        return request_1.api_get("channel/hisIntentProjects/" + treeId);
    },
    dep_list: function () {
        return request_1.api_get("channel/hisDepart");
    },
    checkMobile: function (mobile) {
        return request_1.api_get("channel/checkMobile", {
            mobile: mobile
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpX2NoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcGlfY2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUFvRDtBQUVwRCxrQkFBZTtJQUNiLElBQUksRUFBSixVQUFLLE1BQWlCO1FBQ3BCLE9BQU8saUJBQU8sQ0FBaUIsZ0NBQWdDLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDMUUsQ0FBQztJQUNELEdBQUcsRUFBSCxVQUFJLE1BQXNCO1FBQ3hCLE9BQU8sa0JBQVEsQ0FBUywrQkFBK0IsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUNsRSxDQUFDO0lBQ0QsUUFBUSxFQUFSLFVBQVMsTUFBYztRQUNyQixPQUFPLGlCQUFPLENBQVcsK0JBQTZCLE1BQVEsQ0FBQyxDQUFBO0lBQ2pFLENBQUM7SUFDRCxRQUFRLEVBQVI7UUFDRSxPQUFPLGlCQUFPLENBQWMsbUJBQW1CLENBQUMsQ0FBQTtJQUNsRCxDQUFDO0lBQ0QsV0FBVyxFQUFYLFVBQVksTUFBYztRQUN4QixPQUFPLGlCQUFPLENBQWMscUJBQXFCLEVBQUU7WUFDakQsTUFBTSxRQUFBO1NBQ1AsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcGlfZ2V0LCBhcGlfcG9zdCB9IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbGlzdChwYXJhbXM6IEkzX3BhcmFtcykge1xyXG4gICAgcmV0dXJuIGFwaV9nZXQ8STNfZGVjbGFyYXRpb24+KGBjaGFubmVsL2NoYW5uZWxEZWNsYXJhdGlvbkxpc3RgLCBwYXJhbXMpXHJcbiAgfSxcclxuICBhZGQocGFyYW1zOiBJMF9kZWNsYXJhdGlvbikge1xyXG4gICAgcmV0dXJuIGFwaV9wb3N0PEkwX3Jlcz4oYGNoYW5uZWwvYWRkQ2hhbm5lbERlY2xhcmF0aW9uYCwgcGFyYW1zKVxyXG4gIH0sXHJcbiAgcHJvX2xpc3QodHJlZUlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBhcGlfZ2V0PElwcm9qZWN0PihgY2hhbm5lbC9oaXNJbnRlbnRQcm9qZWN0cy8ke3RyZWVJZH1gKVxyXG4gIH0sXHJcbiAgZGVwX2xpc3QoKSB7XHJcbiAgICByZXR1cm4gYXBpX2dldDxJZGVwYXJ0bWVudD4oYGNoYW5uZWwvaGlzRGVwYXJ0YClcclxuICB9LFxyXG4gIGNoZWNrTW9iaWxlKG1vYmlsZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gYXBpX2dldDxJZGVwYXJ0bWVudD4oYGNoYW5uZWwvY2hlY2tNb2JpbGVgLCB7XHJcbiAgICAgIG1vYmlsZVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSTBfcmVzIHsgcmVzcG9uc2U6IG51bGwgfVxyXG5leHBvcnQgaW50ZXJmYWNlIElwcm9faXRlbSB7XHJcbiAgY29uc3VsdFByb2plY3RJZDogc3RyaW5nXHJcbiAgY29uc3VsdFByb2plY3ROYW1lOiBzdHJpbmdcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElkZXBfaXRlbSB7XHJcbiAgZGVwSWQ6IHN0cmluZ1xyXG4gIGRlcE5hbWU6IHN0cmluZ1xyXG4gIHRyZWVJZDogc3RyaW5nXHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJM19wYXJhbXMge1xyXG4gIHBhZ2U6IG51bWJlclxyXG4gIGxpbWl0OiBudW1iZXJcclxuICBxdWVyeVN0cjogc3RyaW5nXHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJM19kZWNsYXJhdGlvbiB7XHJcbiAgcmVzcG9uc2U6IHtcclxuICAgIHJvd3M6IEFycmF5PElfZGVjX2l0ZW0+XHJcbiAgICBjb3VudDogbnVtYmVyXHJcbiAgICBsaW1pdDogbnVtYmVyXHJcbiAgICBwYWdlOiBudW1iZXJcclxuICAgIHN0YXJ0OiBudW1iZXJcclxuICAgIHRvdGFsUGFnZTogbnVtYmVyXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSTBfZGVjbGFyYXRpb24ge1xyXG4gIGRlcHRJZDogc3RyaW5nXHJcbiAgZGVwdE5hbWU6IHN0cmluZ1xyXG4gIHJlbWFyazogc3RyaW5nXHJcbiAgcHJvamVjdElkOiBzdHJpbmdcclxuICBwcm9qZWN0TmFtZTogc3RyaW5nXHJcbiAgcGF0aWVudFBob25lOiBzdHJpbmdcclxuICBwYXRpZW50TmFtZTogc3RyaW5nXHJcbiAgc2V4OiBUX3NleFxyXG4gIFtrZXk6IHN0cmluZ106IHN0cmluZ1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSWRlcGFydG1lbnQge1xyXG4gIHJlc3BvbnNlOiBBcnJheTxJZGVwX2l0ZW0+XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJcHJvamVjdCB7XHJcbiAgcmVzcG9uc2U6IEFycmF5PElwcm9faXRlbT5cclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElfZGVjX2l0ZW0ge1xyXG4gIGlzUmVhY2g6IFRfaXNyZWFjaFxyXG4gIHdhaXRlclRpbWU6IG51bWJlclxyXG4gIHBhdGllbnRQaG9uZTogc3RyaW5nXHJcbiAgcGF0aWVudE5hbWU6IHN0cmluZ1xyXG4gIGRlcHROYW1lOiBzdHJpbmdcclxuICBwcm9qZWN0TmFtZTogc3RyaW5nXHJcbn1cclxudHlwZSBUX2lzcmVhY2ggPSAnQVJSSVZFJyB8ICdOT1RBUlJJVkUnXHJcblxyXG4iXX0=