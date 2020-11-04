import { detail as actionDetail } from '../../action'

interface IState{
  post: object,
  postLoading: boolean,
  commentListResult: object,
  commentLoading: boolean,
  commentPageSize: number,
  commentPageCurrent: number,
  commentPaginateExt: number,
  commentTotalDocs: number,
  commentAddResult: string,
  commentAdding: boolean,
  commentDeletting: boolean,
  commentUpdatting: boolean,
  // postDeletting: false,
  postUpdatting: boolean,
  postAttaching: boolean,
  commentAttaching: boolean,
}

const initState:IState = {
  post: {},
  postLoading: false,
  commentListResult: {},
  commentLoading: false,
  commentPageSize: 10,
  commentPageCurrent: 1,
  commentPaginateExt: 3,
  commentTotalDocs: 0,
  commentAddResult: 'please add comment',
  commentAdding: false,
  commentDeletting: false,
  commentUpdatting: false,
  // postDeletting: false,
  postUpdatting: false,
  postAttaching: false,
  commentAttaching: false,
}
export default function detail(state:IState = initState, action:{type:string, payload:any}):IState { //action做枚举类限制？
  switch (action.type) {

    case actionDetail.ACTION.DETAIL_POST_COMMENTS_CLEAR:
      // console.log('detail post comments clear')
        return { ...state, post: {}, commentListResult: {}, commentPageCurrent: 1 }
  
    case actionDetail.ACTION.DETAIL_POST_GET:
    // console.log('detail post get in reducer')
      // return { ...state, post: {}, commentPageCurrent: 1, postLoading: true }//进入detail页面时需要设置comment page current为1
      return { ...state, postLoading: true }//进入detail页面时需要设置comment page current为1
    case actionDetail.ACTION.DETAIL_POST_GET_SUCCESS:
    // console.log('detail post get success')
      return { ...state, post: action.payload, postLoading: false }
    case actionDetail.ACTION.DETAIL_POST_GET_FAIL:
    // console.log('detail post get fail')
      return { ...state, post: action.payload, postLoading: false }


    case actionDetail.ACTION.DETAIL_COMMENT_NAV:
    // console.log('detail comment nav in reducer')
      return { ...state, commentPageCurrent: action.payload }
    case actionDetail.ACTION.DETAIL_COMMENT_CHANGE_PAGE_SIZE:
    // console.log('detail comment change page size in reducer')
      return { ...state, commentPageSize: parseInt(action.payload) }

    case actionDetail.ACTION.DETAIL_COMMENT_GET:
    // console.log('detail post get in reducer')
      // return { ...state, commentListResult: {}, commentLoading: true }
      return { ...state, commentLoading: true }
    case actionDetail.ACTION.DETAIL_COMMENT_GET_SUCCESS:
    // console.log('detail post get success')

      if (action.payload.data.length === 0 && action.payload.totalDocs !== 0) { //说明当前page没有数据，超过了最后一页，需要倒回最后一页
        var base = Math.floor(action.payload.totalDocs / state.commentPageSize)
        // console.log('------------calc new current---------------')
        // console.log(action.payload.totalDocs)
        // console.log(state.commentPageSize)
        // console.log(base)
        var mod = action.payload.totalDocs % state.commentPageSize
        if (mod !== 0) {
          base++
        }
      // console.log('new current:' + base)
        return { ...state, commentPageCurrent: base }
      }

      return { ...state, commentListResult: action.payload, commentTotalDocs: action.payload.totalDocs, commentLoading: false }
    case actionDetail.ACTION.DETAIL_COMMENT_GET_FAIL:
    // console.log('detail post get fail')
      return { ...state, commentListResult: action.payload, commentLoading: false }


    case actionDetail.ACTION.DETAIL_COMMENT_ADD:
    // console.log('detail comment add in reducer')
      return { ...state, commentAdding: true }
    case actionDetail.ACTION.DETAIL_COMMENT_ADD_SUCCESS:
    // console.log('detail comment add success')
      return { ...state, commentAdding: false }
    case actionDetail.ACTION.DETAIL_COMMENT_ADD_FAIL:
    // console.log('detail comment add fail')
      return { ...state, commentAdding: false }

    case actionDetail.ACTION.DETAIL_COMMENT_DELETE_BY_ID:
    // console.log('detail comment add in reducer')
      return { ...state, commentDeletting: true }
    case actionDetail.ACTION.DETAIL_COMMENT_DELETE_SUCCESS:
    // console.log('detail comment add success')
      return { ...state, commentDeletting: false }
    case actionDetail.ACTION.DETAIL_COMMENT_DELETE_FAIL:
    // console.log('detail comment add fail')
      return { ...state, commentDeletting: false }

    case actionDetail.ACTION.DETAIL_COMMENT_UPDATE_BY_ID:
    // console.log('detail comment add in reducer')
      return { ...state, commentUpdatting: true }
    case actionDetail.ACTION.DETAIL_COMMENT_UPDATE_SUCCESS:
    // console.log('detail comment add success')
      return { ...state, commentUpdatting: false }
    case actionDetail.ACTION.DETAIL_COMMENT_UPDATE_FAIL:
    // console.log('detail comment add fail')
      return { ...state, commentUpdatting: false }

    case actionDetail.ACTION.DETAIL_POST_UPDATE_BY_ID:
    // console.log('post update one in reducer')
      return { ...state, postUpdatting: true }
    case actionDetail.ACTION.DETAIL_POST_UPDATE_SUCCESS:
    // console.log('post update success------------')
      // console.log(action.payload)
      return { ...state, postUpdatting: false }
    case actionDetail.ACTION.DETAIL_POST_UPDATE_FAIL:
    // console.log('post update fail')
      return { ...state, postUpdatting: false }

    case actionDetail.ACTION.DETAIL_POST_ATTACH_BY_ID:
    // console.log('post attach one in reducer')
      return { ...state, postAttaching: true }
    case actionDetail.ACTION.DETAIL_POST_ATTACH_SUCCESS:
    // console.log('post attach success------------')
      // console.log(action.payload)
      return { ...state, postAttaching: false }
    case actionDetail.ACTION.DETAIL_POST_ATTACH_FAIL:
    // console.log('post attach fail')
      return { ...state, postAttaching: false }

    case actionDetail.ACTION.DETAIL_COMMENT_ATTACH_BY_ID:
    // console.log('comment attach one in reducer')
      return { ...state, commentAttaching: true }
    case actionDetail.ACTION.DETAIL_COMMENT_ATTACH_SUCCESS:
    // console.log('comment attach success------------')
      // console.log(action.payload)
      return { ...state, commentAttaching: false }
    case actionDetail.ACTION.DETAIL_COMMENT_ATTACH_FAIL:
    // console.log('comment attach fail')
      return { ...state, commentAttaching: false }
    default:
      return state
  }
}
