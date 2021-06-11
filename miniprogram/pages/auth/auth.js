// miniprogram/pages/auth/auth.js
const APP = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onSureClick () {
    wx.request({
      url: 'http://192.168.10.13:8823/api/user/isBinding',
      header: {
        Authorization: 'Bearer ' + APP.globalData.token
      },
      success: (res) => {
        const code = res.data.code
        if (code === 200) {
          if (res.data.data.isBinding === 'YES') {
            wx.switchTab({
              url: '/pages/index/index'
            })
          } else {
            wx.showToast({
              title: '未绑定',
            })
          }
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})