import React from 'react'

import { GlobalDispatch } from '../../app/store/redux'
import {
  CHECKUP_CATEGORY_COMPLETE,
  CHECKUP_CATEGORY_FIND_SUCCESS,
  CHECKUP_CATEGORY_MODAL_CLOSE,
  CHECKUP_CATEGORY_MODAL_DELETE,
  CHECKUP_CATEGORY_MODAL_INPUT,
  CHECKUP_CATEGORY_MODAL_INSERT,
  CHECKUP_CATEGORY_MODAL_UPDATE,
  CHECKUP_CATEGORY_SELECT_CATEGORY,
  CHECKUP_CATEGORY_UNMOUNT,
} from '../types/checkup.category.action.types'
import { CheckupCategoryLocalAction, CheckupCategoryType } from '../types/checkup.category.data.types'

export const checkupCategoryReset = () => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch({
      type: CHECKUP_CATEGORY_UNMOUNT,
    })
  }
}

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

export const checkupCategoriesFindSuccess = (checkupCategoryList: CheckupCategoryType[]) => ({
  type: CHECKUP_CATEGORY_FIND_SUCCESS,
  checkupCategoryList,
})

export const checkupCategoriesSuccess = (type: string, success: string) => ({
  type,
  success,
})

export const setSelectedCheckupCategory = (id: string, name: string): Partial<CheckupCategoryLocalAction> => ({
  type: CHECKUP_CATEGORY_SELECT_CATEGORY,
  selectedCheckupCategoryId: id,
  selectedCheckupCategoryName: name,
})

export const setCheckupCategoriesInsertModalOpen = (isOpen: boolean): Partial<CheckupCategoryLocalAction> => ({
  type: CHECKUP_CATEGORY_MODAL_INSERT,
  isInsertModalOpen: isOpen,
})

export const setCheckupCategoriesUpdateModalOpen = (isOpen: boolean): Partial<CheckupCategoryLocalAction> => ({
  type: CHECKUP_CATEGORY_MODAL_UPDATE,
  isUpdateModalOpen: isOpen,
})

export const setCheckupCategoriesDeleteModalOpen = (isOpen: boolean): Partial<CheckupCategoryLocalAction> => ({
  type: CHECKUP_CATEGORY_MODAL_DELETE,
  isDeleteModalOpen: isOpen,
})

export const setCheckupCategoriesModalInput = (modalInput: string): Partial<CheckupCategoryLocalAction> => ({
  type: CHECKUP_CATEGORY_MODAL_INPUT,
  categoryNameModalInput: modalInput.toUpperCase(),
})

export const setCheckupCategoriesModalClose = (): Partial<CheckupCategoryLocalAction> => ({
  type: CHECKUP_CATEGORY_MODAL_CLOSE,
})
