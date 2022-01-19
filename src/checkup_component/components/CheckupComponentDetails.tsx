import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DisplayCardWrapperBody } from '../../styles'
import { CheckupComponentType, DefaultCheckupComponent } from '../types/checkup.component.data.types'
import checkupComponentDetails from '../reducers/one.checkup.component.reducer'
import { ALERT_TYPE_FAILURE, ALERT_TYPE_SUCCESS } from '../../constants'
import { HrefLink } from '../../common'

interface CheckupComponentDetailsProps {
  errMsg: string
  success: string
  checkupComponentList: CheckupComponentType[]
  selectedCheckupComponent: CheckupComponentType
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
  const [isValidId, setIsValidId] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    errMsg,
    success,
    checkupComponentList,
    selectedCheckupComponent,
    setAlert,
    resetAlert,
    checkupComponentReset,
    checkupComponentFindAction,
    checkupComponentInsertAction,
    checkupComponentUpdateAction,
    checkupComponentDeleteAction,
  } = props

  console.log(
    checkupComponentData,
    setCheckupComponentData,
    isValidId,
    setIsValidId,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    '****************',
    id,
    '****************',
    navigate,
    checkupComponentList,
    selectedCheckupComponent,
    checkupComponentFindAction,
    checkupComponentInsertAction,
    checkupComponentUpdateAction,
    checkupComponentDeleteAction,
  )

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
    if (Number.isInteger(id)) {
      setIsValidId(true)
    } else {
      setIsValidId(false)
    }
  }, [id])

  useEffect(() => {
    id && isValidId && checkupComponentFindAction(id)
  }, [checkupComponentFindAction, checkupComponentList, id, isValidId])

  useEffect(() => {
    setCheckupComponentData({ checkupComponent: selectedCheckupComponent })
  }, [selectedCheckupComponent])

  const showAllCheckupComponents = () => {
    return navigate('/checkup_component')
  }

  const showBodyHeader = () => (
    <DisplayCardWrapperBody background="slateblue" color="whitesmoke">
      <HrefLink
        id="one-checkup-component-all-components-link-1"
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

  return <>{showBodyHeader()}</>
}

export default CheckupComponentDetails
