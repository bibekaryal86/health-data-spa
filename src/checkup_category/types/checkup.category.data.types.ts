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

export const DefaultCheckupCategory: CheckupCategory = {
  id: '',
  categoryName: '',
}
