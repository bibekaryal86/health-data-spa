import React from 'react'
import { GlobalDispatch } from '../../app/store/redux'
import {
  checkupComponentsComplete,
  checkupComponentsFailure,
  checkupComponentsRequest,
  checkupComponentsSuccess,
} from '../utils/checkup.component.utils'
import { CheckupComponentResponse } from '../types/checkup.component.data.types'
import { Async, FetchOptions, getEndpoint } from '../../common'
import {
  CHECKUP_COMPONENT_DELETE_FAILURE,
  CHECKUP_COMPONENT_DELETE_REQUEST,
  CHECKUP_COMPONENT_DELETE_SUCCESS,
} from '../types/checkup.component.action.types'
import { MSG_KEY_CHECKUP_COMPONENT_DELETE_ERROR, MSG_KEY_CHECKUP_COMPONENT_DELETE_SUCCESS } from '../../constants'

export const checkupComponentDeleteAction = (id: string) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch(checkupComponentsRequest(CHECKUP_COMPONENT_DELETE_REQUEST))

    try {
      const endpoint = getEndpoint(process.env.COMPONENT_DELETE as string)
      const options: Partial<FetchOptions> = {
        method: 'DELETE',
        queryParams: {
          id,
        },
      }
      const checkupComponentResponse = (await Async.fetch(endpoint, options)) as CheckupComponentResponse

      if (checkupComponentResponse?.errMsg?.length) {
        dispatch(checkupComponentsFailure(CHECKUP_COMPONENT_DELETE_FAILURE, checkupComponentResponse.errMsg))
      } else {
        dispatch(checkupComponentsSuccess(CHECKUP_COMPONENT_DELETE_SUCCESS, MSG_KEY_CHECKUP_COMPONENT_DELETE_SUCCESS))
      }
    } catch (error) {
      console.log('Checkup Component Delete Error', error)
      dispatch(checkupComponentsFailure(CHECKUP_COMPONENT_DELETE_FAILURE, MSG_KEY_CHECKUP_COMPONENT_DELETE_ERROR))
    } finally {
      dispatch(checkupComponentsComplete())
    }
  }
}
