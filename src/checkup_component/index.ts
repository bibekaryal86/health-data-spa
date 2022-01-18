// reducers
import checkupComponent from './reducers/checkup.component.reducer'
// components
import CheckupComponentContainer from './components/CheckupComponentContainer'
import OneCheckupComponentContainer from './components/OneCheckupComponentContainer'
// types
import {
  CheckupComponentState,
  CheckupComponentType,
  DefaultCheckupComponent,
} from './types/checkup.component.data.types'

export { checkupComponent, DefaultCheckupComponent, CheckupComponentContainer, OneCheckupComponentContainer }
export type { CheckupComponentState, CheckupComponentType }
