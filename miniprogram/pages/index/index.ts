import api_channel, { I3_declaration, I_dec_item, I3_params } from '../../services/api_channel'
import util from '../../utils/util'

Page({
  data: <IPageData>{
    input_vlaue: '',
    phone_vlaue: '',
    list: [],
    dialog: false,
    params: {
      page: 1,
      limit: 20,
      queryStr: ''
    }
  },
  onShow(): void {
    this.click_search()
  },
  handle_more(): void {
    this.setData({
      'params.page': ++this.data.params.page
    }, this.a_list)
  },
  click_search(): void {
    if (this.data.params.page === 1) {
      this.a_list()
    } else {
      this.setData({
        'params.page': 1
      }, this.a_list)
    }
  },
  click_dialog(): void {
    this.setData({
      dialog: true
    })
  },
  click_add(): void {
    const phone_vlaue = this.data.phone_vlaue
    if (phone_vlaue && phone_vlaue.length === 11) {
      this.a_phone()
    } else {
      wx.showToast({
        title: '内容有误!',
        icon: 'none'
      })
    }
  },
  handle_input(e: T_input): void {
    const name = e.target.dataset.name
    this.setData({
      [name]: e.detail.value
    })
  },
  handle_close(): void {
    this.setData({
      dialog: false,
      phone_vlaue: ''
    })
  },
  async a_phone() {
    const data = await api_channel.checkMobile(this.data.phone_vlaue)
    wx.setStorageSync('phone', this.data.phone_vlaue)
    if (data) {
      this.setData({
        dialog: false,
        phone_vlaue: ''
      }, () => util.wx_nav('declarationAdd'))
    }
  },
  async a_list(): Promise<void> {
    const { page } = this.data.params
    const data: I3_declaration | null = await api_channel.list(this.data.params)
    if (data) {
      const _list = data.response.rows
      this.setData({
        list: (page === 1) ? _list : this.data.list.concat(_list)
      })
      if (page > 1 && _list.length === 0) {
        util.wx_tip_mask('没有更多!')
      }
    }
  }
})

interface IPageData {
  input_vlaue: string
  phone_vlaue: string
  list: Array<I_dec_item>
  dialog: boolean
  params: I3_params
}
