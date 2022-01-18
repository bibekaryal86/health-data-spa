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

export interface CheckupCategoryLocalState {
  selectedCheckupCategoryId: string
  selectedCheckupCategoryName: string
  isInsertModalOpen: boolean
  isUpdateModalOpen: boolean
  isDeleteModalOpen: boolean
  categoryNameModalInput: string
}

export interface CheckupCategoryLocalAction extends CheckupCategoryLocalState {
  type: string
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

export const DefaultCheckupCategoryLocalState: CheckupCategoryLocalState = {
  selectedCheckupCategoryId: '',
  selectedCheckupCategoryName: '',
  isInsertModalOpen: false,
  isUpdateModalOpen: false,
  isDeleteModalOpen: false,
  categoryNameModalInput: '',
}
