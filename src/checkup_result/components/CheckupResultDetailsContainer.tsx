import { connect } from 'react-redux'

import CheckupResultDetails from './CheckupResultDetails'
import { GlobalState } from '../../app/store/redux'
import { checkupCategoryFindAction } from '../../checkup_category'
import { checkupComponentFindAction } from '../../checkup_component'
import { resetAlert, setAlert } from '../../common'
import { checkupResultDeleteAction } from '../actions/checkup.result.delete.action'
import { checkupResultFindAction } from '../actions/checkup.result.find.action'
import { checkupResultInsertAction } from '../actions/checkup.result.insert.action'
import { checkupResultUpdateAction } from '../actions/checkup.result.update.action'
import { CheckupResultState, CheckupResultType } from '../types/checkup.result.data.types'
import { checkupResultReset } from '../utils/checkup.result.utils'

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
  checkupResultFindAction: (username: string, selectedId: string) => checkupResultFindAction(username, selectedId),
  checkupResultInsertAction: (username: string, checkupResult: CheckupResultType) =>
    checkupResultInsertAction(username, checkupResult),
  checkupResultUpdateAction: (selectedId: string, checkupResult: CheckupResultType) =>
    checkupResultUpdateAction(selectedId, checkupResult),
  checkupResultDeleteAction: (selectedId: string) => checkupResultDeleteAction(selectedId),
  checkupCategoryFindAction: () => checkupCategoryFindAction(),
  checkupComponentFindAction: () => checkupComponentFindAction(),
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckupResultDetails)
