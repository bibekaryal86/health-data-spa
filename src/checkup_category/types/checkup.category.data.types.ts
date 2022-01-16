export interface CheckupCategoryType {
  id: string
  categoryName: string
}

export interface CheckupCategoryRequest {
  id: string
  checkupCategory: CheckupCategoryType
}

export interface CheckupCategoryResponse {
  errMsg: string
  modifiedCount: number
  checkupCategoryList: CheckupCategoryType[]
}

export interface CheckupCategoryState {
  errMsg: string
  success: string
  checkupCategoryList: CheckupCategoryType[]
}

export interface CheckupCategoryAction extends CheckupCategoryState {
  type: string
}

export interface MerchantsReducerState {
  displayCheckupCategoryList: CheckupCategoryType[]
  checkupCategoryInActionId: string
  checkupCategoryInActionDesc: string
}

export const DefaultCheckupCategory: CheckupCategoryType = {
  id: '',
  categoryName: '',
}

export const DefaultCheckupCategoryState: CheckupCategoryState = {
  errMsg: '',
  success: '',
  checkupCategoryList: [],
}

export const DefaultMerchantsReducerState: MerchantsReducerState = {
  displayCheckupCategoryList: [],
  checkupCategoryInActionId: '',
  checkupCategoryInActionDesc: '',
}
