import React from 'react'

import { GlobalDispatch } from '../../app/store/redux'
import { Async, FetchOptions, getEndpoint } from '../../common'
import { MSG_KEY_CHECKUP_RESULT_UPDATE_ERROR, MSG_KEY_CHECKUP_RESULT_UPDATE_SUCCESS } from '../../constants'
import {
  CHECKUP_RESULT_UPDATE_FAILURE,
  CHECKUP_RESULT_UPDATE_REQUEST,
  CHECKUP_RESULT_UPDATE_SUCCESS,
} from '../types/checkup.result.action.types'
import { CheckupResultRequest, CheckupResultResponse, CheckupResultType } from '../types/checkup.result.data.types'
import {
  checkupResultsComplete,
  checkupResultsFailure,
  checkupResultsRequest,
  checkupResultsSuccess,
} from '../utils/checkup.result.utils'

export const checkupResultUpdateAction = (id: string, checkupResult: CheckupResultType) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch(checkupResultsRequest(CHECKUP_RESULT_UPDATE_REQUEST))

    try {
      const checkupResultRequest: CheckupResultRequest = {
        id,
        checkupResult,
      }
      const endpoint = getEndpoint(process.env.RESULT_UPDATE as string)
      const options: Partial<FetchOptions> = {
        method: 'PUT',
        requestBody: checkupResultRequest,
      }
      const checkupResultResponse = (await Async.fetch(endpoint, options)) as CheckupResultResponse

      if (checkupResultResponse?.errMsg?.length) {
        dispatch(checkupResultsFailure(CHECKUP_RESULT_UPDATE_FAILURE, checkupResultResponse.errMsg))
      } else {
        dispatch(checkupResultsSuccess(CHECKUP_RESULT_UPDATE_SUCCESS, MSG_KEY_CHECKUP_RESULT_UPDATE_SUCCESS))
      }
    } catch (error) {
      console.log('Checkup Result Update Error', error)
      dispatch(checkupResultsFailure(CHECKUP_RESULT_UPDATE_FAILURE, MSG_KEY_CHECKUP_RESULT_UPDATE_ERROR))
    } finally {
      dispatch(checkupResultsComplete())
    }
  }
}
