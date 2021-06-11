import api_channel, { I0_declaration, Ipro_item, Idep_item, Idepartment, Iproject, I0_res } from '../../services/api_channel'
import { PURE_SEX, declaration_default } from '../../utils/pure'
import util from '../../utils/util'

Page({
  data: {
    params: <I0_declaration>declaration_default,
    departmentlist: <Array<Idep_item>><unknown>[],
    prolist: <Array<Ipro_item>><unknown>[],
    radios: <I_sexList>PURE_SEX,
    show_select_dep: false,
    show_select_pro: false,
    depname_value: '',
    project_value: ''
  },
  select_launch () {
    this.setData({
      "params.projectId": '',
      "params.projectName": '',
      show_select_pro: false,
      show_select_dep: true,
      project_value: ''
    })
  },
  select_launch2 () {
    if (this.data.prolist.length > 0) {
      this.setData({
        show_select_dep: false,
        show_select_pro: true
      })
    }
  },
  onLoad(): void {
    this.setData({
      'params.patientPhone': wx.getStorageSync('phone')
    })
    this.a_departmentlist()
  },
  on_add(): void {
    let isok = true
    for (const key in this.data.params) {
      const element = this.data.params[key]
      if (!element) {
        isok = false
        wx.showToast({
          title: '还有没有填的空',
          icon: 'none'
        })
      }
    }
    if (isok) {
      this.a_add()
    }
  },
  bindKeyChange(e: T_input): void {
    const name = 'params.' + e.target.dataset.name
    this.setData({
      [name]: e.detail.value
    })
  },
  radioChange(e: WechatMiniprogram.RadioGroupChange): void {
    this.setData({
      'params.sex': e.detail.value as T_sex
    })
  },
  checkboxChange(e: WechatMiniprogram.CheckboxGroupChange): void {
    const { depId, depName, treeId }: Idep_item = e.target.dataset.item
    this.setData({
      "params.deptId": depId,
      "params.deptName": depName,
      depname_value: depName,
      show_select_dep: false
    })
    this.a_prolist(treeId)
  },
  checkboxChange2(e: any): void {
    const { consultProjectId, consultProjectName }: Ipro_item = e.target.dataset.item
    this.setData({
      "params.projectId": consultProjectId,
      "params.projectName": consultProjectName,
      project_value: consultProjectName,
      show_select_pro: false
    })
  },
  async a_departmentlist(): Promise<void> {
    const res: Idepartment | null = await api_channel.dep_list()
    if (res) {
      this.setData({
        departmentlist: res.response
      })
    }
  },
  async a_prolist(_treeId: string): Promise<void> {
    const res: Iproject | null = await api_channel.pro_list(_treeId)
    if (res) {
      this.setData({
        prolist: res.response
      })
    }
  },
  async a_add(): Promise<void> {
    const data: I0_res | null = await api_channel.add(this.data.params)
    if (data) {
      util.wx_succes('添加成功', () => util.wx_nav('index'))
    }
  }
})