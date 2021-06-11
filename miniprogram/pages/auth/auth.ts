import api_login from "../../services/api_login"
import util from "../../utils/util"

Page({
  async onSureClick(): Promise<void> {
    const data: loginBackData | null = await api_login.isBinding()
    if (data) {
      if (data.isBinding === 'YES') {
        util.wx_success('已绑定', 'index')
      } else {
        util.wx_tip('未绑定')
      }
    }
  }
})