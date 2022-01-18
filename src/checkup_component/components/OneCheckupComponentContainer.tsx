import { connect } from 'react-redux'
import { GlobalState } from '../../app/store/redux'
import { resetAlert, setAlert } from '../../common'
import OneCheckupComponent from './OneCheckupComponent'
import { CheckupComponentState, CheckupComponentType } from '../types/checkup.component.data.types'
import { checkupComponentReset } from '../utils/checkup.component.utils'
import { checkupComponentFindAction } from '../actions/checkup.component.find.action'
import { checkupComponentInsertAction } from '../actions/checkup.component.insert.action'
import { checkupComponentUpdateAction } from '../actions/checkup.component.update.action'
import { checkupComponentDeleteAction } from '../actions/checkup.component.delete.action'

const mapStateToProps = ({ checkupComponent }: GlobalState): CheckupComponentState => {
  return {
    errMsg: checkupComponent.errMsg,
    success: checkupComponent.success,
    checkupComponentList: checkupComponent.checkupComponentList,
    selectedCheckupComponent: checkupComponent.selectedCheckupComponent,
  }
}

const mapDispatchToProps = {
  setAlert: (type: string, messageKey: string) => setAlert(type, messageKey),
  resetAlert: () => resetAlert(),
  checkupComponentReset: () => checkupComponentReset(),
  checkupComponentFindAction: (selectedId: string) => checkupComponentFindAction(selectedId),
  checkupComponentInsertAction: (checkupComponent: CheckupComponentType) =>
    checkupComponentInsertAction(checkupComponent),
  checkupComponentUpdateAction: (selectedId: string, checkupComponent: CheckupComponentType) =>
    checkupComponentUpdateAction(selectedId, checkupComponent),
  checkupComponentDeleteAction: (selectedId: string) => checkupComponentDeleteAction(selectedId),
}

export default connect(mapStateToProps, mapDispatchToProps)(OneCheckupComponent)
