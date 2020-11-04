import { admin as actionAdmin } from '../action'

interface IState {
  userPageSize: number,
  userPageCurrent: number,
  userPaginateExt: number,
  userTotalDocs: number,
  userAddResult: string,
  userListResult: object,
  userListLoading: boolean,
  userAdding: boolean,
  userDeletting: boolean,
  userUpdatting: boolean,
  userEdit: object,
}

const initState:IState = {
  userPageSize: 10,
  userPageCurrent: 1,
  userPaginateExt: 3,
  userTotalDocs: 0,
  userAddResult: 'please add user',
  userListResult: {},
  userListLoading: false,
  userAdding: false,
  userDeletting: false,
  userUpdatting: false,
  userEdit: {},
}

export default function admin(state:IState = initState, action:{type:string, payload:any}):IState {
  switch (action.type) {

    case actionAdmin.ACTION.ADMIN_USER_EDIT:
    // console.log('user nav in reducer')
      return { ...state, userEdit: action.payload }

    case actionAdmin.ACTION.ADMIN_USER_NAV:
    // console.log('user nav in reducer')
      return { ...state, userPageCurrent: action.payload }
    case actionAdmin.ACTION.ADMIN_USER_CHANGE_PAGE_SIZE:
    // console.log('admin change page size in reducer=========================')
      return { ...state, userPageSize: parseInt(action.payload) }

    case actionAdmin.ACTION.ADMIN_USER_ADD:
    // console.log('user add in reducer')
      return { ...state, userAdding: true }
    case actionAdmin.ACTION.ADMIN_USER_ADD_SUCCESS:
    // console.log('user add success')
      return { ...state, userAddResult: action.payload, userAdding: false }
    case actionAdmin.ACTION.ADMIN_USER_ADD_FAIL:
    // console.log('user add fail')
      return { ...state, userAddResult: action.payload, userAdding: false }

    case actionAdmin.ACTION.ADMIN_USER_GET:
    // console.log('user get in reducer')
      return { ...state, userListLoading: true }
    case actionAdmin.ACTION.ADMIN_USER_GET_SUCCESS:
    // console.log('user get success')

      if (action.payload.data.length === 0 && action.payload.totalDocs !== 0) { //说明当前page没有数据，超过了最后一页，需要倒回最后一页
        var base = Math.floor(action.payload.totalDocs / state.userPageSize)
        var mod = action.payload.totalDocs % state.userPageSize
        if (mod !== 0) {
          base++
        }
      // console.log('new current:' + base)
        return { ...state, userPageCurrent: base }
      }

      return { ...state, userListResult: action.payload, userListLoading: false, userTotalDocs: action.payload.totalDocs }
    case actionAdmin.ACTION.ADMIN_USER_GET_FAIL:
    // console.log('user get fail')
      return { ...state, userListResult: action.payload, userListLoading: false }

    case actionAdmin.ACTION.ADMIN_USER_DELETE_BY_ID:
    // console.log('user delete one in reducer')
      return { ...state, userDeletting: true }
    case actionAdmin.ACTION.ADMIN_USER_DELETE_SUCCESS:
    // console.log('user delete success')
      return { ...state, userDeletting: false }
    case actionAdmin.ACTION.ADMIN_USER_DELETE_FAIL:
    // console.log('user delete fail')
      return { ...state, userDeletting: false }

    case actionAdmin.ACTION.ADMIN_USER_UPDATE_BY_ID:
    // console.log('user update one in reducer')
      return { ...state, userUpdatting: true }
    case actionAdmin.ACTION.ADMIN_USER_UPDATE_SUCCESS:
    // console.log('user update success------------')
      // console.log(action.payload)
      return { ...state, userUpdatting: false }
    case actionAdmin.ACTION.ADMIN_USER_UPDATE_FAIL:
    // console.log('user update fail')
      return { ...state, userUpdatting: false }

    default:
      return state
  }
}
