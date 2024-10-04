import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { AuthContext } from '../../app/context/AuthContext'
import { CheckupCategoryType } from '../../checkup_category'
import { CheckupComponentType } from '../../checkup_component'
import { Button, checkupComponentOptions, HrefLink, Input, InputType, Modal, Select } from '../../common'
import { ALERT_TYPE_FAILURE, ALERT_TYPE_SUCCESS } from '../../constants'
import { DisplayCardWrapperBody, DisplayCardWrapperColumn, DisplayCardWrapperRow } from '../../styles'
import checkupResultDetails from '../reducers/checkup.result.details.reducer'
import { CheckupResultType, DefaultCheckupResult } from '../types/checkup.result.data.types'
import { handleCheckupResultFieldChange, validateCheckupResult } from '../utils/checkup.result.utils'

interface CheckupResultDetailsProps {
  errMsg: string
  success: string
  checkupResultList: CheckupResultType[]
  selectedCheckupResult: CheckupResultType
  checkupComponentList: CheckupComponentType[]
  checkupCategoryList: CheckupCategoryType[]
  setAlert: (type: string, messageKey: string) => void
  resetAlert: () => void
  checkupResultReset: () => void
  checkupResultFindAction: (username: string, selectedId: string) => void
  checkupResultInsertAction: (username: string, checkupResult: CheckupResultType) => void
  checkupResultUpdateAction: (selectedId: string, checkupResult: CheckupResultType) => void
  checkupResultDeleteAction: (selectedId: string) => void
  checkupComponentFindAction: () => void
  checkupCategoryFindAction: () => void
}

const CheckupResultDetails = (props: CheckupResultDetailsProps): React.ReactElement => {
  const [checkupResultData, setCheckupResultData] = useReducer(checkupResultDetails, DefaultCheckupResult)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const authContext = useContext(AuthContext)
  useEffect(() => {
    setUsername(authContext.auth?.userDetails?.username)
  }, [authContext.auth?.userDetails?.username])

  const {
    errMsg,
    success,
    checkupResultList,
    selectedCheckupResult,
    checkupComponentList,
    checkupCategoryList,
    setAlert,
    resetAlert,
    checkupResultReset,
    checkupResultFindAction,
    checkupResultInsertAction,
    checkupResultUpdateAction,
    checkupResultDeleteAction,
    checkupComponentFindAction,
    checkupCategoryFindAction,
  } = props

  useEffect(() => {
    return () => {
      checkupResultReset()
      resetAlert()
    }
  }, [checkupResultReset, resetAlert])

  useEffect(() => {
    errMsg && setAlert(ALERT_TYPE_FAILURE, errMsg)
    success && setAlert(ALERT_TYPE_SUCCESS, success)
  }, [errMsg, setAlert, success])

  useEffect(() => {
    id && username && checkupResultFindAction(username, id)
  }, [checkupResultFindAction, checkupResultList, id, username])

  useEffect(() => {
    checkupComponentList.length === 0 && checkupComponentFindAction()
  }, [checkupComponentFindAction, checkupComponentList.length])

  useEffect(() => {
    checkupCategoryList.length === 0 && checkupCategoryFindAction()
  }, [checkupCategoryFindAction, checkupCategoryList.length])

  useEffect(() => {
    setCheckupResultData({ checkupResult: selectedCheckupResult })
  }, [selectedCheckupResult])

  const showAllCheckupResults = () => {
    return navigate('/checkup_result')
  }

  const insertCheckupResult = () => {
    const isInvalid = validateCheckupResult(checkupResultData)
    if (isInvalid) {
      const errMsg = 'Invalid Input! Required field ' + isInvalid + ' not provided!! Please Try Again!!!'
      setAlert(ALERT_TYPE_FAILURE, errMsg)
    } else {
      resetAlert()
      checkupResultInsertAction(username, checkupResultData)
      showAllCheckupResults()
    }
  }

  const updateCheckupResult = () => {
    const isInvalid = validateCheckupResult(checkupResultData)
    if (isInvalid) {
      const errMsg = 'Invalid Input! Required field ' + isInvalid + ' not provided!! Please Try Again!!!'
      setAlert(ALERT_TYPE_FAILURE, errMsg)
    } else {
      resetAlert()
      id && checkupResultUpdateAction(id, checkupResultData)
    }
  }

  const deleteCheckupResultBegin = () => setIsDeleteModalOpen(true)
  const deleteModalBody = () => (
    <>
      <p>
        Are you sure you want to delete: {checkupResultData.checkupDate}--
        {checkupResultData.checkupComponent.componentName}?
      </p>
    </>
  )
  const deleteModal = () => (
    <Modal
      setIsModalOpen={setIsDeleteModalOpen}
      header="Warning"
      body={deleteModalBody()}
      primaryButton="Yes"
      primaryButtonAction={deleteCheckupResultEnd}
      secondaryButton="Cancel"
      secondaryButtonAction={() => setIsDeleteModalOpen(false)}
    />
  )
  const deleteCheckupResultEnd = () => {
    setIsDeleteModalOpen(false)
    id && checkupResultDeleteAction(id)
    showAllCheckupResults()
  }

  const showBodyHeader = () => (
    <DisplayCardWrapperBody background="slateblue" color="whitesmoke">
      <HrefLink
        id="checkup-result-all-results-link-1"
        linkTo="#"
        title="To All Checkup Results List"
        onClick={() => showAllCheckupResults()}
        underline
        color="inherit"
        margin="0px 0px 5px 0px"
      />
      <h4>
        Checkup Result Details: {selectedCheckupResult.checkupDate}--
        {selectedCheckupResult.checkupComponent.componentName}
      </h4>
    </DisplayCardWrapperBody>
  )

  const componentSelect = () => (
    <Select
      className="u-full-width"
      id="checkup-result-details-component-select"
      label="Checkup Component"
      onChange={(event) =>
        handleCheckupResultFieldChange(event, 'componentId', checkupResultData, setCheckupResultData)
      }
      value={checkupResultData.checkupComponent.id}
      options={checkupComponentOptions(checkupComponentList)}
      required
    />
  )

  const checkupDateInput = () => (
    <Input
      className="u-full-width"
      id="checkup-result-details-date-input"
      label="Checkup Date"
      type={InputType.date}
      onChange={(event) =>
        handleCheckupResultFieldChange(event, 'checkupDate', checkupResultData, setCheckupResultData)
      }
      value={checkupResultData.checkupDate}
      maxLength={10}
      required
    />
  )

  const testResultInput = () => (
    <Input
      className="u-full-width"
      id="checkup-result-details-result-input"
      label="Test Result"
      type={InputType.text}
      onChange={(event) => handleCheckupResultFieldChange(event, 'testResult', checkupResultData, setCheckupResultData)}
      value={checkupResultData.testResult}
      maxLength={25}
      required
    />
  )

  const isButtonDisabled = () =>
    selectedCheckupResult.checkupDate === checkupResultData.checkupDate &&
    selectedCheckupResult.testResult === checkupResultData.testResult &&
    selectedCheckupResult.checkupComponent.id === checkupResultData.checkupComponent.id

  const addButton = () => (
    <Button
      id="checkup-result-details-button-add"
      title="Add Checkup Result"
      onClick={() => insertCheckupResult()}
      includeBorder
      disabled={isButtonDisabled()}
    />
  )

  const updateButton = () => (
    <Button
      id="checkup-result-details-button-add"
      title="Update Checkup Result"
      onClick={() => updateCheckupResult()}
      includeBorder
      disabled={isButtonDisabled()}
    />
  )

  const deleteButton = () => (
    <Button
      id="checkup-result-details-button-delete"
      title="Delete Checkup Result"
      onClick={() => deleteCheckupResultBegin()}
      includeBorder
    />
  )

  const revertButton = () => (
    <Button
      id="checkup-result-details-button-reset"
      title="Revert Changes"
      onClick={() => setCheckupResultData({ checkupResult: selectedCheckupResult })}
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
    <DisplayCardWrapperBody id="checkup-result-body-content" container>
      <DisplayCardWrapperRow container>
        <DisplayCardWrapperColumn classname="four columns">{componentSelect()}</DisplayCardWrapperColumn>
        <DisplayCardWrapperColumn classname="four columns">{checkupDateInput()}</DisplayCardWrapperColumn>
        <DisplayCardWrapperColumn classname="four columns">{testResultInput()}</DisplayCardWrapperColumn>
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

export default CheckupResultDetails
