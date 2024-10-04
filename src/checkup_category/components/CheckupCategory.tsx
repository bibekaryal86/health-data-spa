import React, { useEffect, useReducer } from 'react'

import { Button, HrefLink, Input, Modal, Table } from '../../common'
import { ALERT_TYPE_FAILURE, ALERT_TYPE_SUCCESS } from '../../constants'
import { DisplayCardWrapperBody } from '../../styles'
import checkupCategoryState from '../reducers/checkup.category.state.reducer'
import { CheckupCategoryType, DefaultCheckupCategoryLocalState } from '../types/checkup.category.data.types'
import {
  setCheckupCategoriesDeleteModalOpen,
  setCheckupCategoriesInsertModalOpen,
  setCheckupCategoriesModalClose,
  setCheckupCategoriesModalInput,
  setCheckupCategoriesUpdateModalOpen,
  setSelectedCheckupCategory,
} from '../utils/checkup.category.utils'

interface CheckupCategoryProps {
  errMsg: string
  success: string
  checkupCategoryList: CheckupCategoryType[]
  setAlert: (type: string, messageKey: string) => void
  resetAlert: () => void
  checkupCategoryReset: () => void
  checkupCategoryFindAction: () => void
  checkupCategoryInsertAction: (categoryName: string) => void
  checkupCategoryUpdateAction: (id: string, categoryName: string) => void
  checkupCategoryDeleteAction: (id: string) => void
}

const CheckupCategory = (props: CheckupCategoryProps): React.ReactElement => {
  const [checkupCategoryLocalState, checkupCategoryLocalDispatch] = useReducer(
    checkupCategoryState,
    DefaultCheckupCategoryLocalState,
  )

  const {
    errMsg,
    success,
    checkupCategoryList,
    setAlert,
    resetAlert,
    checkupCategoryReset,
    checkupCategoryFindAction,
    checkupCategoryInsertAction,
    checkupCategoryUpdateAction,
    checkupCategoryDeleteAction,
  } = props

  const {
    selectedCheckupCategoryId,
    selectedCheckupCategoryName,
    isInsertModalOpen,
    isUpdateModalOpen,
    isDeleteModalOpen,
    categoryNameModalInput,
  } = checkupCategoryLocalState

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
    <DisplayCardWrapperBody background="slateblue" color="whitesmoke">
      <h4>Checkup Category</h4>
    </DisplayCardWrapperBody>
  )

  const showAddCheckupCategory = () => (
    <DisplayCardWrapperBody color="whitesmoke">
      <HrefLink
        id="checkup-category-new-href-link"
        linkTo="#"
        title="To Add a New Checkup Category Click Here"
        onClick={() => checkupCategoryLocalDispatch(setCheckupCategoriesInsertModalOpen(true))}
      />
    </DisplayCardWrapperBody>
  )

  const actionButtons = (id: string, categoryName: string) => (
    <>
      <Button
        id={`UPDATE_CHECKUP_CATEGORY_${id}`}
        title="Click Here to Rename"
        includeBorder
        onClick={() => {
          checkupCategoryLocalDispatch(setCheckupCategoriesUpdateModalOpen(true))
          checkupCategoryLocalDispatch(setSelectedCheckupCategory(id, categoryName))
          checkupCategoryLocalDispatch(setCheckupCategoriesModalInput(categoryName))
        }}
      />
      <Button
        id={`DELETE_CHECKUP_CATEGORY_${id}`}
        title="Click Here to Delete"
        includeBorder
        onClick={() => {
          checkupCategoryLocalDispatch(setCheckupCategoriesDeleteModalOpen(true))
          checkupCategoryLocalDispatch(setSelectedCheckupCategory(id, categoryName))
        }}
      />
    </>
  )

  const headersHeaders = ['Checkup Category', 'Actions']
  const headers = Array.from(headersHeaders, (x) => {
    return {
      headerTitle: x,
      isSortAllowed: x !== 'Actions',
    }
  })
  const data = Array.from(checkupCategoryList, (x) => {
    return {
      description: x.categoryName,
      actions: actionButtons(x.id, x.categoryName),
    }
  })
  const footer = `Number of Records: ${checkupCategoryList.length}`

  const showCheckupCategoryList = () => (
    <Table title="Checkup Categories" headers={headers} data={data} footer={footer} />
  )

  const checkupCategoryModalBody = () =>
    isDeleteModalOpen ? (
      `Are you sure you want to delete ${selectedCheckupCategoryName}?`
    ) : (
      <>
        <Input
          id="checkup-category-modal--input-id"
          label={`Enter Checkup Category Name: ${selectedCheckupCategoryName}`}
          onChange={(value) => checkupCategoryLocalDispatch(setCheckupCategoriesModalInput(value))}
          value={categoryNameModalInput}
          width="300px"
        />
      </>
    )

  const checkupCategoryModalButton = () => (isDeleteModalOpen ? 'Delete' : isInsertModalOpen ? 'Add' : 'Update')

  const doUpdateCheckupCategory = () => {
    isDeleteModalOpen
      ? checkupCategoryDeleteAction(selectedCheckupCategoryId)
      : isInsertModalOpen
      ? checkupCategoryInsertAction(categoryNameModalInput)
      : isUpdateModalOpen
      ? checkupCategoryUpdateAction(selectedCheckupCategoryId, categoryNameModalInput)
      : console.log('Do Update Checkup Category Error')
    checkupCategoryLocalDispatch(setCheckupCategoriesModalClose())
  }

  const checkupCategoryModal = () => (
    <Modal
      setIsModalOpen={() => checkupCategoryLocalDispatch(setCheckupCategoriesModalClose())}
      header="Warning"
      body={checkupCategoryModalBody()}
      primaryButton={checkupCategoryModalButton()}
      primaryButtonAction={() => doUpdateCheckupCategory()}
      secondaryButton="Cancel"
      secondaryButtonAction={() => checkupCategoryLocalDispatch(setCheckupCategoriesModalClose())}
    />
  )

  return (
    <>
      {showBodyHeader()}
      {showAddCheckupCategory()}
      {(isInsertModalOpen || isUpdateModalOpen || isDeleteModalOpen) && checkupCategoryModal()}
      {showCheckupCategoryList()}
    </>
  )
}

export default CheckupCategory
