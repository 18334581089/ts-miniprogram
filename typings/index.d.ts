/// <reference path="./types/index.d.ts" />

type T_sex = 'UNKNOWN' | 'MALE' | 'FEMALE'
type T_is = 'YES' | 'NO'
type T_input = WechatMiniprogram.Input
interface I_sexList {
  [index: number]: {
    label: string
    value: T_sex
  }
}
/**
 * 因为global用到了,所以放在全局
 */
interface loginBackData {
  username: string
  token: string
  userImg: string
  isBinding: T_is
}

interface IAppOption {
  globalData: {
    userInfo: WechatMiniprogram.UserInfo | null
    token: string
    can_reg: boolean
    cur_login: boolean
  }
}