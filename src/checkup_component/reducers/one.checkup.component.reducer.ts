import {
  CheckupComponentType,
  DefaultCheckupComponent,
  CheckupContainerDetailsAction,
} from '../types/checkup.component.data.types'

export default function checkupComponentDetails(
  state = DefaultCheckupComponent,
  action: CheckupContainerDetailsAction,
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
