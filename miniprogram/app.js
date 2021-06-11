"use strict";
App({
    globalData: {
        userInfo: null,
        can_reg: false,
        cur_login: true,
        token: ''
    },
    onLaunch: function () {
        var userInfo = wx.getStorageSync('userInfo');
        if (userInfo) {
            this.globalData.userInfo = userInfo;
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxHQUFHLENBQWE7SUFDZCxVQUFVLEVBQUU7UUFDVixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxLQUFLO1FBQ2QsU0FBUyxFQUFFLElBQUk7UUFDZixLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsUUFBUSxFQUFSO1FBQ0UsSUFBTSxRQUFRLEdBQThCLEVBQUUsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDekUsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7U0FDcEM7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiQXBwPElBcHBPcHRpb24+KHtcbiAgZ2xvYmFsRGF0YToge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIGNhbl9yZWc6IGZhbHNlLFxuICAgIGN1cl9sb2dpbjogdHJ1ZSxcbiAgICB0b2tlbjogJydcbiAgfSxcbiAgb25MYXVuY2goKTogdm9pZCB7XG4gICAgY29uc3QgdXNlckluZm86V2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygndXNlckluZm8nKVxuICAgIGlmICh1c2VySW5mbykge1xuICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gdXNlckluZm9cbiAgICB9XG4gIH1cbn0pIl19