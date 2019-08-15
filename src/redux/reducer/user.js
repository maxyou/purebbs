import { user as actionUser } from '../action'

const initState = {
  isLogin: false,
  userUpdatting: false,
  userAvatarUpdatting: false,
  result: {},
  _id: '',
  name: '',
  role: '',
  email: '',
  created: '',
  avatarPath: '',
  resetPwdResult: {},
  resetPwdNewResult: {},
  other:{},
  board:[]
}


const getBoard = (result) => result && result.data && result.data.board || ''
const getName = (result) => result && result.data && result.data.name || ''
const getId = (result) => result && result.data && result.data._id || ''
const getRole = (result) => result && result.data && result.data.role || ''
const getEmail = (result) => result && result.data && result.data.email || ''
const getCreated = (result) => result && result.data && result.data.created || ''
const getAvatarPath = (result) => {
  let fileName = result && result.data && result.data.avatarFileName || ''
  if (fileName) {
    return 'user/avatar/' + fileName
  } else {
    return 'user/avatar/default.png'
  }
}

export default function post(state = initState, action) {
  switch (action.type) {

    case actionUser.ACTION.USER_GET_OTHER_INFO:
      // console.log('reducer: after user send new pwd')
      // console.log(action.payload)
      return {
        ...state,
        other: {code:-1, message:'Waiting for server response...'},
      }
    case actionUser.ACTION.USER_GET_OTHER_INFO_SUCCESS:
      // console.log('reducer: after user send new pwd')
      // console.log(action.payload)
      return {
        ...state,
        other: action.payload,
      }
    case actionUser.ACTION.USER_GET_OTHER_INFO_FAIL:
      // console.log('reducer: after user send new pwd')
      // console.log(action.payload)
      return {
        ...state,
        other: action.payload,
      }

    case actionUser.ACTION.USER_RESET_PASSWORD_NEW:
      // console.log('reducer: after user send new pwd')
      // console.log(action.payload)
      return {
        ...state,
        resetPwdNewResult: {code:-1, message:'A new password has been sent, waiting for the server to respond...'},
      }
    case actionUser.ACTION.USER_RESET_PASSWORD_NEW_SUCCESS:
      // console.log('reducer: after user send new pwd')
      // console.log(action.payload)
      return {
        ...state,
        resetPwdNewResult: action.payload,
      }
    case actionUser.ACTION.USER_RESET_PASSWORD_NEW_FAIL:
      // console.log('reducer: after user send new pwd')
      // console.log(action.payload)
      return {
        ...state,
        resetPwdNewResult: action.payload,
      }

    case actionUser.ACTION.USER_RESET_PASSWORD:
      // console.log('reducer: after user request reset pwd')
      // console.log(action.payload)
      return {
        ...state,
        resetPwdResult: {code:-1, message:'A reset request has been sent and is waiting for a response from the server...'},
      }
    case actionUser.ACTION.USER_RESET_PASSWORD_SUCCESS:
      // console.log('reducer: after user request reset pwd success')
      // console.log(action.payload)
      return {
        ...state,
        resetPwdResult: action.payload,
      }
    case actionUser.ACTION.USER_RESET_PASSWORD_FAIL:
      // console.log('reducer: after user request reset pwd fail')
      // console.log(action.payload)
      return {
        ...state,
        resetPwdResult: action.payload,
      }

    case actionUser.ACTION.USER_AVATAR_UPDATE_BY_ID:
      // console.log('reducer: after user upload avatar')
      // console.log(action.payload)
      return {
        ...state,
        userAvatarUpdatting: true,
      }
    case actionUser.ACTION.USER_AVATAR_UPDATE_BY_ID_SUCCESS:
      // console.log('reducer: after user upload avatar success')
      // console.log(action.payload)
      return {
        ...state,
        userAvatarUpdatting: false,
      }
    case actionUser.ACTION.USER_AVATAR_UPDATE_BY_ID_FAIL:
      // console.log('reducer: after user upload avatar fail')
      // console.log(action.payload)
      return {
        ...state,
        userAvatarUpdatting: false,
      }

    case actionUser.ACTION.USER_UPDATE_BY_ID:
      // console.log('reducer: after user update')
      // console.log(action.payload)
      return {
        ...state,
        userUpdatting: true,
      }
    case actionUser.ACTION.USER_UPDATE_BY_ID_SUCCESS:
      // console.log('reducer: after user update success')
      // console.log(action.payload)
      return {
        ...state,
        userUpdatting: false,
      }
    case actionUser.ACTION.USER_UPDATE_BY_ID_FAIL:
      // console.log('reducer: after user update fail')
      // console.log(action.payload)
      return {
        ...state,
        userUpdatting: false,
      }

    case actionUser.ACTION.USER_GET_STATUS_SUCCESS:
      // console.log('reducer: after user get status')
      // console.log(action.payload)
      return {
        ...state,
        isLogin: action.payload.code == 0 ? true : false,
        result: action.payload,
        board: getBoard(action.payload),
        name: getName(action.payload),
        _id: getId(action.payload),
        role: getRole(action.payload),
        email: getEmail(action.payload),
        created: getCreated(action.payload),
        avatarPath: getAvatarPath(action.payload),
      }

    case actionUser.ACTION.USER_REGISTER_SUCCESS:
      // console.log('reducer: after user register')
      // console.log(action.payload)
      return {
        ...state,
        isLogin: true,
        result: action.payload,
        board: getBoard(action.payload),
        name: getName(action.payload),
        _id: getId(action.payload),
        role: getRole(action.payload),
        email: getEmail(action.payload),
        created: getCreated(action.payload),
        avatarPath: getAvatarPath(action.payload),
      }
    case actionUser.ACTION.USER_REGISTER_FAIL:
      // console.log('reducer: after user register')
      // console.log(action.payload)
      return {
        ...state,
        isLogin: false,
        result: action.payload,
      }

    case actionUser.ACTION.USER_LOGIN_SUCCESS:
      // console.log('reducer: after user login')
      // console.log(action.payload)
      return {
        ...state,
        isLogin: true,
        result: action.payload,
        board: getBoard(action.payload),
        name: getName(action.payload),
        _id: getId(action.payload),
        role: getRole(action.payload),
        email: getEmail(action.payload),
        created: getCreated(action.payload),
        avatarPath: getAvatarPath(action.payload),
      }
    case actionUser.ACTION.USER_LOGIN_FAIL:
      // console.log('reducer: after user login fail')
      // console.log(action.payload)
      return {
        ...state, isLogin: false,
        isLogin: false,
        result: action.payload,
      }

    case actionUser.ACTION.USER_LOGOUT_SUCCESS:
      // console.log('reducer: user logout')
      return { ...initState }

    default:
      return state
  }
}
