import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DisplayCardWrapperBody } from '../../styles'
import { CheckupComponentType } from '../types/checkup.component.data.types'
import { ALERT_TYPE_FAILURE, ALERT_TYPE_SUCCESS } from '../../constants'
import { HrefLink, Table } from '../../common'

interface CheckupComponentProps {
  errMsg: string
  success: string
  checkupComponentList: CheckupComponentType[]
  setAlert: (type: string, messageKey: string) => void
  resetAlert: () => void
  checkupComponentReset: () => void
  checkupComponentFindAction: () => void
}

const CheckupComponent = (props: CheckupComponentProps): React.ReactElement => {
  const {
    errMsg,
    success,
    checkupComponentList,
    setAlert,
    resetAlert,
    checkupComponentReset,
    checkupComponentFindAction,
  } = props

  useEffect(() => {
    if (checkupComponentList.length === 0) {
      checkupComponentFindAction()
    }
  }, [checkupComponentFindAction, checkupComponentList.length])

  useEffect(() => {
    errMsg && setAlert(ALERT_TYPE_FAILURE, errMsg)
    success && setAlert(ALERT_TYPE_SUCCESS, success)
  }, [errMsg, setAlert, success])

  useEffect(() => {
    return () => {
      checkupComponentReset()
      resetAlert()
    }
  }, [checkupComponentReset, resetAlert])

  const navigate = useNavigate()
  const onClickToComponent = (id: string) => navigate(`/checkup_component_selected/${id}`)

  const showBodyHeader = () => (
    <DisplayCardWrapperBody background="slateblue" color="whitesmoke">
      <h4>Checkup Component</h4>
    </DisplayCardWrapperBody>
  )

  const showAddCheckupComponent = () => (
    <DisplayCardWrapperBody color="whitesmoke">
      <HrefLink
        id="checkup-component-new-href-link"
        linkTo="#"
        title="To Add a New Checkup Component Click Here"
        onClick={() => onClickToComponent('')}
      />
    </DisplayCardWrapperBody>
  )

  const actionLinks = (id: string) => (
    <HrefLink
      id="checkup-component-action-href-link"
      linkTo="#"
      title="Click Here to View Details"
      onClick={() => onClickToComponent(id)}
    />
  )

  const headersHeaders = ['Category Name', 'Component Name', 'Standard Range', 'Actions']
  const doNotSortHeaders = ['Standard Range', 'Actions']
  const headers = Array.from(headersHeaders, (x) => {
    return {
      headerTitle: x,
      isSortAllowed: !doNotSortHeaders.includes(x),
    }
  })
  const data = Array.from(checkupComponentList, (x) => {
    return {
      categoryName: x.checkupCategory.categoryName || 'ERROR',
      componentName: x.componentName,
      standardRange: x.standardRange || '',
      actions: actionLinks(x.id),
    }
  })
  const footer = `Number of Records: ${checkupComponentList.length}`
  const showCheckupComponentList = () => (
    <Table title="Checkup Components" headers={headers} data={data} footer={footer} />
  )

  return (
    <>
      {showBodyHeader()}
      {showAddCheckupComponent()}
      {showCheckupComponentList()}
    </>
  )
}

export default CheckupComponent
