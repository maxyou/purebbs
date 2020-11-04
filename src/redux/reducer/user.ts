import { user as actionUser } from '../action'

interface IState {
  isLogin: boolean,
  userUpdatting: boolean,
  userAvatarUpdatting: boolean,
  userLogoutting: boolean,
  result: object,
  _id: string,
  name: string,
  role: string,
  email: string,
  created: string,
  avatarPath: string,
  resetPwdResult: object,
  resetPwdNewResult: object,
  other: object,
  board: string[],
  setting: object,
  source: string,
  oauth: object,
}

const initState: IState = {
  isLogin: false,
  userUpdatting: false,
  userAvatarUpdatting: false,
  userLogoutting: false,
  result: {},
  _id: '',
  name: '',
  role: '',
  email: '',
  created: '',
  avatarPath: '',
  resetPwdResult: {},
  resetPwdNewResult: {},
  other: {},
  board: [], //忘记干什么用的了，可能不用了
  setting: {},
  source: 'register',
  oauth: {}
}


const getBoard: { (arg0: any): string[] } = (result) => (result && result.data && result.data.board) || []
const getName: { (arg0: any): string } = (result) => (result && result.data && result.data.name) || ''
const getId: { (arg0: any): string } = (result) => (result && result.data && result.data._id) || ''
const getRole: { (arg0: any): string } = (result) => (result && result.data && result.data.role) || ''
const getEmail: { (arg0: any): string } = (result) => (result && result.data && result.data.email) || ''
const getCreated: { (arg0: any): string } = (result) => (result && result.data && result.data.created) || ''
const getSetting: { (arg0: any): object } = (result) => (result && result.data && result.data.setting) || {}
const getSource: { (arg0: any): string } = (result) => (result && result.data && result.data.source) || 'register'
const getOauth: { (arg0: any): object } = (result) => (result && result.data && result.data.oauth) || {}
const getAvatarPath: { (arg0: any): string } = (result) => {

  let avatarPath: string | undefined

  if (result && result.data && result.data) {
    let data = result.data
    if (data.source === 'oauth') {
      avatarPath = data.oauth.avatarUrl
    } else {
      if (data.avatarFileName) {
        avatarPath = 'user/avatar/' + data.avatarFileName
      }
    }
  }
  return avatarPath || 'user/avatar/default.png'
}

export default function user(state: IState = initState, action: { type: string, payload: any }): IState {
  switch (action.type) {

    case actionUser.ACTION.USER_GET_OTHER_INFO:
      // console.log('reducer: after user send new pwd')
      // console.log(action.payload)
      return {
        ...state,
        other: { code: -1, message: 'Waiting for server response...' },
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
        resetPwdNewResult: { code: -1, message: 'A new password has been sent, waiting for the server to respond...' },
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
        resetPwdResult: { code: -1, message: 'A reset request has been sent and is waiting for a response from the server...' },
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
    // console.log('edit----------reducer: after user upload avatar')
      // console.log(action.payload)
      return {
        ...state,
        userAvatarUpdatting: true,
      }
    case actionUser.ACTION.USER_AVATAR_UPDATE_BY_ID_SUCCESS:
    // console.log('edit----------reducer: after user upload avatar success')
      // console.log(action.payload)
      return {
        ...state,
        userAvatarUpdatting: false,
      }
    case actionUser.ACTION.USER_AVATAR_UPDATE_BY_ID_FAIL:
    // console.log('edit----------reducer: after user upload avatar fail')
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
        isLogin: action.payload.code === 0 ? true : false,
        result: action.payload,
        board: getBoard(action.payload),
        name: getName(action.payload),
        _id: getId(action.payload),
        role: getRole(action.payload),
        email: getEmail(action.payload),
        created: getCreated(action.payload),
        avatarPath: getAvatarPath(action.payload),
        setting: getSetting(action.payload),
        source: getSource(action.payload),
        oauth: getOauth(action.payload),
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
        setting: getSetting(action.payload),
        source: getSource(action.payload),
        oauth: getOauth(action.payload),
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
        setting: getSetting(action.payload),
        source: getSource(action.payload),
        oauth: getOauth(action.payload),
      }
    case actionUser.ACTION.USER_LOGIN_FAIL:
      // console.log('reducer: after user login fail')
      // console.log(action.payload)
      return {
        ...state,
        isLogin: false,
        result: action.payload,
      }

    case actionUser.ACTION.USER_LOGOUT:
      return {
        ...state,
        userLogoutting: true,
      }
    case actionUser.ACTION.USER_LOGOUT_SUCCESS:
      // console.log('reducer: user logout')
      return { ...initState }

    default:
      return state
  }
}
