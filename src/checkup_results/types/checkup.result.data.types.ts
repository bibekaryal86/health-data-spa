import { CheckupCategoryType } from '../../checkup_category'
import { CheckupComponentType, DefaultCheckupComponent } from '../../checkup_component'

export interface CheckupResultType {
  id: string
  username: string
  checkupComponent: CheckupComponentType
  checkupDate: string
  testResult: string
  resultFlag: string
}

export interface CheckupResultRequest {
  id: string
  checkupResult: CheckupResultType
}

export interface CheckupResultResponse {
  errMsg: string
  modifiedCount: number
  checkupResultList: CheckupResultType[]
}

export interface CheckupResultState {
  errMsg: string
  success: string
  checkupResultList: CheckupResultType[]
  selectedCheckupResult: CheckupResultType
  checkupCategoryList: CheckupCategoryType[]
  checkupComponentList: CheckupComponentType[]
}

export interface CheckupResultAction extends CheckupResultState {
  type: string
}

export interface CheckupResultDetailsAction {
  checkupResult: CheckupResultType
}

export interface CheckupResultUpdate {
  componentId: string
  checkupDate: string
  testResult: string
  resultFlag: string
}

export const DefaultCheckupResult: CheckupResultType = {
  id: '',
  username: '',
  checkupComponent: DefaultCheckupComponent,
  checkupDate: '',
  testResult: '',
  resultFlag: '',
}

export const DefaultCheckupResultState: CheckupResultState = {
  errMsg: '',
  success: '',
  checkupResultList: [],
  selectedCheckupResult: DefaultCheckupResult,
  checkupCategoryList: [],
  checkupComponentList: [],
}
