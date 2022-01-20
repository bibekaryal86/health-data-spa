import {
  CheckupResultAction,
  CheckupResultState,
  DefaultCheckupResult,
  DefaultCheckupResultState,
} from '../types/checkup.result.data.types'
import {
  CHECKUP_RESULT_DELETE_FAILURE,
  CHECKUP_RESULT_DELETE_SUCCESS,
  CHECKUP_RESULT_FIND_FAILURE,
  CHECKUP_RESULT_FIND_REQUEST,
  CHECKUP_RESULT_FIND_SUCCESS,
  CHECKUP_RESULT_INSERT_FAILURE,
  CHECKUP_RESULT_INSERT_SUCCESS,
  CHECKUP_RESULT_SELECT_RESULT,
  CHECKUP_RESULT_UNMOUNT,
  CHECKUP_RESULT_UPDATE_FAILURE,
  CHECKUP_RESULT_UPDATE_SUCCESS,
} from '../types/checkup.result.action.types'

export default function checkupResult(
  state = DefaultCheckupResultState,
  action: CheckupResultAction,
): CheckupResultState {
  switch (action.type) {
    case CHECKUP_RESULT_FIND_REQUEST:
      return state
    case CHECKUP_RESULT_FIND_SUCCESS:
      return {
        ...DefaultCheckupResultState,
        checkupResultList: action.checkupResultList,
      }
    case CHECKUP_RESULT_FIND_FAILURE:
    case CHECKUP_RESULT_INSERT_FAILURE:
    case CHECKUP_RESULT_UPDATE_FAILURE:
    case CHECKUP_RESULT_DELETE_FAILURE:
      return {
        ...state,
        errMsg: action.errMsg,
      }
    case CHECKUP_RESULT_INSERT_SUCCESS:
    case CHECKUP_RESULT_UPDATE_SUCCESS:
    case CHECKUP_RESULT_DELETE_SUCCESS:
      return {
        ...state,
        success: action.success,
        checkupResultList: [], // so that the result with trigger fetch to get updated items
      }
    case CHECKUP_RESULT_SELECT_RESULT:
      return {
        ...state,
        selectedCheckupResult: action.selectedCheckupResult,
      }
    case CHECKUP_RESULT_UNMOUNT:
      return {
        ...state,
        errMsg: '',
        success: '',
        selectedCheckupResult: DefaultCheckupResult,
      }
    default:
      return state
  }
}
