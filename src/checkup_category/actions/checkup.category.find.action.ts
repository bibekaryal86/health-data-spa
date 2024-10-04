import React from 'react'

import { GlobalDispatch, GlobalState } from '../../app/store/redux'
import { Async, getEndpoint } from '../../common'
import { MSG_KEY_CHECKUP_CATEGORY_FIND_ERROR } from '../../constants'
import { CHECKUP_CATEGORY_FIND_FAILURE, CHECKUP_CATEGORY_FIND_REQUEST } from '../types/checkup.category.action.types'
import { CheckupCategoryResponse, CheckupCategoryType } from '../types/checkup.category.data.types'
import {
  checkupCategoriesComplete,
  checkupCategoriesFailure,
  checkupCategoriesFindSuccess,
  checkupCategoriesRequest,
} from '../utils/checkup.category.utils'

export const checkupCategoryFindAction = (isFetchCall?: boolean) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>, getStore: () => GlobalState): Promise<void> => {
    dispatch(checkupCategoriesRequest(CHECKUP_CATEGORY_FIND_REQUEST))

    try {
      let checkupCategoryResponse: CheckupCategoryResponse
      const checkupCategoryInStore: CheckupCategoryType[] = getStore().checkupCategory?.checkupCategoryList || []

      if (checkupCategoryInStore.length == 0 || isFetchCall) {
        const endpoint = getEndpoint(process.env.CATEGORY_FIND as string)
        checkupCategoryResponse = (await Async.fetch(endpoint, {})) as CheckupCategoryResponse
      } else {
        checkupCategoryResponse = {
          errMsg: '',
          modifiedCount: 0,
          checkupCategoryList: checkupCategoryInStore,
        }
      }

      if (checkupCategoryResponse?.errMsg?.length) {
        dispatch(checkupCategoriesFailure(CHECKUP_CATEGORY_FIND_FAILURE, checkupCategoryResponse.errMsg))
      } else {
        dispatch(checkupCategoriesFindSuccess(checkupCategoryResponse.checkupCategoryList))
      }
    } catch (error) {
      console.log('Checkup Categories Find Error', error)
      dispatch(checkupCategoriesFailure(CHECKUP_CATEGORY_FIND_FAILURE, MSG_KEY_CHECKUP_CATEGORY_FIND_ERROR))
    } finally {
      dispatch(checkupCategoriesComplete())
    }
  }
}
