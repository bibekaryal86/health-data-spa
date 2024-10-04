import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../app/context/AuthContext'
import { CheckupCategoryType } from '../../checkup_category'
import { CheckupComponentType } from '../../checkup_component'
import {
  checkupCategoryOptions,
  checkupComponentOptions,
  checkupDateOptions,
  HrefLink,
  Modal,
  resultFlagOptions,
  Select,
  Table,
} from '../../common'
import { ALERT_TYPE_FAILURE, ALERT_TYPE_SUCCESS } from '../../constants'
import { DisplayCardWrapperBody, DisplayCardWrapperColumn, DisplayCardWrapperRow } from '../../styles'
import {
  CheckupResultType,
  DefaultCheckupResultFilter,
  DefaultCheckupResultState,
} from '../types/checkup.result.data.types'
import {
  getCheckupResultDisplayList,
  isCheckupResultFilterApplied,
  setCheckupResultFiltersValue,
} from '../utils/checkup.result.utils'

interface CheckupResultProps {
  errMsg: string
  success: string
  checkupResultList: CheckupResultType[]
  checkupComponentList: CheckupComponentType[]
  checkupCategoryList: CheckupCategoryType[]
  setAlert: (type: string, messageKey: string) => void
  resetAlert: () => void
  checkupResultReset: () => void
  checkupResultFindAction: (username: string) => void
  checkupComponentFindAction: () => void
  checkupCategoryFindAction: () => void
}

const CheckupComponent = (props: CheckupResultProps): React.ReactElement => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [selectedComment, setSelectedComment] = useState('')
  const [checkupResultFilters, setCheckupResultFilters] = useState(DefaultCheckupResultFilter)
  const [checkupResultDisplayList, setCheckupResultDisplayList] = useState(DefaultCheckupResultState.checkupResultList)
  const [username, setUsername] = useState('')
  const authContext = useContext(AuthContext)
  useEffect(() => {
    setUsername(authContext.auth?.userDetails?.username)
  }, [authContext.auth?.userDetails?.username])

  const {
    errMsg,
    success,
    checkupResultList,
    checkupComponentList,
    checkupCategoryList,
    setAlert,
    resetAlert,
    checkupResultReset,
    checkupResultFindAction,
    checkupComponentFindAction,
    checkupCategoryFindAction,
  } = props

  useEffect(() => {
    if (checkupResultList.length === 0) {
      username && checkupResultFindAction(username)
    }
  }, [checkupResultFindAction, checkupResultList.length, username])

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
      checkupResultReset()
      resetAlert()
    }
  }, [checkupResultReset, resetAlert])

  const navigate = useNavigate()
  const onClickToResult = (id: string) => navigate(`/checkup_result_selected/${id}`)

  const showBodyHeader = () => (
    <DisplayCardWrapperBody background="slateblue" color="whitesmoke">
      <h4>Checkup Result</h4>
    </DisplayCardWrapperBody>
  )

  const isFilterApplied = useMemo(() => isCheckupResultFilterApplied(checkupResultFilters), [checkupResultFilters])

  useEffect(() => {
    isFilterApplied
      ? setCheckupResultDisplayList(getCheckupResultDisplayList(checkupResultFilters, checkupResultList))
      : setCheckupResultDisplayList(checkupResultList)
  }, [checkupResultFilters, checkupResultList, isFilterApplied])

  const onChangeFilter = (selectedFilter: string, selectedValue: string) =>
    setCheckupResultFilters(setCheckupResultFiltersValue(checkupResultFilters, selectedFilter, selectedValue))

  const showCategoryFilterSelect = () => (
    <Select
      className="u-full-width"
      id="checkup-result-filter-category-select"
      label="Checkup Category"
      onChange={(event) => onChangeFilter('checkupCategory', event)}
      value={checkupResultFilters.categoryId}
      options={checkupCategoryOptions(checkupCategoryList)}
    />
  )

  const showComponentFilterSelect = () => (
    <Select
      className="u-full-width"
      id="checkup-result-filter-component-select"
      label="Checkup Component"
      onChange={(event) => onChangeFilter('checkupComponent', event)}
      value={checkupResultFilters.componentId}
      options={checkupComponentOptions(checkupComponentList)}
    />
  )

  const showCheckupDateSelect = () => (
    <Select
      className="u-full-width"
      id="checkup-result-filter-date-select"
      label="Checkup Date"
      onChange={(event) => onChangeFilter('checkupDate', event)}
      value={checkupResultFilters.checkupDate}
      options={checkupDateOptions(checkupResultList)}
    />
  )

  const showResultFlagSelect = () => (
    <Select
      className="u-full-width"
      id="checkup-result-filter-flag-select"
      label="Result Flag"
      onChange={(event) => onChangeFilter('resultFlag', event)}
      value={checkupResultFilters.resultFlag}
      options={resultFlagOptions()}
    />
  )

  const clearFilterLink = () => (
    <HrefLink
      id="checkup-result-clear-filter-link"
      linkTo="#"
      title="Clear Filter"
      onClick={() => setCheckupResultFilters(DefaultCheckupResultFilter)}
    />
  )

  const showFilterCheckupResult = () => (
    <DisplayCardWrapperBody id="checkup-result-filter-content">
      <DisplayCardWrapperRow borderBtm fontWeight="bold">
        Checkup Result Filters
      </DisplayCardWrapperRow>
      <DisplayCardWrapperBody container>
        <DisplayCardWrapperRow container>
          <DisplayCardWrapperColumn classname="six columns">{showCategoryFilterSelect()}</DisplayCardWrapperColumn>
          <DisplayCardWrapperColumn classname="six columns">{showComponentFilterSelect()}</DisplayCardWrapperColumn>
        </DisplayCardWrapperRow>
        <DisplayCardWrapperRow container>
          <DisplayCardWrapperColumn classname="six columns">{showCheckupDateSelect()}</DisplayCardWrapperColumn>
          <DisplayCardWrapperColumn classname="six columns">{showResultFlagSelect()}</DisplayCardWrapperColumn>
        </DisplayCardWrapperRow>
        {isFilterApplied ? (
          <DisplayCardWrapperRow container>
            <DisplayCardWrapperColumn classname="six columns">{clearFilterLink()}</DisplayCardWrapperColumn>
          </DisplayCardWrapperRow>
        ) : (
          <React.Fragment />
        )}
      </DisplayCardWrapperBody>
    </DisplayCardWrapperBody>
  )

  const showAddCheckupResult = () => (
    <DisplayCardWrapperBody color="whitesmoke">
      <HrefLink
        id="checkup-result-new-href-link"
        linkTo="#"
        title="To Add a New Checkup Result Click Here"
        onClick={() => onClickToResult('')}
      />
    </DisplayCardWrapperBody>
  )

  const actionLinks = (id: string) => (
    <HrefLink id="checkup-result-action-href-link" linkTo="#" title="Details" onClick={() => onClickToResult(id)} />
  )

  const commentLink = (comment: string) => (
    <HrefLink
      id="checkup-result-comment-href-link"
      linkTo="#"
      title="View"
      onClick={() => {
        setSelectedComment(comment)
        setIsCommentModalOpen(true)
      }}
    />
  )

  const commentModal = useCallback(
    () => (
      <Modal
        setIsModalOpen={setIsCommentModalOpen}
        header="Comment Details"
        body={selectedComment}
        primaryButton="Ok"
        primaryButtonAction={() => setIsCommentModalOpen(false)}
      />
    ),
    [selectedComment],
  )

  const headersHeaders = [
    'Category',
    'Component',
    'Date',
    'Standard Range',
    'Result',
    'Flag',
    'Actions_display',
    'Comments_display',
    'Comments_export',
  ]
  const sortableHeaders = ['Category', 'Component', 'Date', 'Flag']
  const headers = Array.from(headersHeaders, (x) => {
    return {
      headerTitle: x,
      isSortAllowed: sortableHeaders.includes(x),
    }
  })
  const data = Array.from(checkupResultDisplayList, (x) => {
    return {
      categoryName: x.checkupComponent?.checkupCategory?.categoryName || 'ERROR',
      componentName: x.checkupComponent?.componentName || 'ERROR',
      checkupDate: x.checkupDate,
      standardRange: x.checkupComponent.standardRange || '',
      testResult: x.testResult,
      resultFlag: x.resultFlag,
      actions_display: actionLinks(x.id),
      comments_display: x.checkupComponent.componentComments ? commentLink(x.checkupComponent.componentComments) : '',
      comments_export: x.checkupComponent.componentComments || '',
    }
  })
  const footer = `Number of Records: ${checkupResultList.length}`
  const showCheckupResultList = () => (
    <Table
      title="Checkup Results"
      headers={headers}
      data={data}
      footer={footer}
      isExportToCsv
      exportToCsvFileName="checkup_results.csv"
    />
  )

  return (
    <>
      {showBodyHeader()}
      {showFilterCheckupResult()}
      {showAddCheckupResult()}
      {showCheckupResultList()}
      {isCommentModalOpen && commentModal()}
    </>
  )
}

export default CheckupComponent
