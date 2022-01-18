import React from 'react'
import { GlobalDispatch } from '../../app/store/redux'
import {
  checkupComponentsComplete,
  checkupComponentsFailure,
  checkupComponentsRequest,
  checkupComponentsSuccess,
  validateCheckupComponent,
} from '../utils/checkup.component.utils'
import {
  CheckupComponentRequest,
  CheckupComponentResponse,
  CheckupComponentType,
} from '../types/checkup.component.data.types'
import { Async, FetchOptions, getEndpoint } from '../../common'
import {
  CHECKUP_COMPONENT_INSERT_FAILURE,
  CHECKUP_COMPONENT_INSERT_REQUEST,
  CHECKUP_COMPONENT_INSERT_SUCCESS,
} from '../types/checkup.component.action.types'
import {
  MSG_KEY_CHECKUP_COMPONENT_INSERT_ERROR,
  MSG_KEY_CHECKUP_COMPONENT_INSERT_SUCCESS,
  MSG_KEY_CHECKUP_COMPONENT_INVALID,
} from '../../constants'

export const checkupComponentInsertAction = (checkupComponent: CheckupComponentType) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch(checkupComponentsRequest(CHECKUP_COMPONENT_INSERT_REQUEST))

    try {
      if (validateCheckupComponent(checkupComponent)) {
        const checkupComponentRequest: Partial<CheckupComponentRequest> = {
          checkupComponent,
        }
        const endpoint = getEndpoint(process.env.COMPONENT_INSERT as string)
        const options: Partial<FetchOptions> = {
          method: 'POST',
          requestBody: checkupComponentRequest,
        }
        const checkupComponentResponse = (await Async.fetch(endpoint, options)) as CheckupComponentResponse

        if (checkupComponentResponse?.errMsg?.length) {
          dispatch(checkupComponentsFailure(CHECKUP_COMPONENT_INSERT_FAILURE, checkupComponentResponse.errMsg))
        } else {
          dispatch(checkupComponentsSuccess(CHECKUP_COMPONENT_INSERT_SUCCESS, MSG_KEY_CHECKUP_COMPONENT_INSERT_SUCCESS))
        }
      } else {
        dispatch(checkupComponentsFailure(CHECKUP_COMPONENT_INSERT_FAILURE, MSG_KEY_CHECKUP_COMPONENT_INVALID))
      }
    } catch (error) {
      console.log('Checkup Component Insert Error', error)
      dispatch(checkupComponentsFailure(CHECKUP_COMPONENT_INSERT_FAILURE, MSG_KEY_CHECKUP_COMPONENT_INSERT_ERROR))
    } finally {
      dispatch(checkupComponentsComplete())
    }
  }
}
