import {
  CheckupCategoryLocalAction,
  CheckupCategoryLocalState,
  DefaultCheckupCategoryLocalState,
} from '../types/checkup.category.data.types'
import {
  CHECKUP_CATEGORY_MODAL_CLOSE,
  CHECKUP_CATEGORY_MODAL_DELETE,
  CHECKUP_CATEGORY_MODAL_INPUT,
  CHECKUP_CATEGORY_MODAL_INSERT,
  CHECKUP_CATEGORY_MODAL_UPDATE,
  CHECKUP_CATEGORY_SELECT_CATEGORY,
} from '../types/checkup.category.action.types'

const getDefaultString = (input: string | undefined) => input || ''
const getDefaultBoolean = (input: boolean | undefined) => input || false

export default function checkupCategoryState(
  state: CheckupCategoryLocalState,
  action: Partial<CheckupCategoryLocalAction>,
): CheckupCategoryLocalState {
  switch (action.type) {
    case CHECKUP_CATEGORY_SELECT_CATEGORY:
      return {
        ...state,
        selectedCheckupCategoryId: getDefaultString(action.selectedCheckupCategoryId),
        selectedCheckupCategoryName: getDefaultString(action.selectedCheckupCategoryName),
      }
    case CHECKUP_CATEGORY_MODAL_INSERT:
      return {
        ...state,
        isInsertModalOpen: getDefaultBoolean(action.isInsertModalOpen),
      }
    case CHECKUP_CATEGORY_MODAL_UPDATE:
      return {
        ...state,
        isUpdateModalOpen: getDefaultBoolean(action.isUpdateModalOpen),
      }
    case CHECKUP_CATEGORY_MODAL_DELETE:
      return {
        ...state,
        isDeleteModalOpen: getDefaultBoolean(action.isDeleteModalOpen),
      }
    case CHECKUP_CATEGORY_MODAL_INPUT:
      return {
        ...state,
        categoryNameModalInput: getDefaultString(action.categoryNameModalInput),
      }
    case CHECKUP_CATEGORY_MODAL_CLOSE:
      return DefaultCheckupCategoryLocalState
    default:
      return state
  }
}
