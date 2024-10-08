// reducers
// actions
import { checkupComponentFindAction } from './actions/checkup.component.find.action'
// components
import CheckupComponentContainer from './components/CheckupComponentContainer'
import CheckupComponentDetailsContainer from './components/CheckupComponentDetailsContainer'
import checkupComponent from './reducers/checkup.component.reducer'
// types
import {
  CheckupComponentState,
  CheckupComponentType,
  DefaultCheckupComponent,
} from './types/checkup.component.data.types'

export {
  checkupComponent,
  checkupComponentFindAction,
  CheckupComponentContainer,
  CheckupComponentDetailsContainer,
  DefaultCheckupComponent,
}
export type { CheckupComponentState, CheckupComponentType }
