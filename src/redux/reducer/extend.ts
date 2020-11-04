import { extend as actionExtend } from '../action'
import { IExtendState as IState } from '../common'
// interface IState {
//    //add extend activity
//    addChoice: string,
//    addLineup: {
//      expireTime: object|null,
//      // expireTimeUTC: null,
//      anonymous: boolean,    
//    },
//    addVote: {
//      expireTime: object|null,
//      // expireTimeUTC: null,
//      anonymous: boolean,
//      ifMulti: string,
//      options:string[]
//    },
   
//    //join or quit extend activity
//    lineupJoinning: boolean|null,
//    lineupQuitting: boolean|null,
//    voteJoinning: boolean|null,
//    voteQuitting: boolean|null,
 
//    //extend activity data from server
//    extendFromServer:object|null,
// }

const initState:IState = {
  
  //add extend activity
  addChoice: '',
  addLineup: {
    expireTime: null,
    // expireTimeUTC: null,
    anonymous: false,    
  },
  addVote: {
    expireTime: null,
    // expireTimeUTC: null,
    anonymous: false,
    ifMulti: 'single',
    options:['']
  },
  
  //join or quit extend activity
  lineupJoinning: null,
  lineupQuitting: null,
  voteJoinning: null,
  voteQuitting: null,

  //extend activity data from server
  extendFromServer:null,
}
export default function extend(state:IState = initState, action:{type:string, payload:any}):IState {
  switch (action.type) {

    //------------add extend activity----------------------------
    case actionExtend.ACTION.EXTEND_ADD_CHOICE_INIT:
    // console.log('extend choice init')
      // return { ...state, addChoice: action.payload }
      return initState

    case actionExtend.ACTION.EXTEND_ADD_CHOICE_UPDATE:
    // console.log('extend choice update')
      return { ...state, addChoice: action.payload }

    case actionExtend.ACTION.EXTEND_ADD_LINEUP_INIT:
    // console.log('extend lineup init')
      // return { ...state, addLineup: action.payload }
      return {...state, addLineup: initState.addLineup}
    case actionExtend.ACTION.EXTEND_ADD_LINEUP_UPDATE:
    // console.log('extend lineup update')
      return { ...state, addLineup: action.payload }

    case actionExtend.ACTION.EXTEND_ADD_VOTE_INIT:
    // console.log('extend vote init')
      // return { ...state, addVote: action.payload }
      return {...state, addVote: initState.addVote}
    case actionExtend.ACTION.EXTEND_ADD_VOTE_UPDATE:
    // console.log('extend vote update')
    // console.log(action.payload)
      return { ...state, addVote: action.payload }

    //------------join or quit extend activity------------------------
    case actionExtend.ACTION.EXTEND_LINEUP_JOIN:
    // console.log('extend lineup join success')
      return { ...state, lineupJoinning: true }
    case actionExtend.ACTION.EXTEND_LINEUP_JOIN_SUCCESS:
    // console.log('extend lineup join success')
      return { ...state, lineupJoinning: false }
    case actionExtend.ACTION.EXTEND_LINEUP_JOIN_FAIL:
    // console.log('extend lineup join success')
      return { ...state, lineupJoinning: false }

    case actionExtend.ACTION.EXTEND_LINEUP_QUIT:
    // console.log('extend lineup quit success')
      return { ...state, lineupQuitting: true }
    case actionExtend.ACTION.EXTEND_LINEUP_QUIT_SUCCESS:
    // console.log('extend lineup quit success')
      return { ...state, lineupQuitting: false }
    case actionExtend.ACTION.EXTEND_LINEUP_QUIT_FAIL:
    // console.log('extend lineup quit success')
      return { ...state, lineupQuitting: false }

    case actionExtend.ACTION.EXTEND_VOTE_JOIN:
    // console.log('extend vote join success')
      return { ...state, voteJoinning: true }
    case actionExtend.ACTION.EXTEND_VOTE_JOIN_SUCCESS:
    // console.log('extend vote join success')
      return { ...state, voteJoinning: false }
    case actionExtend.ACTION.EXTEND_VOTE_JOIN_FAIL:
    // console.log('extend vote join success')
      return { ...state, voteJoinning: false }

    case actionExtend.ACTION.EXTEND_VOTE_QUIT:
    // console.log('extend vote quit success')
      return { ...state, voteQuitting: true }
    case actionExtend.ACTION.EXTEND_VOTE_QUIT_SUCCESS:
    // console.log('extend vote quit success')
      return { ...state, voteQuitting: false }
    case actionExtend.ACTION.EXTEND_VOTE_QUIT_FAIL:
    // console.log('extend vote quit success')
      return { ...state, voteQuitting: false }

    //------------extend activity data from server------------------------
    case actionExtend.ACTION.EXTEND_DATA_GET_SUCCESS:
      // console.log('extend data get success')
      // console.log(action.payload)
      return { ...state, extendFromServer: (action.payload && action.payload.code===0 && action.payload.data)? action.payload.data.extend:null}
    case actionExtend.ACTION.EXTEND_SERVER_DATA_INIT:
      // console.log('extend data get success')
      // console.log(action.payload)
      return { ...state, extendFromServer: null }


    default:
      return state
  }
}
