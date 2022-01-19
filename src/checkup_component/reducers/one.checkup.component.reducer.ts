import {
  CheckupComponentType,
  DefaultCheckupComponent,
  OneCheckupComponentAction,
} from '../types/checkup.component.data.types'

export default function oneCheckupComponent(
  state = DefaultCheckupComponent,
  action: OneCheckupComponentAction,
): CheckupComponentType {
  const { checkupComponent } = action
  return {
    ...state,
    id: checkupComponent.id,
    checkupCategory: checkupComponent.checkupCategory,
    componentName: checkupComponent.componentName,
    standardLow: checkupComponent.standardLow,
    standardHigh: checkupComponent.standardHigh,
    measureUnit: checkupComponent.measureUnit,
    componentComments: checkupComponent.componentComments,
  }
}
