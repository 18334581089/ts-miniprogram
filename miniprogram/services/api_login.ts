import { api_get, api_post } from '../utils/request'

export default {
  login2(code: string) {
    return api_get<loginBackData>(`checkCode`, { code })
  },
  login3(params: IRegister) {
    return api_post<loginBackData>(`channelRegisterloginMobile`, params)
  }
}
export interface IRegister {
  encrypted: string
  iv: string
  code: string,
  img: string
  nickname: string
  sex: string
}