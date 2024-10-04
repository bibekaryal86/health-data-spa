import React from 'react'

import { GlobalDispatch } from '../../app/store/redux'
import { Async, FetchOptions, getEndpoint } from '../../common'
import {
  MSG_KEY_CHECKUP_CATEGORY_INSERT_ERROR,
  MSG_KEY_CHECKUP_CATEGORY_INSERT_SUCCESS,
  MSG_KEY_CHECKUP_CATEGORY_INVALID,
} from '../../constants'
import {
  CHECKUP_CATEGORY_INSERT_FAILURE,
  CHECKUP_CATEGORY_INSERT_REQUEST,
  CHECKUP_CATEGORY_INSERT_SUCCESS,
} from '../types/checkup.category.action.types'
import { CheckupCategoryRequest, CheckupCategoryResponse } from '../types/checkup.category.data.types'
import {
  checkupCategoriesComplete,
  checkupCategoriesFailure,
  checkupCategoriesRequest,
  checkupCategoriesSuccess,
  validateCheckupCategory,
} from '../utils/checkup.category.utils'

export const checkupCategoryInsertAction = (categoryName: string) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch(checkupCategoriesRequest(CHECKUP_CATEGORY_INSERT_REQUEST))

    try {
      if (validateCheckupCategory(categoryName)) {
        const checkupCategoryRequest: Partial<CheckupCategoryRequest> = {
          checkupCategory: {
            id: '',
            categoryName,
          },
        }
        const endpoint = getEndpoint(process.env.CATEGORY_INSERT as string)
        const options: Partial<FetchOptions> = {
          method: 'POST',
          requestBody: checkupCategoryRequest,
        }
        const checkupCategoryResponse = (await Async.fetch(endpoint, options)) as CheckupCategoryResponse

        if (checkupCategoryResponse?.errMsg?.length) {
          dispatch(checkupCategoriesFailure(CHECKUP_CATEGORY_INSERT_FAILURE, checkupCategoryResponse.errMsg))
        } else {
          dispatch(checkupCategoriesSuccess(CHECKUP_CATEGORY_INSERT_SUCCESS, MSG_KEY_CHECKUP_CATEGORY_INSERT_SUCCESS))
        }
      } else {
        dispatch(checkupCategoriesFailure(CHECKUP_CATEGORY_INSERT_FAILURE, MSG_KEY_CHECKUP_CATEGORY_INVALID))
      }
    } catch (error) {
      console.log('Checkup Category Insert Error', error)
      dispatch(checkupCategoriesFailure(CHECKUP_CATEGORY_INSERT_FAILURE, MSG_KEY_CHECKUP_CATEGORY_INSERT_ERROR))
    } finally {
      dispatch(checkupCategoriesComplete())
    }
  }
}
