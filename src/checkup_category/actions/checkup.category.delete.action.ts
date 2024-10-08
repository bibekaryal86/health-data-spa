import React from 'react'

import { GlobalDispatch } from '../../app/store/redux'
import { Async, FetchOptions, getEndpoint } from '../../common'
import { MSG_KEY_CHECKUP_CATEGORY_DELETE_ERROR, MSG_KEY_CHECKUP_CATEGORY_DELETE_SUCCESS } from '../../constants'
import {
  CHECKUP_CATEGORY_DELETE_FAILURE,
  CHECKUP_CATEGORY_DELETE_REQUEST,
  CHECKUP_CATEGORY_DELETE_SUCCESS,
} from '../types/checkup.category.action.types'
import { CheckupCategoryResponse } from '../types/checkup.category.data.types'
import {
  checkupCategoriesComplete,
  checkupCategoriesFailure,
  checkupCategoriesRequest,
  checkupCategoriesSuccess,
} from '../utils/checkup.category.utils'

export const checkupCategoryDeleteAction = (id: string) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch(checkupCategoriesRequest(CHECKUP_CATEGORY_DELETE_REQUEST))

    try {
      const endpoint = getEndpoint(process.env.CATEGORY_DELETE as string)
      const options: Partial<FetchOptions> = {
        method: 'DELETE',
        queryParams: {
          id,
        },
      }
      const checkupCategoryResponse = (await Async.fetch(endpoint, options)) as CheckupCategoryResponse

      if (checkupCategoryResponse?.errMsg?.length) {
        dispatch(checkupCategoriesFailure(CHECKUP_CATEGORY_DELETE_FAILURE, checkupCategoryResponse.errMsg))
      } else {
        dispatch(checkupCategoriesSuccess(CHECKUP_CATEGORY_DELETE_SUCCESS, MSG_KEY_CHECKUP_CATEGORY_DELETE_SUCCESS))
      }
    } catch (error) {
      console.log('Checkup Category Delete Error', error)
      dispatch(checkupCategoriesFailure(CHECKUP_CATEGORY_DELETE_FAILURE, MSG_KEY_CHECKUP_CATEGORY_DELETE_ERROR))
    } finally {
      dispatch(checkupCategoriesComplete())
    }
  }
}
