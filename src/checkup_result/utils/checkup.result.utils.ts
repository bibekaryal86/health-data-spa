import React from 'react'

import { GlobalDispatch } from '../../app/store/redux'
import { DefaultCheckupComponent } from '../../checkup_component'
import { inputFieldValue } from '../../common'
import {
  CHECKUP_RESULT_COMPLETE,
  CHECKUP_RESULT_FIND_SUCCESS,
  CHECKUP_RESULT_SELECT_RESULT,
  CHECKUP_RESULT_UNMOUNT,
} from '../types/checkup.result.action.types'
import {
  CheckupResultDetailsAction,
  CheckupResultFilters,
  CheckupResultType,
  CheckupResultUpdate,
} from '../types/checkup.result.data.types'

export const checkupResultReset = () => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch({
      type: CHECKUP_RESULT_UNMOUNT,
    })
  }
}

// only validate required fields, other validations done in backend
export const validateCheckupResult = (checkupResult: CheckupResultType): string => {
  let invalids = ''

  if (!checkupResult.checkupDate || checkupResult.checkupDate.trim().length < 10) {
    invalids += ' [Checkup Date] '
  }

  if (!checkupResult.testResult || checkupResult.testResult.trim().length === 0) {
    invalids += ' [Test Result] '
  }

  if (!checkupResult.checkupComponent || !checkupResult.checkupComponent.id) {
    invalids += ' [Checkup Component] '
  }

  return invalids
}

export const isCheckupResultFilterApplied = (checkupResultFilters: CheckupResultFilters): string => {
  let appliedFilters = ''

  if (checkupResultFilters) {
    if (checkupResultFilters.categoryId) {
      appliedFilters += ' [CHECKUP CATEGORY] '
    }

    if (checkupResultFilters.componentId) {
      appliedFilters += ' [CHECKUP COMPONENT] '
    }

    if (checkupResultFilters.checkupDate) {
      appliedFilters += ' [CHECKUP DATE] '
    }

    if (checkupResultFilters.resultFlag) {
      appliedFilters += ' [RESULT FLAG] '
    }
  }

  return appliedFilters
}

export const setCheckupResultFiltersValue = (
  valueBefore: CheckupResultFilters,
  selectedFilter: string,
  selectedValue: string,
): CheckupResultFilters => {
  let valueAfter = valueBefore

  switch (selectedFilter) {
    case 'checkupCategory':
      valueAfter = { ...valueAfter, categoryId: selectedValue }
      break
    case 'checkupComponent':
      valueAfter = { ...valueAfter, componentId: selectedValue }
      break
    case 'checkupDate':
      valueAfter = { ...valueAfter, checkupDate: selectedValue }
      break
    case 'resultFlag':
      valueAfter = { ...valueAfter, resultFlag: selectedValue }
      break
  }

  return valueAfter
}

export const getCheckupResultDisplayList = (
  checkupResultFilters: CheckupResultFilters,
  checkupResultList: CheckupResultType[],
): CheckupResultType[] => {
  let checkupResultDisplayList = checkupResultList

  if (checkupResultFilters.categoryId) {
    checkupResultDisplayList = checkupResultDisplayList.filter(
      (checkupResult) => checkupResult.checkupComponent.checkupCategory.id === checkupResultFilters.categoryId,
    )
  }

  if (checkupResultFilters.componentId) {
    checkupResultDisplayList = checkupResultDisplayList.filter(
      (checkupResult) => checkupResult.checkupComponent.id === checkupResultFilters.componentId,
    )
  }

  if (checkupResultFilters.checkupDate) {
    checkupResultDisplayList = checkupResultDisplayList.filter(
      (checkupResult) => checkupResult.checkupDate === checkupResultFilters.checkupDate,
    )
  }

  if (checkupResultFilters.resultFlag) {
    checkupResultDisplayList = checkupResultDisplayList.filter(
      (checkupResult) => checkupResult.resultFlag === checkupResultFilters.resultFlag,
    )
  }

  return checkupResultDisplayList
}

export const checkupResultsRequest = (type: string) => ({
  type,
})

export const checkupResultsComplete = () => ({
  type: CHECKUP_RESULT_COMPLETE,
})

export const checkupResultsFailure = (type: string, errMsg: string) => ({
  type,
  errMsg,
})

export const checkupResultsFindSuccess = (checkupResultList: CheckupResultType[]) => ({
  type: CHECKUP_RESULT_FIND_SUCCESS,
  checkupResultList,
})

export const checkupResultsSuccess = (type: string, success: string) => ({
  type,
  success,
})

export const checkupResultsSelectResult = (selectedCheckupResult: CheckupResultType) => ({
  type: CHECKUP_RESULT_SELECT_RESULT,
  selectedCheckupResult,
})

export const handleCheckupResultFieldChange = (
  input: string,
  name: string,
  checkupResultData: CheckupResultType,
  setCheckupResultData: ({ checkupResult }: CheckupResultDetailsAction) => void,
): void => {
  let updatedCheckupResult: CheckupResultType
  switch (name) {
    case 'componentId':
      updatedCheckupResult = getUpdatedCheckupResult({ componentId: input }, checkupResultData)
      setCheckupResultData({ checkupResult: updatedCheckupResult })
      break
    case 'checkupDate':
      updatedCheckupResult = getUpdatedCheckupResult({ checkupDate: input }, checkupResultData)
      setCheckupResultData({ checkupResult: updatedCheckupResult })
      break
    case 'testResult':
      updatedCheckupResult = getUpdatedCheckupResult({ testResult: input }, checkupResultData)
      setCheckupResultData({ checkupResult: updatedCheckupResult })
      break
  }
}

const getUpdatedCheckupResult = (
  { componentId, checkupDate, testResult }: Partial<CheckupResultUpdate>,
  checkupResultData: CheckupResultType,
): CheckupResultType => {
  return {
    id: checkupResultData.id,
    checkupComponent: componentId
      ? { ...DefaultCheckupComponent, id: componentId }
      : checkupResultData.checkupComponent,
    checkupDate: inputFieldValue(checkupDate, checkupResultData.checkupDate),
    testResult: inputFieldValue(testResult, checkupResultData.testResult),
    username: checkupResultData.username,
    resultFlag: checkupResultData.resultFlag,
  }
}
