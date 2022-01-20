/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import { composeWithDevTools } from 'redux-devtools-extension'
import { USER_LOGOUT } from '../types/login.action.types'
import { alert, AlertState, spinner, SpinnerState } from '../../common'
import { checkupCategory, CheckupCategoryState } from '../../checkup_category'
import { checkupComponent, CheckupComponentState } from '../../checkup_component'
import { checkupResult, CheckupResultState } from '../../checkup_result'

// ACTIONS (ESP: FETCH ACTIONS) SHOULD BE NAMED IN THE FOLLOWING PATTERN:
// xxx_REQUEST, xxx_SUCCESS, xxx_FAILURE, xxx_COMPLETE
// see spinner.reducer.ts for reason

export interface GlobalState {
  alert: AlertState
  spinner: SpinnerState
  checkupCategory: CheckupCategoryState
  checkupComponent: CheckupComponentState
  checkupResult: CheckupResultState
}

export interface GlobalDispatch {
  type: string
}

const appReducers = combineReducers({
  alert,
  spinner,
  checkupCategory,
  checkupComponent,
  checkupResult,
})

const rootReducer = (state: any, action: any) => {
  if (action.type === USER_LOGOUT) {
    state = undefined
  }
  return appReducers(state, action)
}

const store =
  process.env.NODE_ENV === 'production'
    ? createStore(rootReducer, applyMiddleware(thunk))
    : createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvariant())))

export default store
