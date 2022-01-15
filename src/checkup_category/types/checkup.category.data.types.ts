export interface CheckupCategory {
  id: string
  categoryName: string
}

export interface CheckupCategoryRequest {
  id: string
  checkupCategory: CheckupCategory
}

export interface CheckupCategoryResponse {
  errMsg: string
  modifiedCount: number
  checkupCategoryList: CheckupCategory[]
}

export interface CheckupCategoryState {
  errMsg: string
  success: string
  checkupCategoryList: CheckupCategory[]
}

export const DefaultCheckupCategory: CheckupCategory = {
  id: '',
  categoryName: '',
}

export const DefaultCheckupCategoryResponse: CheckupCategoryResponse = {
  errMsg: '',
  modifiedCount: 0,
  checkupCategoryList: [],
}

export const DefaultCheckupCategoryState: CheckupCategoryState = {
  errMsg: '',
  success: '',
  checkupCategoryList: [],
}
