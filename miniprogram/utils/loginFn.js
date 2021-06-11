wx.login({
  success: async (res) => {
    wx.request({
      url: 'http://192.168.10.13:8823/api/checkCode',
      data: {
        code: res.code,
        storeId: 10000
      },
      method: 'GET',
      success: (res) => {
        const code = res.data.code
        if (code === 200) {
          APP.globalData.token = res.data.data.token
          if (res.data.data.isBinding === 'YES') {
            wx.switchTab({
              url: '/pages/index/index'
            })
          } else {
            wx.navigateTo({
              url: '/pages/auth/auth'
            })
          }
        } else if (code === 403) {
          this.setData({
            can_reg: true
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      },
    })
  }
})
wx.login({
  success: async (res) => {
    const code = res.code
    if (detail.encryptedData && detail.iv) {
      wx.showLoading({ title: '正在登陆...' })
      if (APP.globalData.userInfo) {
        wx.request({
          url: 'http://192.168.10.13:8823/api/channelRegisterloginMobile?storeId=10000',
          method: 'POST',
          data: {
            encrypted: detail.encryptedData,
            iv: detail.iv,
            code,
            img: APP.globalData.userInfo.avatarUrl,
            nickname: APP.globalData.userInfo.nickName,
            sex: util.format_sex(APP.globalData.userInfo.gender)
          },
          success(res) {
            console.log(res)
            const code = res.data.code
            const data = res.data.data
            if (code === 200) {
              APP.globalData.token = res.data.data.token
              if (data.isBinding === 'YES') {
                wx.switchTab({
                  url: '/pages/index/index'
                })
              } else {
                wx.navigateTo({
                  url: '/pages/auth/auth'
                })
              }
            } else {
              wx.showToast({
                title: '注册失败!'
              })
            }
          },
          complete() {
            wx.hideLoading()
          }
        })
      }
    } else {
      wx.showToast({ title: '获取手机数据有误' })
    }
  }
})