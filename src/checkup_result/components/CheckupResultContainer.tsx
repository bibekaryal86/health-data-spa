import { connect } from 'react-redux'
import { GlobalState } from '../../app/store/redux'
import { resetAlert, setAlert } from '../../common'
import { checkupCategoryFindAction } from '../../checkup_category'
import { checkupComponentFindAction } from '../../checkup_component'
import { CheckupResultState } from '../types/checkup.result.data.types'
import { checkupResultReset } from '../utils/checkup.result.utils'
import { checkupResultFindAction } from '../actions/checkup.result.find.action'
import CheckupResult from './CheckupResult'

const mapStateToProps = ({ checkupCategory, checkupComponent, checkupResult }: GlobalState): CheckupResultState => {
  return {
    errMsg: checkupResult.errMsg,
    success: checkupResult.success,
    checkupResultList: checkupResult.checkupResultList,
    selectedCheckupResult: checkupResult.selectedCheckupResult,
    checkupComponentList: checkupComponent.checkupComponentList,
    checkupCategoryList: checkupCategory.checkupCategoryList,
  }
}

const mapDispatchToProps = {
  setAlert: (type: string, messageKey: string) => setAlert(type, messageKey),
  resetAlert: () => resetAlert(),
  checkupResultReset: () => checkupResultReset(),
  checkupResultFindAction: (username: string) => checkupResultFindAction(username),
  checkupCategoryFindAction: () => checkupCategoryFindAction(),
  checkupComponentFindAction: () => checkupComponentFindAction(),
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckupResult)
