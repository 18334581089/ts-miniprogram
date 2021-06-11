const page_tabBar = ['index', 'expert', 'user']
const APP = getApp<IAppOption>()
const duration = 1500
type T_icon = 'success' | 'error' | 'loading' | 'none'

/**
 * 默认, 加载中
 * @param title 提示内容
 */
const wx_load = (title = '加载中'): void => {
  wx.showLoading({ title })
}
/**
 * 取消加载
 */
const wx_load_hide = (): void => {
  wx.hideLoading()
}
/**
 * 提示,1.5s后自动关闭
 * @param title 提示内容
 * @param icon 提示icon
 * @param handle 提示结束后的回调函数
 */
let cur_tip_loading = false
const wx_tip = (
  title: string,
  icon: T_icon | void,
  handle: Function | void
): void => {
  if (cur_tip_loading) {
    wx.hideToast()
  }
  cur_tip_loading = true
  wx.showToast({
    title,
    icon: icon || 'none',
    duration,
    mask: true
  })
  // 这里有bug,在1.5秒内再次发出一个tip
  const time_id = setTimeout(() => {
    if (handle) {
      handle()
    }
    clearTimeout(time_id)
    cur_tip_loading = false
  }, 1400)
}
const wx_err = (
  title = '出错了',
  handle: Function | void
): void => {
  wx_tip(title, 'none', handle)
}
const wx_succes = (
  title = '成功了',
  handle: Function | void
): void => {
  wx_tip(title, 'success', handle)
}
const wx_tip_mask = (title: string): void => {
  if (cur_tip_loading) {
    wx.hideToast()
  }
  cur_tip_loading = true
  wx.showToast({
    title,
    duration: 1500,
    icon: 'none'
  })
  // 这里有bug,在1.5秒内再次发出一个tip
  const time_id = setTimeout(() => {
    clearTimeout(time_id)
    cur_tip_loading = false
  }, 1400)
}
/**
 * 跳转
 * @param page 页面名称
 * @param is_relaunch 是否关闭所有页面
 * 后期 is_relaunch 做处理,是参数还是关闭所有页面
 */
const wx_nav = (
  page: string,
  is_relaunch = false
) => {
  if (page === 'login') {
    if (APP.globalData.cur_login) {
      return
    } else {
      APP.globalData.cur_login = true
    }
  }
  const option = {
    url: `/pages/${page}/${page}`
  }
  if (is_relaunch) {
    wx.reLaunch(option)
  } else if (page_tabBar.includes(page)) {
    wx.switchTab(option)
  } else {
    wx.navigateTo(option)
  }
}

// 封装到wx_api里面
const wx_code = () => {
  return new Promise<string | null>((resolve, reject) => {
    const fail = () => {
      wx.showToast({
        title: '出错了!'
      })
      reject(null)
    }
    wx.login({
      success(res) {
        if (res.code) {
          resolve(res.code)
        } else {
          fail()
        }
      },
      fail
    })
  })
}

export default {
  wx_load,
  wx_load_hide,
  wx_tip,
  wx_err,
  wx_succes,
  wx_tip_mask,
  wx_code,
  wx_nav
}
