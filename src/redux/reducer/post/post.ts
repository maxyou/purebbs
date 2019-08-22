import { post as actionPost } from '../../action'

interface IState {
  postPageSize: number,
  postPageCurrent: number,
  postPaginateExt: number,
  postTotalDocs: number,
  postAddResult: string,
  postListResult: object,
  postListLoading: boolean,
  postAdding: boolean,
  postDeletting: boolean,
  postUpdatting: boolean,
  postAttaching: boolean,
  categoryCurrent: string,
}

const initState:IState = {
  postPageSize: 10,
  postPageCurrent: 1,
  postPaginateExt: 5,
  postTotalDocs: 0,
  postAddResult: 'please add post',
  postListResult: {},
  postListLoading: false,
  postAdding: false,
  postDeletting: false,
  postUpdatting: false,
  postAttaching: false,
  categoryCurrent: '',
}

export default function post(state:IState = initState, action:{type:string, payload:any}):IState {
  switch (action.type) {

    case actionPost.ACTION.POST_CATEGORY_NAV:
      console.log('post category current nav in reducer')
      return { ...state, categoryCurrent: action.payload }

    case actionPost.ACTION.POST_NAV:
      console.log('post nav in reducer')
      return { ...state, postPageCurrent: action.payload }
    case actionPost.ACTION.POST_CHANGE_PAGE_SIZE:
      console.log('post change page size in reducer')
      return { ...state, postPageSize: parseInt(action.payload) }

    case actionPost.ACTION.POST_ADD:
      console.log('post add in reducer')
      return { ...state, postAdding: true }
    case actionPost.ACTION.POST_ADD_SUCCESS:
      console.log('post add success')
      return { ...state, postAddResult: action.payload, postAdding: false }
    case actionPost.ACTION.POST_ADD_FAIL:
      console.log('post add fail')
      return { ...state, postAddResult: action.payload, postAdding: false }

    case actionPost.ACTION.POST_GET:
      console.log('post get in reducer')
      return { ...state, postListLoading: true }
    case actionPost.ACTION.POST_GET_SUCCESS:
      console.log('post get success')

      if (action.payload.data.length == 0 && action.payload.totalDocs != 0) { //说明当前page没有数据，超过了最后一页，需要倒回最后一页
        var base = Math.floor(action.payload.totalDocs / state.postPageSize)
        console.log(action.payload.totalDocs)
        console.log(state.postPageSize)
        console.log(base)
        var mod = action.payload.totalDocs % state.postPageSize
        console.log(mod)
        if (mod != 0) {
          base++
        }
        console.log('new current:' + base)
        return { ...state, postPageCurrent: base }
      }

      return { ...state, postListResult: action.payload, postListLoading: false, postTotalDocs: action.payload.totalDocs }
    case actionPost.ACTION.POST_GET_FAIL:
      console.log('post get fail')
      return { ...state, postListResult: action.payload, postListLoading: false }

    case actionPost.ACTION.POST_DELETE_BY_ID:
      console.log('post delete one in reducer')
      return { ...state, postDeletting: true }
    case actionPost.ACTION.POST_DELETE_SUCCESS:
      console.log('post delete success')
      return { ...state, postDeletting: false }
    case actionPost.ACTION.POST_DELETE_FAIL:
      console.log('post delete fail')
      return { ...state, postDeletting: false }

    // case actionPost.ACTION.POST_UPDATE_BY_ID:
    //   console.log('post update one in reducer')
    //   return { ...state, postUpdatting: true }
    // case actionPost.ACTION.POST_UPDATE_SUCCESS:
    //   console.log('post update success------------')
    //   // console.log(action.payload)
    //   return { ...state, postUpdatting: false }
    // case actionPost.ACTION.POST_UPDATE_FAIL:
    //   console.log('post update fail')
    //   return { ...state, postUpdatting: false }

    case actionPost.ACTION.POST_ATTACH_BY_ID:
      console.log('post attach one in reducer')
      return { ...state, postAttaching: true }
    case actionPost.ACTION.POST_ATTACH_SUCCESS:
      console.log('post attach success')
      // console.log(action.payload)
      return { ...state, postAttaching: false }
    case actionPost.ACTION.POST_ATTACH_FAIL:
      console.log('post attach fail')
      return { ...state, postAttaching: false }


    default:
      return state
  }
}
