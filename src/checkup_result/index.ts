// functions
// components
import CheckupResultContainer from './components/CheckupResultContainer'
import CheckupResultDetailsContainer from './components/CheckupResultDetailsContainer'
import checkupResult from './reducers/checkup.result.reducer'
// types
import { CheckupResultState, CheckupResultType, DefaultCheckupResult } from './types/checkup.result.data.types'

export { checkupResult, DefaultCheckupResult }
export { CheckupResultContainer, CheckupResultDetailsContainer }
export type { CheckupResultState, CheckupResultType }
