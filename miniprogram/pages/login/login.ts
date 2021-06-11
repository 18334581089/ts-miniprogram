import api_login, { IRegister } from '../../services/api_login'
import util from '../../utils/util'
const APP = getApp<IAppOption>()
const DESC = '用于完善您的用户资料'

Page({
  data: <ILogin_data>{
    canIUseGetUserProfile: true,
    has_user_info: false,
    can_reg: APP.globalData.can_reg
  },
  onLoad(): void {
    this.login2()
  },
  onLoginClick(): void {
    wx.getUserProfile({
      desc: DESC,
      success: (res) => {
        APP.globalData.userInfo = res.userInfo
        util.wx_err('首次登录需要绑定您的手机号!')
        this.setData({ has_user_info: true })
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          title: '获取失败!',
          icon: 'none'
        })
      },
      complete() {
      }
    })
  },
  handle_login(e: backuser_data): void {
    console.log(e)
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
  },
  on_login_btn(): void {
    wx.getUserProfile({
      desc: DESC,
      success: (
        res: profile_data
      ): void => {
        APP.globalData.userInfo = res.userInfo
        wx.setStorageSync('userInfo', res.userInfo)
        util.wx_tip('首次登录需要绑定您的手机号!')
        this.setData({ has_user_info: true })
      },
      fail() {
        util.wx_err('获取失败!')
      }
    })
  },
  handle_data(data: loginBackData | null): void {
    if (data) {
      APP.globalData.token = data.token
      const page_name = data.isBinding === 'YES' ? 'index' : 'auth'
      util.wx_nav(page_name)
    } else {
      this.handle_fail()
    }
  },
  handle_fail(): void {
    this.setData({
      can_reg: APP.globalData.can_reg,
      canIUseGetUserProfile: wx.getUserProfile !== undefined,
      has_user_info: APP.globalData.userInfo !== null
    })
  },
  async onGetPhoneClick({ detail }: phone_data) {
    if (APP.globalData.userInfo) {
      const params = <IRegister>{
        code: '',
        iv: detail.iv,
        encrypted: detail.encryptedData,
        img: APP.globalData.userInfo.avatarUrl,
        nickname: APP.globalData.userInfo.nickName,
        sex: <T_sex>util.format_sex(APP.globalData.userInfo.gender)
      }
      this.login3(params)
    } else {
      util.wx_err('数据异常!')
      this.setData({
        has_user_info: false
      })
    }
  },
  async login3(params: IRegister): Promise<void> {
    util.wx_load('正在登陆...')
    const code: string | null = await util.wx_code()
    if (code) {
      const data: loginBackData | null = await api_login.login3({
        ...params,
        code
      })
      util.wx_load_hide()
      this.handle_data(data)
    } else {
      util.wx_load_hide()
    }
  },
  async login2(): Promise<void> {
    util.wx_load('正在登陆...')
    const code: string | null = await util.wx_code()
    if (code) {
      const data: loginBackData | null = await api_login.login2(code)
      util.wx_load_hide()
      this.handle_data(data)
    } else {
      util.wx_load_hide()
    }
  }
})
type phone_data = WechatMiniprogram.ButtonGetPhoneNumber
type profile_data = WechatMiniprogram.GetUserProfileSuccessCallbackResult
type backuser_data = WechatMiniprogram.ButtonGetUserInfo
interface ILogin_data {
  canIUseGetUserProfile: boolean
  has_user_info: boolean
  can_reg: boolean
}