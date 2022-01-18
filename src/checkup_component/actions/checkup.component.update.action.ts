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
  CHECKUP_COMPONENT_UPDATE_FAILURE,
  CHECKUP_COMPONENT_UPDATE_REQUEST,
  CHECKUP_COMPONENT_UPDATE_SUCCESS,
} from '../types/checkup.component.action.types'
import {
  MSG_KEY_CHECKUP_COMPONENT_INVALID,
  MSG_KEY_CHECKUP_COMPONENT_UPDATE_ERROR,
  MSG_KEY_CHECKUP_COMPONENT_UPDATE_SUCCESS,
} from '../../constants'

export const checkupComponentUpdateAction = (id: string, checkupComponent: CheckupComponentType) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch(checkupComponentsRequest(CHECKUP_COMPONENT_UPDATE_REQUEST))

    try {
      if (validateCheckupComponent(checkupComponent)) {
        const checkupComponentRequest: CheckupComponentRequest = {
          id,
          checkupComponent,
        }
        const endpoint = getEndpoint(process.env.COMPONENT_UPDATE as string)
        const options: Partial<FetchOptions> = {
          method: 'PUT',
          requestBody: checkupComponentRequest,
        }
        const checkupComponentResponse = (await Async.fetch(endpoint, options)) as CheckupComponentResponse

        if (checkupComponentResponse?.errMsg?.length) {
          dispatch(checkupComponentsFailure(CHECKUP_COMPONENT_UPDATE_FAILURE, checkupComponentResponse.errMsg))
        } else {
          dispatch(checkupComponentsSuccess(CHECKUP_COMPONENT_UPDATE_SUCCESS, MSG_KEY_CHECKUP_COMPONENT_UPDATE_SUCCESS))
        }
      } else {
        dispatch(checkupComponentsFailure(CHECKUP_COMPONENT_UPDATE_FAILURE, MSG_KEY_CHECKUP_COMPONENT_INVALID))
      }
    } catch (error) {
      console.log('Checkup Component Update Error', error)
      dispatch(checkupComponentsFailure(CHECKUP_COMPONENT_UPDATE_FAILURE, MSG_KEY_CHECKUP_COMPONENT_UPDATE_ERROR))
    } finally {
      dispatch(checkupComponentsComplete())
    }
  }
}
