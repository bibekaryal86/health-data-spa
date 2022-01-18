import { CheckupCategoryType, DefaultCheckupCategory } from '../../checkup_category'

export interface CheckupComponentType {
  id: string
  checkupCategory: Partial<CheckupCategoryType>
  componentName: string
  standardLow?: string
  standardHigh?: string
  measureUnit?: string
  componentComments?: string
}

export interface CheckupComponentRequest {
  id: string
  checkupComponent: Partial<CheckupComponentType>
}

export interface CheckupComponentResponse {
  errMsg: string
  modifiedCount: number
  checkupComponentList: CheckupComponentType[]
}

export interface CheckupComponentState {
  errMsg: string
  success: string
  checkupComponentList: CheckupComponentType[]
  selectedCheckupComponent: CheckupComponentType
}

export interface CheckupComponentAction extends CheckupComponentState {
  type: string
}

export interface OneCheckupComponentAction {
  checkupComponent: CheckupComponentType
}

export const DefaultCheckupComponent: CheckupComponentType = {
  id: '',
  checkupCategory: DefaultCheckupCategory,
  componentName: '',
  standardLow: '',
  standardHigh: '',
  measureUnit: '',
  componentComments: '',
}

export const DefaultCheckupComponentState: CheckupComponentState = {
  errMsg: '',
  success: '',
  checkupComponentList: [],
  selectedCheckupComponent: DefaultCheckupComponent,
}
