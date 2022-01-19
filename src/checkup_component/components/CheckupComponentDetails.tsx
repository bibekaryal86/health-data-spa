import React, { useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DisplayCardWrapperBody, DisplayCardWrapperRow } from '../../styles'
import { CheckupComponentType, DefaultCheckupComponent } from '../types/checkup.component.data.types'
import checkupComponentDetails from '../reducers/one.checkup.component.reducer'
import { ALERT_TYPE_FAILURE, ALERT_TYPE_SUCCESS } from '../../constants'
import { HrefLink, Input, InputType, Select } from '../../common'
import { checkupCategoryOptions, handleCheckupComponentFieldChange } from '../utils/checkup.component.utils'
import { CheckupCategoryType } from '../../checkup_category'

interface CheckupComponentDetailsProps {
  errMsg: string
  success: string
  checkupComponentList: CheckupComponentType[]
  selectedCheckupComponent: CheckupComponentType
  checkupCategoryList: CheckupCategoryType[]
  setAlert: (type: string, messageKey: string) => void
  resetAlert: () => void
  checkupComponentReset: () => void
  checkupComponentFindAction: (selectedId: string) => void
  checkupComponentInsertAction: (checkupComponent: CheckupComponentType) => void
  checkupComponentUpdateAction: (id: string, checkupComponent: CheckupComponentType) => void
  checkupComponentDeleteAction: (selectedId: string) => void
}

const CheckupComponentDetails = (props: CheckupComponentDetailsProps): React.ReactElement => {
  const [checkupComponentData, setCheckupComponentData] = useReducer(checkupComponentDetails, DefaultCheckupComponent)
  //const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    errMsg,
    success,
    checkupComponentList,
    selectedCheckupComponent,
    checkupCategoryList,
    setAlert,
    resetAlert,
    checkupComponentReset,
    checkupComponentFindAction,
    //checkupComponentInsertAction,
    //checkupComponentUpdateAction,
    //checkupComponentDeleteAction,
  } = props

  useEffect(() => {
    return () => {
      checkupComponentReset()
      resetAlert()
    }
  }, [checkupComponentReset, resetAlert])

  useEffect(() => {
    errMsg && setAlert(ALERT_TYPE_FAILURE, errMsg)
    success && setAlert(ALERT_TYPE_SUCCESS, success)
  }, [errMsg, setAlert, success])

  useEffect(() => {
    id && checkupComponentFindAction(id)
  }, [checkupComponentFindAction, checkupComponentList, id])

  useEffect(() => {
    setCheckupComponentData({ checkupComponent: selectedCheckupComponent })
  }, [selectedCheckupComponent])

  const showAllCheckupComponents = () => {
    return navigate('/checkup_component')
  }

  const showBodyHeader = () => (
    <DisplayCardWrapperBody background="slateblue" color="whitesmoke">
      <HrefLink
        id="checkup-component-all-components-link-1"
        linkTo="#"
        title="To All Checkup Components List"
        onClick={() => showAllCheckupComponents()}
        underline
        color="inherit"
        margin="0px 0px 5px 0px"
      />
      <h4>Checkup Component Details: {selectedCheckupComponent.componentName}</h4>
    </DisplayCardWrapperBody>
  )

  const categorySelect = () => (
    <Select
      className="u-full-width"
      id="checkup-component-details-category-select"
      label="Checkup Category"
      onChange={(event) =>
        handleCheckupComponentFieldChange(event, 'categoryId', checkupComponentData, setCheckupComponentData)
      }
      value={checkupComponentData.checkupCategory.id}
      options={checkupCategoryOptions(checkupCategoryList)}
      required
    />
  )

  const componentNameInput = () => (
    <Input
      className="u-full-width"
      id="checkup-component-details-name-input"
      label="Component Name"
      type={InputType.text}
      onChange={(event) =>
        handleCheckupComponentFieldChange(event, 'componentName', checkupComponentData, setCheckupComponentData)
      }
      value={checkupComponentData.componentName}
      maxLength={25}
      required
    />
  )

  const standardValue = (standard: string | undefined) => (standard === undefined ? '' : standard)

  const standardLowInput = () => (
    <Input
      className="u-full-width"
      id="checkup-component-details-low-input"
      label="Standard Low"
      type={InputType.number}
      onChange={(event) =>
        handleCheckupComponentFieldChange(event, 'standardLow', checkupComponentData, setCheckupComponentData)
      }
      value={standardValue(checkupComponentData.standardLow)}
      maxLength={10}
    />
  )

  const standardHighInput = () => (
    <Input
      className="u-full-width"
      id="checkup-component-details-high-input"
      label="Standard High"
      type={InputType.number}
      onChange={(event) =>
        handleCheckupComponentFieldChange(event, 'standardHigh', checkupComponentData, setCheckupComponentData)
      }
      value={standardValue(checkupComponentData.standardHigh)}
      maxLength={10}
    />
  )

  const measureUnitInput = () => (
    <Input
      className="u-full-width"
      id="checkup-component-details-unit-input"
      label="Measure Unit"
      type={InputType.text}
      onChange={(event) =>
        handleCheckupComponentFieldChange(event, 'measureUnit', checkupComponentData, setCheckupComponentData)
      }
      value={checkupComponentData.measureUnit || ''}
      maxLength={10}
    />
  )

  const componentCommentsInput = () => (
    <Input
      className="u-full-width"
      id="checkup-component-details-comment-input"
      label="Comments"
      type={InputType.text}
      onChange={(event) =>
        handleCheckupComponentFieldChange(event, 'componentComments', checkupComponentData, setCheckupComponentData)
      }
      value={checkupComponentData.componentComments || ''}
      maxLength={200}
    />
  )

  const showBodyContent = () => (
    <DisplayCardWrapperBody id="checkup-component-body-content" container>
      <DisplayCardWrapperRow container>
        <div className="six columns">{categorySelect()}</div>
        <div className="six columns">{componentNameInput()}</div>
      </DisplayCardWrapperRow>
      <DisplayCardWrapperRow container>
        <div className="four columns">{standardLowInput()}</div>
        <div className="four columns">{standardHighInput()}</div>
        <div className="four columns">{measureUnitInput()}</div>
      </DisplayCardWrapperRow>
      <DisplayCardWrapperRow container>
        <div className="twelve columns">{componentCommentsInput()}</div>
      </DisplayCardWrapperRow>
    </DisplayCardWrapperBody>
  )

  return (
    <>
      {showBodyHeader()}
      {showBodyContent()}
    </>
  )
}

export default CheckupComponentDetails
