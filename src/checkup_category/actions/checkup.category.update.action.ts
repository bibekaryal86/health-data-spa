import React from 'react'
import { GlobalDispatch } from '../../app/store/redux'
import {
  checkupCategoriesComplete,
  checkupCategoriesFailure,
  checkupCategoriesRequest,
  checkupCategoriesSuccess,
  validateCheckupCategory,
} from '../utils/checkup.category.utils'
import { CheckupCategoryRequest, CheckupCategoryResponse } from '../types/checkup.category.data.types'
import { Async, FetchOptions, getEndpoint } from '../../common'
import {
  CHECKUP_CATEGORY_INSERT_SUCCESS,
  CHECKUP_CATEGORY_UPDATE_FAILURE,
  CHECKUP_CATEGORY_UPDATE_REQUEST,
} from '../types/checkup.category.action.types'
import {
  MSG_KEY_CHECKUP_CATEGORY_INVALID,
  MSG_KEY_CHECKUP_CATEGORY_UPDATE_ERROR,
  MSG_KEY_CHECKUP_CATEGORY_UPDATE_SUCCESS,
} from '../../constants'

export const checkupCategoryUpdateAction = (id: string, categoryName: string) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch(checkupCategoriesRequest(CHECKUP_CATEGORY_UPDATE_REQUEST))

    try {
      if (validateCheckupCategory(categoryName)) {
        const checkupCategoryRequest: CheckupCategoryRequest = {
          id,
          checkupCategory: {
            id,
            categoryName,
          },
        }
        const endpoint = getEndpoint(process.env.CATEGORY_UPDATE as string)
        const options: Partial<FetchOptions> = {
          method: 'PUT',
          requestBody: checkupCategoryRequest,
        }
        const checkupCategoryResponse = (await Async.fetch(endpoint, options)) as CheckupCategoryResponse

        if (checkupCategoryResponse?.errMsg?.length) {
          dispatch(checkupCategoriesFailure(CHECKUP_CATEGORY_UPDATE_FAILURE, checkupCategoryResponse.errMsg))
        } else {
          dispatch(checkupCategoriesSuccess(CHECKUP_CATEGORY_INSERT_SUCCESS, MSG_KEY_CHECKUP_CATEGORY_UPDATE_SUCCESS))
        }
      } else {
        dispatch(checkupCategoriesFailure(CHECKUP_CATEGORY_UPDATE_FAILURE, MSG_KEY_CHECKUP_CATEGORY_INVALID))
      }
    } catch (error) {
      console.log('Checkup Category Update Error', error)
      dispatch(checkupCategoriesFailure(CHECKUP_CATEGORY_UPDATE_FAILURE, MSG_KEY_CHECKUP_CATEGORY_UPDATE_ERROR))
    } finally {
      dispatch(checkupCategoriesComplete())
    }
  }
}
