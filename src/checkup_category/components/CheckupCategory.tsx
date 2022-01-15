import React, { useEffect } from 'react'
import { CheckupCategory } from '../types/checkup.category.data.types'
import { ALERT_TYPE_FAILURE, ALERT_TYPE_SUCCESS } from '../../constants'
import { DisplayCardWrapperBody } from '../../styles'

interface CheckupCategoryProps {
  errMsg: string
  success: string
  checkupCategoryList: CheckupCategory[]
  setAlert: (type: string, messageKey: string) => void
  resetAlert: () => void
  checkupCategoryReset: () => void
  checkupCategoryFindAction: () => void
  checkupCategoryInsertAction: (categoryName: string) => void
  checkupCategoryUpdateAction: (id: string, categoryName: string) => void
  checkupCategoryDeleteAction: (id: string) => void
}

const CheckupCategory = (props: CheckupCategoryProps): React.ReactElement => {
  const {
    errMsg,
    success,
    checkupCategoryList,
    setAlert,
    resetAlert,
    checkupCategoryReset,
    checkupCategoryFindAction,
    //checkupCategoryInsertAction,
    //checkupCategoryUpdateAction,
    //checkupCategoryDeleteAction,
  } = props

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
      checkupCategoryReset()
      resetAlert()
    }
  }, [checkupCategoryReset, resetAlert])

  const showBodyHeader = () => (
    <DisplayCardWrapperBody background="slateblue">
      <h4>Checkup Category</h4>
    </DisplayCardWrapperBody>
  )

  return <>{showBodyHeader()}</>
}

export default CheckupCategory
