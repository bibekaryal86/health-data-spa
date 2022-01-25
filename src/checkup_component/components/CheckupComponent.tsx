import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DisplayCardWrapperBody, DisplayCardWrapperColumn, DisplayCardWrapperRow } from '../../styles'
import { CheckupComponentType, DefaultCheckupComponentState } from '../types/checkup.component.data.types'
import { ALERT_TYPE_FAILURE, ALERT_TYPE_SUCCESS } from '../../constants'
import { checkupCategoryOptions, HrefLink, Select, Table } from '../../common'
import { getCheckupComponentDisplayList } from '../utils/checkup.component.utils'
import { CheckupCategoryType } from '../../checkup_category'

interface CheckupComponentProps {
  errMsg: string
  success: string
  checkupComponentList: CheckupComponentType[]
  checkupCategoryList: CheckupCategoryType[]
  setAlert: (type: string, messageKey: string) => void
  resetAlert: () => void
  checkupComponentReset: () => void
  checkupComponentFindAction: () => void
  checkupCategoryFindAction: () => void
}

const CheckupComponent = (props: CheckupComponentProps): React.ReactElement => {
  const [categoryIdFilter, setCategoryIdFilter] = useState('')
  const [checkupComponentDisplayList, setCheckupComponentDisplayList] = useState(
    DefaultCheckupComponentState.checkupComponentList,
  )

  const {
    errMsg,
    success,
    checkupComponentList,
    checkupCategoryList,
    setAlert,
    resetAlert,
    checkupComponentReset,
    checkupComponentFindAction,
    checkupCategoryFindAction,
  } = props

  useEffect(() => {
    if (checkupComponentList.length === 0) {
      checkupComponentFindAction()
    }
  }, [checkupComponentFindAction, checkupComponentList.length])

  useEffect(() => {
    if (checkupCategoryList.length === 0) {
      checkupCategoryFindAction()
    }
  }, [checkupCategoryFindAction, checkupCategoryList.length])

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

  useEffect(
    () => setCheckupComponentDisplayList(getCheckupComponentDisplayList(categoryIdFilter, checkupComponentList)),
    [categoryIdFilter, checkupComponentList],
  )

  const navigate = useNavigate()
  const onClickToComponent = (id: string) => navigate(`/checkup_component_selected/${id}`)

  const showBodyHeader = () => (
    <DisplayCardWrapperBody background="slateblue" color="whitesmoke">
      <h4>Checkup Component</h4>
    </DisplayCardWrapperBody>
  )

  const showCategoryFilterSelect = () => (
    <Select
      className="u-full-width"
      id="filter-component-select-category"
      label="Checkup Category"
      onChange={(selected) => setCategoryIdFilter(selected)}
      value={categoryIdFilter}
      options={checkupCategoryOptions(checkupCategoryList)}
    />
  )

  const clearFilterLink = () => (
    <HrefLink
      id="checkup-component-clear-filter-link"
      linkTo="#"
      title="Clear Filter"
      onClick={() => setCategoryIdFilter('')}
    />
  )

  const showFilterCheckupComponent = () => (
    <DisplayCardWrapperBody id="checkup-component-filter-content">
      <DisplayCardWrapperRow borderBtm fontWeight="bold">
        Checkup Component Filters
      </DisplayCardWrapperRow>
      <DisplayCardWrapperBody container>
        <DisplayCardWrapperRow container>
          <DisplayCardWrapperColumn classname="four columns">{showCategoryFilterSelect()}</DisplayCardWrapperColumn>
        </DisplayCardWrapperRow>
        {categoryIdFilter ? (
          <DisplayCardWrapperRow container>
            <DisplayCardWrapperColumn classname="four columns">{clearFilterLink()}</DisplayCardWrapperColumn>
          </DisplayCardWrapperRow>
        ) : (
          <React.Fragment />
        )}
      </DisplayCardWrapperBody>
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
  const data = Array.from(checkupComponentDisplayList, (x) => {
    return {
      categoryName: x.checkupCategory.categoryName || 'ERROR',
      componentName: x.componentName,
      standardRange: x.standardRange || '',
      actions: actionLinks(x.id),
    }
  })
  const footer = `Number of Records: ${checkupComponentDisplayList.length}`
  const showCheckupComponentList = () => (
    <Table title="Checkup Components" headers={headers} data={data} footer={footer} />
  )

  return (
    <>
      {showBodyHeader()}
      {showFilterCheckupComponent()}
      {showAddCheckupComponent()}
      {showCheckupComponentList()}
    </>
  )
}

export default CheckupComponent
