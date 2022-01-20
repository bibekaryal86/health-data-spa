import { SelectOptionProps } from '../forms/Select'
import { CheckupCategoryType } from '../../checkup_category'
import { CheckupComponentType } from '../../checkup_component'

export const checkupCategoryOptions = (checkupCategories: CheckupCategoryType[]): SelectOptionProps[] => {
  const selectOptions: SelectOptionProps[] = [{ text: 'Please Select', value: '' }]
  checkupCategories.forEach((category) => selectOptions.push({ text: category.categoryName, value: category.id }))
  return selectOptions
}

export const checkupComponentOptions = (checkupComponents: CheckupComponentType[]): SelectOptionProps[] => {
  const selectOptions: SelectOptionProps[] = [{ text: 'Please Select', value: '' }]
  checkupComponents.forEach((component) => selectOptions.push({ text: component.componentName, value: component.id }))
  return selectOptions
}

export const inputFieldValue = (inputValue: string | undefined, defaultValue = '', isMaintainCase = false) =>
  inputValue === undefined ? defaultValue : isMaintainCase ? inputValue : inputValue.toUpperCase()

export const standardValue = (standard: string | undefined) => (standard === undefined ? '' : standard)
