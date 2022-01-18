export const INPUT_REGEX_PATTERN = /^[A-Za-z0-9]+$/

export const ALERT_TYPE_SUCCESS = 'success'
export const ALERT_TYPE_FAILURE = 'failure'
export const ALERT_TYPE_INFO = 'info'
export const ALERT_TYPE_WARN = 'warn'

export const checkBoxOptionsYesNo = [
  { value: 'YES', text: 'YES' },
  { value: 'NO', text: 'NO' },
]

export const TABLE_SORT_DIRECTION_ASCENDING = 'ASC'
export const TABLE_SORT_DIRECTION_DESCENDING = 'DESC'
export const TABLE_SORTED_ASC_CODE = 8657
export const TABLE_SORTED_DESC_CODE = 8659
export const TABLE_SORTED_NONE_CODE = 8205
export const TABLE_EXPORT_KEYS_TO_AVOID = ['actions', 'Actions']
export const TABLE_EXPORT_KEY_FOR_TITLE = 'title'

export const DATE_FORMAT_MATCHER_REGEX = new RegExp('[0-9]{4}\\-[0-9]{2}\\-[0-9]{2}')
export const CURRENCY_FORMAT_MATCHER_REGEX = new RegExp('^\\$|\\-\\$(\\d{1,3}(\\,\\d{3})*|(\\d+))(\\.\\d{1,2})?$')

export const MSG_KEY_SOMETHING_WENT_WRONG = 'GENERIC_ERROR'
export const MSG_KEY_INVALID_SIGNIN = 'INVALID_SIGNIN'
export const MSG_KEY_FAIL_SIGNIN = 'FAIL_SIGNIN'
export const MSG_KEY_SIGNIN_FIRST = 'SIGNIN_FIRST'
export const MSG_KEY_SESSION_INVALID = 'INVALID_SESSION'

export const MSG_KEY_CHECKUP_CATEGORY_INVALID = 'CATEGORY_INVALID'
export const MSG_KEY_CHECKUP_CATEGORY_FIND_ERROR = 'CATEGORY_FIND_ERROR'
export const MSG_KEY_CHECKUP_CATEGORY_INSERT_ERROR = 'CATEGORY_INSERT_ERROR'
export const MSG_KEY_CHECKUP_CATEGORY_INSERT_SUCCESS = 'CATEGORY_INSERT_SUCCESS'
export const MSG_KEY_CHECKUP_CATEGORY_UPDATE_ERROR = 'CATEGORY_UPDATE_ERROR'
export const MSG_KEY_CHECKUP_CATEGORY_UPDATE_SUCCESS = 'CATEGORY_UPDATE_SUCCESS'
export const MSG_KEY_CHECKUP_CATEGORY_DELETE_ERROR = 'CATEGORY_DELETE_ERROR'
export const MSG_KEY_CHECKUP_CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS'

export const MSG_KEY_CHECKUP_COMPONENT_INVALID = 'COMPONENT_INVALID'
export const MSG_KEY_CHECKUP_COMPONENT_FIND_ERROR = 'COMPONENT_FIND_ERROR'
export const MSG_KEY_CHECKUP_COMPONENT_INSERT_ERROR = 'COMPONENT_INSERT_ERROR'
export const MSG_KEY_CHECKUP_COMPONENT_INSERT_SUCCESS = 'COMPONENT_INSERT_SUCCESS'
export const MSG_KEY_CHECKUP_COMPONENT_UPDATE_ERROR = 'COMPONENT_UPDATE_ERROR'
export const MSG_KEY_CHECKUP_COMPONENT_UPDATE_SUCCESS = 'COMPONENT_UPDATE_SUCCESS'
export const MSG_KEY_CHECKUP_COMPONENT_DELETE_ERROR = 'COMPONENT_DELETE_ERROR'
export const MSG_KEY_CHECKUP_COMPONENT_DELETE_SUCCESS = 'COMPONENT_DELETE_SUCCESS'

export const ALERT_MESSAGES = new Map([
  [MSG_KEY_SOMETHING_WENT_WRONG, 'Something Went Wrong! Please Try Again!!!'],
  [MSG_KEY_INVALID_SIGNIN, 'Invalid Input! Please Try Again!!!'],
  [MSG_KEY_FAIL_SIGNIN, 'Invalid Username and/or Password! Please Try Again!!!'],
  [MSG_KEY_SIGNIN_FIRST, 'Please Sign In First!!!'],
  [MSG_KEY_SESSION_INVALID, 'Session Invalidated Due to Inactivity/Expiry! Please Sign In Again to Continue!!!'],
  [
    MSG_KEY_CHECKUP_CATEGORY_INVALID,
    'Invalid Input! The Category Name Should be 3 Characters or More!! Please Try Again!!!',
  ],
  [MSG_KEY_CHECKUP_CATEGORY_FIND_ERROR, 'Error Retrieving Checkup Categories! Please Try Again!!!'],
  [MSG_KEY_CHECKUP_CATEGORY_INSERT_ERROR, 'Error Inserting Checkup Category! Please Try Again!!!'],
  [MSG_KEY_CHECKUP_CATEGORY_INSERT_SUCCESS, 'Checkup Category Insert Success!!!'],
  [MSG_KEY_CHECKUP_CATEGORY_UPDATE_ERROR, 'Error Updating Checkup Category! Please Try Again!!!'],
  [MSG_KEY_CHECKUP_CATEGORY_UPDATE_SUCCESS, 'Checkup Category Update Success!!!'],
  [MSG_KEY_CHECKUP_CATEGORY_DELETE_ERROR, 'Error Deleting Checkup Category! Please Try Again!!!'],
  [MSG_KEY_CHECKUP_CATEGORY_DELETE_SUCCESS, 'Checkup Category Delete Success!!!'],
  [
    MSG_KEY_CHECKUP_COMPONENT_INVALID,
    'Invalid Input! The Component Name (3 Characters or More) and Category Should be Provided!! Please Try Again!!!',
  ],
  [MSG_KEY_CHECKUP_COMPONENT_FIND_ERROR, 'Error Retrieving Checkup Components! Please Try Again!!!'],
  [MSG_KEY_CHECKUP_COMPONENT_INSERT_ERROR, 'Error Inserting Checkup Component! Please Try Again!!!'],
  [MSG_KEY_CHECKUP_COMPONENT_INSERT_SUCCESS, 'Checkup Component Insert Success!!!'],
  [MSG_KEY_CHECKUP_COMPONENT_UPDATE_ERROR, 'Error Updating Checkup Component! Please Try Again!!!'],
  [MSG_KEY_CHECKUP_COMPONENT_UPDATE_SUCCESS, 'Checkup Component Update Success!!!'],
  [MSG_KEY_CHECKUP_COMPONENT_DELETE_ERROR, 'Error Deleting Checkup Component! Please Try Again!!!'],
  [MSG_KEY_CHECKUP_COMPONENT_DELETE_SUCCESS, 'Checkup Component Delete Success!!!'],
])
