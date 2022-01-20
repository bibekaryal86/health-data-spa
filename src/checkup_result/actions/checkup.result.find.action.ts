import React from 'react'
import { GlobalDispatch, GlobalState } from '../../app/store/redux'
import {
  checkupResultsComplete,
  checkupResultsFailure,
  checkupResultsFindSuccess,
  checkupResultsRequest,
  checkupResultsSelectResult,
} from '../utils/checkup.result.utils'
import { CheckupResultResponse, CheckupResultType } from '../types/checkup.result.data.types'
import { Async, FetchOptions, getEndpoint } from '../../common'
import { CHECKUP_RESULT_FIND_FAILURE, CHECKUP_RESULT_FIND_REQUEST } from '../types/checkup.result.action.types'
import { MSG_KEY_CHECKUP_RESULT_FIND_ERROR } from '../../constants'

export const checkupResultFindAction = (username: string, selectedCheckupResultId?: string, isFetchCall?: boolean) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>, getStore: () => GlobalState): Promise<void> => {
    dispatch(checkupResultsRequest(CHECKUP_RESULT_FIND_REQUEST))

    try {
      let checkupResultResponse: CheckupResultResponse
      const checkupResultInStore: CheckupResultType[] = getStore().checkupResult?.checkupResultList || []

      if (checkupResultInStore.length == 0 || isFetchCall) {
        const endpoint = getEndpoint(process.env.RESULT_FIND as string)
        const options: Partial<FetchOptions> = {
          queryParams: { username },
        }
        checkupResultResponse = (await Async.fetch(endpoint, options)) as CheckupResultResponse
      } else {
        checkupResultResponse = {
          errMsg: '',
          modifiedCount: 0,
          checkupResultList: checkupResultInStore,
        }
      }

      if (checkupResultResponse?.errMsg?.length) {
        dispatch(checkupResultsFailure(CHECKUP_RESULT_FIND_FAILURE, checkupResultResponse.errMsg))
      } else {
        dispatch(checkupResultsFindSuccess(checkupResultResponse.checkupResultList))

        if (selectedCheckupResultId) {
          const selectedCheckupResult = getSelectedCheckupResult(
            selectedCheckupResultId,
            checkupResultResponse.checkupResultList,
          )

          if (selectedCheckupResult) {
            dispatch(checkupResultsSelectResult(selectedCheckupResult))
          }
        }
      }
    } catch (error) {
      console.log('Checkup Results Find Error', error)
      dispatch(checkupResultsFailure(CHECKUP_RESULT_FIND_FAILURE, MSG_KEY_CHECKUP_RESULT_FIND_ERROR))
    } finally {
      dispatch(checkupResultsComplete())
    }
  }
}

const getSelectedCheckupResult = (selectedId: string, checkupResultList: CheckupResultType[]) =>
  checkupResultList.find((checkupResult) => selectedId === checkupResult.id)
