import React from 'react'

import { GlobalDispatch } from '../../app/store/redux'
import { Async, FetchOptions, getEndpoint } from '../../common'
import { MSG_KEY_CHECKUP_RESULT_INSERT_ERROR, MSG_KEY_CHECKUP_RESULT_INSERT_SUCCESS } from '../../constants'
import {
  CHECKUP_RESULT_INSERT_FAILURE,
  CHECKUP_RESULT_INSERT_REQUEST,
  CHECKUP_RESULT_INSERT_SUCCESS,
} from '../types/checkup.result.action.types'
import { CheckupResultRequest, CheckupResultResponse, CheckupResultType } from '../types/checkup.result.data.types'
import {
  checkupResultsComplete,
  checkupResultsFailure,
  checkupResultsRequest,
  checkupResultsSuccess,
} from '../utils/checkup.result.utils'

export const checkupResultInsertAction = (username: string, checkupResult: CheckupResultType) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch(checkupResultsRequest(CHECKUP_RESULT_INSERT_REQUEST))

    try {
      const checkupResultRequest: Partial<CheckupResultRequest> = {
        checkupResult: { ...checkupResult, username },
      }
      const endpoint = getEndpoint(process.env.RESULT_INSERT as string)
      const options: Partial<FetchOptions> = {
        method: 'POST',
        requestBody: checkupResultRequest,
      }
      const checkupResultResponse = (await Async.fetch(endpoint, options)) as CheckupResultResponse

      if (checkupResultResponse?.errMsg?.length) {
        dispatch(checkupResultsFailure(CHECKUP_RESULT_INSERT_FAILURE, checkupResultResponse.errMsg))
      } else {
        dispatch(checkupResultsSuccess(CHECKUP_RESULT_INSERT_SUCCESS, MSG_KEY_CHECKUP_RESULT_INSERT_SUCCESS))
      }
    } catch (error) {
      console.log('Checkup Result Insert Error', error)
      dispatch(checkupResultsFailure(CHECKUP_RESULT_INSERT_FAILURE, MSG_KEY_CHECKUP_RESULT_INSERT_ERROR))
    } finally {
      dispatch(checkupResultsComplete())
    }
  }
}
