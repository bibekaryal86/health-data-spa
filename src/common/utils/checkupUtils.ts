import { CheckupCategoryType } from '../../checkup_category'
import { CheckupComponentType } from '../../checkup_component'
import { CheckupResultType } from '../../checkup_result'
import { SelectOptionProps } from '../forms/Select'

export const checkupCategoryOptions = (checkupCategories: CheckupCategoryType[]): SelectOptionProps[] => {
  const selectOptions: SelectOptionProps[] = [{ text: 'Please Select', value: '' }]
  checkupCategories.forEach((category) => selectOptions.push({ text: category.categoryName, value: category.id }))
  return selectOptions
}

export const checkupComponentOptions = (checkupComponents: CheckupComponentType[]): SelectOptionProps[] => {
  const selectOptions: SelectOptionProps[] = []
  checkupComponents.forEach((component) => selectOptions.push({ text: component.componentName, value: component.id }))
  selectOptions.sort((x, y) => (x.text < y.text ? -1 : 1))
  selectOptions.splice(0, 0, { text: 'Please Select', value: '' })
  return selectOptions
}

export const resultFlagOptions = (): SelectOptionProps[] => [
  { text: 'Please Select', value: '' },
  { text: 'High', value: 'H' },
  { text: 'Low', value: 'L' },
]

export const checkupDateOptions = (checkupResults: CheckupResultType[]): SelectOptionProps[] => {
  const checkupDates: string[] = checkupResults.map((result) => result.checkupDate)
  const uniqueCheckupDates = [...new Set(checkupDates)]

  const selectOptions: SelectOptionProps[] = []
  uniqueCheckupDates.forEach((uniqueCheckupDate) =>
    selectOptions.push({ text: uniqueCheckupDate, value: uniqueCheckupDate }),
  )
  selectOptions.sort((x, y) => (x.text < y.text ? 1 : -1))
  selectOptions.splice(0, 0, { text: 'Please Select', value: '' })
  return selectOptions
}

export const inputFieldValue = (inputValue: string | undefined, defaultValue = '', isMaintainCase = false) =>
  inputValue === undefined ? defaultValue : isMaintainCase ? inputValue : inputValue.toUpperCase()

export const standardValue = (standard: string | undefined) => (standard === undefined ? '' : standard)
