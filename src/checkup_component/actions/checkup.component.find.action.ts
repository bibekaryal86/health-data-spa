import React from 'react'

import { GlobalDispatch, GlobalState } from '../../app/store/redux'
import { Async, getEndpoint } from '../../common'
import { MSG_KEY_CHECKUP_COMPONENT_FIND_ERROR } from '../../constants'
import { CHECKUP_COMPONENT_FIND_FAILURE, CHECKUP_COMPONENT_FIND_REQUEST } from '../types/checkup.component.action.types'
import { CheckupComponentResponse, CheckupComponentType } from '../types/checkup.component.data.types'
import {
  checkupComponentsComplete,
  checkupComponentsFailure,
  checkupComponentsFindSuccess,
  checkupComponentsRequest,
  checkupComponentsSelectComponent,
} from '../utils/checkup.component.utils'

export const checkupComponentFindAction = (selectedCheckupComponentId?: string, isFetchCall?: boolean) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>, getStore: () => GlobalState): Promise<void> => {
    dispatch(checkupComponentsRequest(CHECKUP_COMPONENT_FIND_REQUEST))

    try {
      let checkupComponentResponse: CheckupComponentResponse
      const checkupComponentInStore: CheckupComponentType[] = getStore().checkupComponent?.checkupComponentList || []

      if (checkupComponentInStore.length == 0 || isFetchCall) {
        const endpoint = getEndpoint(process.env.COMPONENT_FIND as string)
        checkupComponentResponse = (await Async.fetch(endpoint, {})) as CheckupComponentResponse
      } else {
        checkupComponentResponse = {
          errMsg: '',
          modifiedCount: 0,
          checkupComponentList: checkupComponentInStore,
        }
      }

      if (checkupComponentResponse?.errMsg?.length) {
        dispatch(checkupComponentsFailure(CHECKUP_COMPONENT_FIND_FAILURE, checkupComponentResponse.errMsg))
      } else {
        dispatch(checkupComponentsFindSuccess(checkupComponentResponse.checkupComponentList))

        if (selectedCheckupComponentId) {
          const selectedCheckupComponent = getSelectedCheckupComponent(
            selectedCheckupComponentId,
            checkupComponentResponse.checkupComponentList,
          )

          if (selectedCheckupComponent) {
            dispatch(checkupComponentsSelectComponent(selectedCheckupComponent))
          }
        }
      }
    } catch (error) {
      console.log('Checkup Components Find Error', error)
      dispatch(checkupComponentsFailure(CHECKUP_COMPONENT_FIND_FAILURE, MSG_KEY_CHECKUP_COMPONENT_FIND_ERROR))
    } finally {
      dispatch(checkupComponentsComplete())
    }
  }
}

const getSelectedCheckupComponent = (selectedId: string, checkupComponentList: CheckupComponentType[]) =>
  checkupComponentList.find((checkupComponent) => selectedId === checkupComponent.id)
