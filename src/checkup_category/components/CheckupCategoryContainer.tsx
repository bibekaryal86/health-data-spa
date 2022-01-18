import { connect } from 'react-redux'
import { GlobalState } from '../../app/store/redux'
import { resetAlert, setAlert } from '../../common'
import { CheckupCategoryState } from '../types/checkup.category.data.types'
import { checkupCategoryReset } from '../utils/checkup.category.utils'
import { checkupCategoryFindAction } from '../actions/checkup.category.find.action'
import { checkupCategoryInsertAction } from '../actions/checkup.category.insert.action'
import { checkupCategoryUpdateAction } from '../actions/checkup.category.update.action'
import { checkupCategoryDeleteAction } from '../actions/checkup.category.delete.action'
import CheckupCategory from './CheckupCategory'

const mapStateToProps = ({ checkupCategory }: GlobalState): CheckupCategoryState => {
  return {
    errMsg: checkupCategory.errMsg,
    success: checkupCategory.success,
    checkupCategoryList: checkupCategory.checkupCategoryList,
  }
}

const mapDispatchToProps = {
  setAlert: (type: string, messageKey: string) => setAlert(type, messageKey),
  resetAlert: () => resetAlert(),
  checkupCategoryReset: () => checkupCategoryReset(),
  checkupCategoryFindAction: () => checkupCategoryFindAction(),
  checkupCategoryInsertAction: (categoryName: string) => checkupCategoryInsertAction(categoryName),
  checkupCategoryUpdateAction: (id: string, categoryName: string) => checkupCategoryUpdateAction(id, categoryName),
  checkupCategoryDeleteAction: (id: string) => checkupCategoryDeleteAction(id),
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckupCategory)
