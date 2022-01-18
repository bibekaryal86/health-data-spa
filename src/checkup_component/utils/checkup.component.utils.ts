import React from 'react'
import { GlobalDispatch } from '../../app/store/redux'
import { CheckupComponentType } from '../types/checkup.component.data.types'
import {
  CHECKUP_COMPONENT_COMPLETE,
  CHECKUP_COMPONENT_FIND_SUCCESS,
  CHECKUP_COMPONENT_SELECT_COMPONENT,
  CHECKUP_COMPONENT_UNMOUNT,
} from '../types/checkup.component.action.types'

export const checkupComponentReset = () => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch({
      type: CHECKUP_COMPONENT_UNMOUNT,
    })
  }
}

export const validateCheckupComponent = (checkupComponent: CheckupComponentType): boolean =>
  checkupComponent &&
  !!(checkupComponent.componentName && checkupComponent.componentName.trim().length > 2) &&
  !!(checkupComponent.checkupCategory && checkupComponent.checkupCategory.id)

export const checkupComponentsRequest = (type: string) => ({
  type,
})

export const checkupComponentsComplete = () => ({
  type: CHECKUP_COMPONENT_COMPLETE,
})

export const checkupComponentsFailure = (type: string, errMsg: string) => ({
  type,
  errMsg,
})

export const checkupComponentsFindSuccess = (checkupComponentList: CheckupComponentType[]) => ({
  type: CHECKUP_COMPONENT_FIND_SUCCESS,
  checkupComponentList,
})

export const checkupComponentsSuccess = (type: string, success: string) => ({
  type,
  success,
})

export const checkupComponentsSelectComponent = (selectedCheckupComponent: CheckupComponentType) => ({
  type: CHECKUP_COMPONENT_SELECT_COMPONENT,
  selectedCheckupComponent,
})
