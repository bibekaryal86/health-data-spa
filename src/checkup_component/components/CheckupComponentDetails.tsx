import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DisplayCardWrapperBody, DisplayCardWrapperColumn, DisplayCardWrapperRow } from '../../styles'
import { CheckupComponentType, DefaultCheckupComponent } from '../types/checkup.component.data.types'
import checkupComponentDetails from '../reducers/checkup.component.details.reducer'
import { ALERT_TYPE_FAILURE, ALERT_TYPE_SUCCESS } from '../../constants'
import { Button, checkupCategoryOptions, HrefLink, Input, InputType, Modal, Select, standardValue } from '../../common'
import { handleCheckupComponentFieldChange, validateCheckupComponent } from '../utils/checkup.component.utils'
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
  checkupCategoryFindAction: () => void
}

const CheckupComponentDetails = (props: CheckupComponentDetailsProps): React.ReactElement => {
  const [checkupComponentData, setCheckupComponentData] = useReducer(checkupComponentDetails, DefaultCheckupComponent)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
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
    checkupComponentInsertAction,
    checkupComponentUpdateAction,
    checkupComponentDeleteAction,
    checkupCategoryFindAction,
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
    checkupCategoryList.length === 0 && checkupCategoryFindAction()
  }, [checkupCategoryFindAction, checkupCategoryList.length])

  useEffect(() => {
    setCheckupComponentData({ checkupComponent: selectedCheckupComponent })
  }, [selectedCheckupComponent])

  const showAllCheckupComponents = () => {
    return navigate('/checkup_component')
  }

  const insertCheckupComponent = () => {
    const isInvalid = validateCheckupComponent(checkupComponentData)
    if (isInvalid) {
      const errMsg = 'Invalid Input! Required field ' + isInvalid + ' not provided!! Please Try Again!!!'
      setAlert(ALERT_TYPE_FAILURE, errMsg)
    } else {
      resetAlert()
      checkupComponentInsertAction(checkupComponentData)
      showAllCheckupComponents()
    }
  }

  const updateCheckupComponent = () => {
    const isInvalid = validateCheckupComponent(checkupComponentData)
    if (isInvalid) {
      const errMsg = 'Invalid Input! Required field ' + isInvalid + ' not provided!! Please Try Again!!!'
      setAlert(ALERT_TYPE_FAILURE, errMsg)
    } else {
      resetAlert()
      id && checkupComponentUpdateAction(id, checkupComponentData)
    }
  }

  const deleteCheckupComponentBegin = () => setIsDeleteModalOpen(true)
  const deleteModalBody = () => (
    <>
      <p>Are you sure you want to delete: {checkupComponentData.componentName}?</p>
    </>
  )
  const deleteModal = () => (
    <Modal
      setIsModalOpen={setIsDeleteModalOpen}
      header="Warning"
      body={deleteModalBody()}
      primaryButton="Yes"
      primaryButtonAction={deleteCheckupComponentEnd}
      secondaryButton="Cancel"
      secondaryButtonAction={() => setIsDeleteModalOpen(false)}
    />
  )
  const deleteCheckupComponentEnd = () => {
    setIsDeleteModalOpen(false)
    id && checkupComponentDeleteAction(id)
    showAllCheckupComponents()
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
      maxLength={15}
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

  const isButtonDisabled = () =>
    selectedCheckupComponent.componentName === checkupComponentData.componentName &&
    selectedCheckupComponent.checkupCategory.id === checkupComponentData.checkupCategory.id &&
    selectedCheckupComponent.standardLow === checkupComponentData.standardLow &&
    selectedCheckupComponent.standardHigh === checkupComponentData.standardHigh &&
    selectedCheckupComponent.measureUnit === checkupComponentData.measureUnit &&
    selectedCheckupComponent.componentComments === checkupComponentData.componentComments

  const addButton = () => (
    <Button
      id="checkup-component-details-button-add"
      title="Add Checkup Component"
      onClick={() => insertCheckupComponent()}
      includeBorder
      disabled={isButtonDisabled()}
    />
  )

  const updateButton = () => (
    <Button
      id="checkup-component-details-button-add"
      title="Update Checkup Component"
      onClick={() => updateCheckupComponent()}
      includeBorder
      disabled={isButtonDisabled()}
    />
  )

  const deleteButton = () => (
    <Button
      id="checkup-component-details-button-delete"
      title="Delete Checkup Component"
      onClick={() => deleteCheckupComponentBegin()}
      includeBorder
    />
  )

  const revertButton = () => (
    <Button
      id="checkup-component-details-button-reset"
      title="Revert Changes"
      onClick={() => setCheckupComponentData({ checkupComponent: selectedCheckupComponent })}
      includeBorder
      disabled={isButtonDisabled()}
    />
  )

  const addButtons = () => (
    <>
      {addButton()}
      {revertButton()}
    </>
  )

  const updateButtons = () => (
    <>
      {updateButton()}
      {deleteButton()}
      {revertButton()}
    </>
  )

  const showBodyContent = () => (
    <DisplayCardWrapperBody id="checkup-component-body-content" container>
      <DisplayCardWrapperRow container>
        <DisplayCardWrapperColumn classname="six columns">{categorySelect()}</DisplayCardWrapperColumn>
        <DisplayCardWrapperColumn classname="six columns">{componentNameInput()}</DisplayCardWrapperColumn>
      </DisplayCardWrapperRow>
      <DisplayCardWrapperRow container>
        <DisplayCardWrapperColumn classname="four columns">{standardLowInput()}</DisplayCardWrapperColumn>
        <DisplayCardWrapperColumn classname="four columns">{standardHighInput()}</DisplayCardWrapperColumn>
        <DisplayCardWrapperColumn classname="four columns">{measureUnitInput()}</DisplayCardWrapperColumn>
      </DisplayCardWrapperRow>
      <DisplayCardWrapperRow container>
        <DisplayCardWrapperColumn classname="twelve columns">{componentCommentsInput()}</DisplayCardWrapperColumn>
      </DisplayCardWrapperRow>
      <DisplayCardWrapperRow container>
        <DisplayCardWrapperColumn classname="twelve columns">
          {id ? updateButtons() : addButtons()}
        </DisplayCardWrapperColumn>
      </DisplayCardWrapperRow>
    </DisplayCardWrapperBody>
  )

  return (
    <>
      {showBodyHeader()}
      {showBodyContent()}
      {isDeleteModalOpen && deleteModal()}
    </>
  )
}

export default CheckupComponentDetails
