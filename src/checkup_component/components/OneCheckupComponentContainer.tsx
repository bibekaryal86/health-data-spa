import { connect } from 'react-redux'
import { GlobalState } from '../../app/store/redux'
import { resetAlert, setAlert } from '../../common'
import OneCheckupComponent from './OneCheckupComponent'
import { CheckupComponentState } from '../types/checkup.component.data.types'

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
}

export default connect(mapStateToProps, mapDispatchToProps)(OneCheckupComponent)
