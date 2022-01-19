import React from 'react'
import { GlobalDispatch } from '../../app/store/redux'
import {
  CheckupComponentDetailsAction,
  CheckupComponentType,
  CheckupComponentUpdate,
} from '../types/checkup.component.data.types'
import {
  CHECKUP_COMPONENT_COMPLETE,
  CHECKUP_COMPONENT_FIND_SUCCESS,
  CHECKUP_COMPONENT_SELECT_COMPONENT,
  CHECKUP_COMPONENT_UNMOUNT,
} from '../types/checkup.component.action.types'
import { CheckupCategoryType } from '../../checkup_category'
import { SelectOptionProps } from '../../common/forms/Select'

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

export const checkupCategoryOptions = (checkupCategories: CheckupCategoryType[]): SelectOptionProps[] => {
  const selectOptions: SelectOptionProps[] = [{ text: 'Please Select', value: '' }]
  checkupCategories.forEach((category) => selectOptions.push({ text: category.categoryName, value: category.id }))
  return selectOptions
}

export const handleCheckupComponentFieldChange = (
  input: string,
  name: string,
  checkupComponentData: CheckupComponentType,
  setCheckupComponentData: ({ checkupComponent }: CheckupComponentDetailsAction) => void,
): void => {
  let updatedCheckupComponent: CheckupComponentType
  switch (name) {
    case 'categoryId':
      updatedCheckupComponent = getUpdatedCheckupComponent({ categoryId: input }, checkupComponentData)
      setCheckupComponentData({ checkupComponent: updatedCheckupComponent })
      break
    case 'componentName':
      updatedCheckupComponent = getUpdatedCheckupComponent({ componentName: input }, checkupComponentData)
      setCheckupComponentData({ checkupComponent: updatedCheckupComponent })
      break
    case 'standardLow':
      updatedCheckupComponent = getUpdatedCheckupComponent({ standardLow: input }, checkupComponentData)
      setCheckupComponentData({ checkupComponent: updatedCheckupComponent })
      break
    case 'standardHigh':
      updatedCheckupComponent = getUpdatedCheckupComponent({ standardHigh: input }, checkupComponentData)
      setCheckupComponentData({ checkupComponent: updatedCheckupComponent })
      break
    case 'measureUnit':
      updatedCheckupComponent = getUpdatedCheckupComponent({ measureUnit: input }, checkupComponentData)
      setCheckupComponentData({ checkupComponent: updatedCheckupComponent })
      break
    case 'componentComments':
      updatedCheckupComponent = getUpdatedCheckupComponent({ componentComments: input }, checkupComponentData)
      setCheckupComponentData({ checkupComponent: updatedCheckupComponent })
      break
  }
}

const getUpdatedCheckupComponent = (
  {
    categoryId,
    componentName,
    standardLow,
    standardHigh,
    measureUnit,
    componentComments,
  }: Partial<CheckupComponentUpdate>,
  checkupComponentData: CheckupComponentType,
): CheckupComponentType => {
  return {
    id: checkupComponentData.id,
    checkupCategory: categoryId ? { id: categoryId, categoryName: '' } : checkupComponentData.checkupCategory,
    componentName: setInputFieldValue(componentName, checkupComponentData.componentName),
    standardLow: standardLow ? standardLow : checkupComponentData.standardLow,
    standardHigh: standardHigh ? standardHigh : checkupComponentData.standardHigh,
    measureUnit: measureUnit ? measureUnit : checkupComponentData.measureUnit,
    componentComments: componentComments ? componentComments : checkupComponentData.componentComments,
  }
}

const setInputFieldValue = (inputValue: string | undefined, defaultValue: string) =>
  inputValue === undefined ? defaultValue : inputValue
