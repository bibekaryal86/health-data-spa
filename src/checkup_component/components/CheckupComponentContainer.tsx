import { connect } from 'react-redux'
import { GlobalState } from '../../app/store/redux'
import { resetAlert, setAlert } from '../../common'
import CheckupComponent from './CheckupComponent'
import { CheckupComponentState } from '../types/checkup.component.data.types'
import { checkupComponentReset } from '../utils/checkup.component.utils'
import { checkupComponentFindAction } from '../actions/checkup.component.find.action'
import { checkupCategoryFindAction } from '../../checkup_category'

const mapStateToProps = ({ checkupCategory, checkupComponent }: GlobalState): CheckupComponentState => {
  return {
    errMsg: checkupComponent.errMsg,
    success: checkupComponent.success,
    checkupComponentList: checkupComponent.checkupComponentList,
    selectedCheckupComponent: checkupComponent.selectedCheckupComponent,
    checkupCategoryList: checkupCategory.checkupCategoryList,
  }
}

const mapDispatchToProps = {
  setAlert: (type: string, messageKey: string) => setAlert(type, messageKey),
  resetAlert: () => resetAlert(),
  checkupComponentReset: () => checkupComponentReset(),
  checkupComponentFindAction: () => checkupComponentFindAction(),
  checkupCategoryFindAction: () => checkupCategoryFindAction(),
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckupComponent)
