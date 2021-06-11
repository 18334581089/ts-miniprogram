import { api_get, api_post } from '../utils/request'

export default {
  list(params: I3_params) {
    return api_get<I3_declaration>(`channel/channelDeclarationList`, params)
  },
  add(params: I0_declaration) {
    return api_post<I0_res>(`channel/addChannelDeclaration`, params)
  },
  pro_list(treeId: string) {
    return api_get<Iproject>(`channel/hisIntentProjects/${treeId}`)
  },
  dep_list() {
    return api_get<Idepartment>(`channel/hisDepart`)
  },
  checkMobile(mobile: string) {
    return api_get<Idepartment>(`channel/checkMobile`, {
      mobile
    })
  }
}

export interface I0_res { response: null }
export interface Ipro_item {
  consultProjectId: string
  consultProjectName: string
}
export interface Idep_item {
  depId: string
  depName: string
  treeId: string
}
export interface I3_params {
  page: number
  limit: number
  queryStr: string
}
export interface I3_declaration {
  response: {
    rows: Array<I_dec_item>
    count: number
    limit: number
    page: number
    start: number
    totalPage: number
  }
}
export interface I0_declaration {
  deptId: string
  deptName: string
  remark: string
  projectId: string
  projectName: string
  patientPhone: string
  patientName: string
  sex: T_sex
  [key: string]: string
}
export interface Idepartment {
  response: Array<Idep_item>
}
export interface Iproject {
  response: Array<Ipro_item>
}
export interface I_dec_item {
  isReach: T_isreach
  waiterTime: number
  patientPhone: string
  patientName: string
  deptName: string
  projectName: string
}
type T_isreach = 'ARRIVE' | 'NOTARRIVE'

