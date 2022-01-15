import { CheckupCategory } from '../types/checkup.category.data.types'
import { CHECKUP_CATEGORY_COMPLETE, CHECKUP_CATEGORY_FIND_SUCCESS } from '../types/checkup.category.action.types'

export const validateCheckupCategory = (categoryName: string): boolean =>
  !!(categoryName && categoryName.trim().length > 2)

export const checkupCategoriesRequest = (type: string) => ({
  type,
})

export const checkupCategoriesComplete = () => ({
  type: CHECKUP_CATEGORY_COMPLETE,
})

export const checkupCategoriesFailure = (type: string, errMsg: string) => ({
  type,
  errMsg,
})

export const checkupCategoriesFindSuccess = (checkupCategoryList: CheckupCategory[]) => ({
  type: CHECKUP_CATEGORY_FIND_SUCCESS,
  checkupCategoryList,
})

export const checkupCategoriesSuccess = (type: string, success: string) => ({
  type,
  success,
})
