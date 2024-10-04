import React from 'react'

import { GlobalDispatch } from '../../app/store/redux'
import { Async, FetchOptions, getEndpoint } from '../../common'
import { MSG_KEY_CHECKUP_RESULT_DELETE_ERROR, MSG_KEY_CHECKUP_RESULT_DELETE_SUCCESS } from '../../constants'
import {
  CHECKUP_RESULT_DELETE_FAILURE,
  CHECKUP_RESULT_DELETE_REQUEST,
  CHECKUP_RESULT_DELETE_SUCCESS,
} from '../types/checkup.result.action.types'
import { CheckupResultResponse } from '../types/checkup.result.data.types'
import {
  checkupResultsComplete,
  checkupResultsFailure,
  checkupResultsRequest,
  checkupResultsSuccess,
} from '../utils/checkup.result.utils'

export const checkupResultDeleteAction = (id: string) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch(checkupResultsRequest(CHECKUP_RESULT_DELETE_REQUEST))

    try {
      const endpoint = getEndpoint(process.env.RESULT_DELETE as string)
      const options: Partial<FetchOptions> = {
        method: 'DELETE',
        queryParams: {
          id,
        },
      }
      const checkupResultResponse = (await Async.fetch(endpoint, options)) as CheckupResultResponse

      if (checkupResultResponse?.errMsg?.length) {
        dispatch(checkupResultsFailure(CHECKUP_RESULT_DELETE_FAILURE, checkupResultResponse.errMsg))
      } else {
        dispatch(checkupResultsSuccess(CHECKUP_RESULT_DELETE_SUCCESS, MSG_KEY_CHECKUP_RESULT_DELETE_SUCCESS))
      }
    } catch (error) {
      console.log('Checkup Result Delete Error', error)
      dispatch(checkupResultsFailure(CHECKUP_RESULT_DELETE_FAILURE, MSG_KEY_CHECKUP_RESULT_DELETE_ERROR))
    } finally {
      dispatch(checkupResultsComplete())
    }
  }
}
