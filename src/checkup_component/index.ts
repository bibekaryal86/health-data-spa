// reducers
import checkupComponent from './reducers/checkup.component.reducer'
// components
import CheckupComponentContainer from './components/CheckupComponentContainer'
import CheckupComponentDetailsContainer from './components/CheckupComponentDetailsContainer'
// types
import {
  CheckupComponentState,
  CheckupComponentType,
  DefaultCheckupComponent,
} from './types/checkup.component.data.types'

export { checkupComponent, DefaultCheckupComponent, CheckupComponentContainer, CheckupComponentDetailsContainer }
export type { CheckupComponentState, CheckupComponentType }
