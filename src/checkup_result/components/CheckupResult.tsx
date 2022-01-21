import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../app/context/AuthContext'
import { DisplayCardWrapperBody } from '../../styles'
import { ALERT_TYPE_FAILURE, ALERT_TYPE_SUCCESS, TABLE_SORT_KEYS_TO_AVOID } from '../../constants'
import { HrefLink, Modal, Table } from '../../common'
import { CheckupResultType } from '../types/checkup.result.data.types'

interface CheckupResultProps {
  errMsg: string
  success: string
  checkupResultList: CheckupResultType[]
  setAlert: (type: string, messageKey: string) => void
  resetAlert: () => void
  checkupResultReset: () => void
  checkupResultFindAction: (username: string) => void
}

const CheckupComponent = (props: CheckupResultProps): React.ReactElement => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [selectedComment, setSelectedComment] = useState('')
  const [username, setUsername] = useState('')
  const authContext = useContext(AuthContext)
  useEffect(() => {
    setUsername(authContext.auth?.userDetails?.username)
  }, [authContext.auth?.userDetails?.username])

  const { errMsg, success, checkupResultList, setAlert, resetAlert, checkupResultReset, checkupResultFindAction } =
    props

  useEffect(() => {
    if (checkupResultList.length === 0) {
      username && checkupResultFindAction(username)
    }
  }, [checkupResultFindAction, checkupResultList.length, username])

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

  const headersHeaders = ['Category', 'Component', 'Date', 'Standard Range', 'Result', 'Flag', 'Actions', 'Comments']
  const headers = Array.from(headersHeaders, (x) => {
    return {
      headerTitle: x,
      isSortAllowed: !TABLE_SORT_KEYS_TO_AVOID.includes(x),
    }
  })
  const data = Array.from(checkupResultList, (x) => {
    return {
      categoryName: x.checkupComponent?.checkupCategory?.categoryName || 'ERROR',
      componentName: x.checkupComponent?.componentName || 'ERROR',
      checkupDate: x.checkupDate,
      standardRange: x.checkupComponent.standardRange || '',
      testResult: x.testResult,
      resultFlag: x.resultFlag,
      actions: actionLinks(x.id),
      comments: x.checkupComponent.componentComments ? commentLink(x.checkupComponent.componentComments) : '',
    }
  })
  const footer = `Number of Records: ${checkupResultList.length}`
  const showCheckupResultList = () => <Table title="Checkup Results" headers={headers} data={data} footer={footer} />

  return (
    <>
      {showBodyHeader()}
      {showAddCheckupResult()}
      {showCheckupResultList()}
      {isCommentModalOpen && commentModal()}
    </>
  )
}

export default CheckupComponent
