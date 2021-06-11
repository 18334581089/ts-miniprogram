import config from './env'
import util from '../utils/util'
import { DefinitionInfoAndBoundSpanReponse } from '../../$node_modules/typescript/lib/protocol'

const { BASE_URL, STORE_ID } = config
const APP = getApp<IAppOption>()

function success_handle<T>(
  res: I_reponse<T>
): T | null {
  console.log(res)
  const { code, data, message } = res.data
  if (code === 200) {
    return data
  } else if (code === 403) {
    APP.globalData.can_reg = true
    util.wx_err(message, 'login')
    return null
  } else {
    util.wx_err(message)
    return null
  }
}

function fail_handle(
  err: I_reponse_err
): null {
  console.log(err.errMsg)
  util.wx_err('网络出错了!')
  return null
}

export const request = <res_t>(
  url: string,
  datas?: any,
  method: T_method = 'GET',
  headers = {}
): Promise<res_t | null> => {
  const header = {
    Authorization: 'Bearer ' + APP.globalData.token,
    ...headers
  }
  const data = {
    storeId: STORE_ID,
    ...datas
  }
  const wx_request = new Promise<res_t | null>((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header,
      // success: (res: T_wx_res<res_t>) => {
      // success (res: PromiseLike<res_t>) {
      success (res: any) {
        resolve(res)
      },

      fail: (err) => reject(err),
      // complete: wx.hideLoading // 如何把loading写在公共方法里
    })
  })
  // .then((res: I_reponse<T>) => success_handle(res))
  // .catch(fail_handle)
  return wx_request
}

export const api_get = <T>(
  url = '/', data = {}, headers = {}
): Promise<T | null> => {
  return request(`${BASE_URL}/api/${url}`, data, 'GET', headers)
}
export const api_post = <T>(
  url = '/', data = {}
): Promise<T | null> => {
  return request(`${BASE_URL}/api/${url}?storeId=${STORE_ID}`, data, 'POST')
}

type T_method = 'GET' | 'POST'
type T_wx_res<T> = WechatMiniprogram.RequestSuccessCallbackResult<T>
interface I_reponse<T> {
  data: {
    code: number
    message: string
    data: T
  }
}
interface I_reponse_err {
  errMsg: string
}