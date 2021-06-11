import { PURE_SEX } from './pure'
import wx_api from './wx_api'

const formatNumber = (n: number): string => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

const formatTime = (
  T: string | number
): string => {
  const date = new Date(+T * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const format_sex = (gender: number): T_sex => {
  const item = PURE_SEX[gender]
  return item.value
}

export default {
  ...wx_api,
  format_sex,
  formatTime
}