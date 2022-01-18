import {
  CheckupComponentAction,
  CheckupComponentState,
  DefaultCheckupComponentState,
} from '../types/checkup.component.data.types'
import {
  CHECKUP_COMPONENT_DELETE_FAILURE,
  CHECKUP_COMPONENT_DELETE_SUCCESS,
  CHECKUP_COMPONENT_FIND_FAILURE,
  CHECKUP_COMPONENT_FIND_REQUEST,
  CHECKUP_COMPONENT_FIND_SUCCESS,
  CHECKUP_COMPONENT_INSERT_FAILURE,
  CHECKUP_COMPONENT_INSERT_SUCCESS,
  CHECKUP_COMPONENT_SELECT_COMPONENT,
  CHECKUP_COMPONENT_UNMOUNT,
  CHECKUP_COMPONENT_UPDATE_FAILURE,
  CHECKUP_COMPONENT_UPDATE_SUCCESS,
} from '../types/checkup.component.action.types'

export default function checkupComponent(
  state = DefaultCheckupComponentState,
  action: CheckupComponentAction,
): CheckupComponentState {
  switch (action.type) {
    case CHECKUP_COMPONENT_FIND_REQUEST:
      return state
    case CHECKUP_COMPONENT_FIND_SUCCESS:
      return {
        ...DefaultCheckupComponentState,
        checkupComponentList: action.checkupComponentList,
      }
    case CHECKUP_COMPONENT_FIND_FAILURE:
    case CHECKUP_COMPONENT_INSERT_FAILURE:
    case CHECKUP_COMPONENT_UPDATE_FAILURE:
    case CHECKUP_COMPONENT_DELETE_FAILURE:
      return {
        ...state,
        errMsg: action.errMsg,
      }
    case CHECKUP_COMPONENT_INSERT_SUCCESS:
    case CHECKUP_COMPONENT_UPDATE_SUCCESS:
    case CHECKUP_COMPONENT_DELETE_SUCCESS:
      return {
        ...state,
        success: action.success,
        checkupComponentList: [], // so that the component with trigger fetch to get updated items
      }
    case CHECKUP_COMPONENT_SELECT_COMPONENT:
      return {
        ...state,
        selectedCheckupComponent: action.selectedCheckupComponent,
      }
    case CHECKUP_COMPONENT_UNMOUNT:
      return {
        ...state,
        errMsg: '',
        success: '',
      }
    default:
      return state
  }
}
