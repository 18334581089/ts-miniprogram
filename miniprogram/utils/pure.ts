/**
 * 顺序不能修改,因为: userInfo.gender 是按照0,1,2 => 未知,男,女返回的
 */
interface ISex_item { label: string, value: T_sex }
type TSex_list = Array<ISex_item>
export const PURE_SEX: TSex_list = [
  { label: '未知', value: 'UNKNOWN' },
  { label: '男', value: 'MALE' },
  { label: '女', value: 'FEMALE' }
]

export const declaration_default = {
  deptId: "",
  deptName: "",
  remark: "",
  projectId: "",
  projectName: "",
  patientPhone: "",
  patientName: "",
  sex: "UNKNOWN"
}
