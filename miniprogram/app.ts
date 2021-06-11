App<IAppOption>({
  globalData: {
    userInfo: null,
    can_reg: false,
    cur_login: true,
    token: ''
  },
  onLaunch(): void {
    const userInfo:WechatMiniprogram.UserInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
    }
  }
})