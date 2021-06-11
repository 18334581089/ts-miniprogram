import config from './env'
import util from '../utils/util'

const { BASE_URL, STORE_ID } = config
const APP = getApp<IAppOption>()
type Method = 'GET' | 'POST'

const success_handle = (res: any) => {
  console.log(res)
  const code = res.data.code
  if (code === 200) {
    return res.data.data || res.data
  } else {
    util.wx_err(res.data.message)
    if (code === 403) {
      util.wx_nav('login')
      getApp<IAppOption>().globalData.can_reg = true
    }
    return null
  }
}

const fail_handle = (err: any) => {
  console.log(err)
  util.wx_err('网络出错了!')
  return null
}

export const request = <T>(
  url: string,
  datas?: any,
  method: Method = 'GET',
  headers = {}
): Promise<T | null> => {
  const header = {
    Authorization: 'Bearer ' + APP.globalData.token,
    ...headers
  }
  const data = {
    storeId: STORE_ID,
    ...datas
  }
  const request = new Promise<T | null>((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header,
      success: (res: any) => resolve(res),
      fail: (err) => reject(err),
      // complete: wx.hideLoading // 如何把loading写在公共方法里
    })
  })
    .then(success_handle)
    .catch(fail_handle)
  return request
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
