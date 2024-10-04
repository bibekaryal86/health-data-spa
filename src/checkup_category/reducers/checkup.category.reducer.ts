import {
  CHECKUP_CATEGORY_DELETE_FAILURE,
  CHECKUP_CATEGORY_DELETE_SUCCESS,
  CHECKUP_CATEGORY_FIND_FAILURE,
  CHECKUP_CATEGORY_FIND_REQUEST,
  CHECKUP_CATEGORY_FIND_SUCCESS,
  CHECKUP_CATEGORY_INSERT_FAILURE,
  CHECKUP_CATEGORY_INSERT_SUCCESS,
  CHECKUP_CATEGORY_UNMOUNT,
  CHECKUP_CATEGORY_UPDATE_FAILURE,
  CHECKUP_CATEGORY_UPDATE_SUCCESS,
} from '../types/checkup.category.action.types'
import {
  CheckupCategoryAction,
  CheckupCategoryState,
  DefaultCheckupCategoryState,
} from '../types/checkup.category.data.types'

export default function checkupCategory(
  state = DefaultCheckupCategoryState,
  action: CheckupCategoryAction,
): CheckupCategoryState {
  switch (action.type) {
    case CHECKUP_CATEGORY_FIND_REQUEST:
      return {
        ...state,
      }
    case CHECKUP_CATEGORY_FIND_SUCCESS:
      return {
        ...DefaultCheckupCategoryState,
        checkupCategoryList: action.checkupCategoryList,
      }
    case CHECKUP_CATEGORY_FIND_FAILURE:
    case CHECKUP_CATEGORY_INSERT_FAILURE:
    case CHECKUP_CATEGORY_UPDATE_FAILURE:
    case CHECKUP_CATEGORY_DELETE_FAILURE:
      return {
        ...state,
        errMsg: action.errMsg,
      }
    case CHECKUP_CATEGORY_INSERT_SUCCESS:
    case CHECKUP_CATEGORY_UPDATE_SUCCESS:
    case CHECKUP_CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        success: action.success,
        checkupCategoryList: [], // so that the component with trigger fetch to get updated items
      }
    case CHECKUP_CATEGORY_UNMOUNT:
      return {
        ...state,
        errMsg: '',
        success: '',
      }
    default:
      return state
  }
}
