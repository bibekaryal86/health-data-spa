import { CheckupResultDetailsAction, CheckupResultType, DefaultCheckupResult } from '../types/checkup.result.data.types'

export default function checkupResultDetails(
  state = DefaultCheckupResult,
  action: CheckupResultDetailsAction,
): CheckupResultType {
  const { checkupResult } = action
  return {
    ...state,
    id: checkupResult.id,
    checkupComponent: checkupResult.checkupComponent,
    checkupDate: checkupResult.checkupDate,
    testResult: checkupResult.testResult,
    username: checkupResult.username,
    resultFlag: checkupResult.resultFlag,
  }
}
