// import { delay } from 'redux-saga'
// import 'babel-polyfill';
import "regenerator-runtime/runtime";
import { put, takeEvery, all, call } from 'redux-saga/effects'
import {extend as serviceExtend} from '../../service'
import {extend as actionExtend} from '../action'
import {IAction} from '../common'

function* extendLineupJoin(action:IAction) {
    // console.log('====extend lineup join 1');
    var res = yield call(serviceExtend.extendLineupJoin, action.payload)
    // console.log('====extend lineup join 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionExtend.ACTION.EXTEND_LINEUP_JOIN_SUCCESS, payload: res.data })
        // console.log('====extend lineup join 3');
    }else{        
        yield put({ type: actionExtend.ACTION.EXTEND_LINEUP_JOIN_FAIL, payload: res.data })
        // console.log('====extend lineup join 4');
    }
}

function* extendLineupQuit(action:IAction) {
    // console.log('====extend lineup join 1');
    var res = yield call(serviceExtend.extendLineupQuit, action.payload)
    // console.log('====extend lineup join 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionExtend.ACTION.EXTEND_LINEUP_QUIT_SUCCESS, payload: res.data })
        // console.log('====extend lineup join 3');
    }else{        
        yield put({ type: actionExtend.ACTION.EXTEND_LINEUP_QUIT_FAIL, payload: res.data })
        // console.log('====extend lineup join 4');
    }
}

function* extendVoteJoin(action:IAction) {
    // console.log('====extend vote join 1');
    var res = yield call(serviceExtend.extendVoteJoin, action.payload)
    // console.log('====extend vote join 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionExtend.ACTION.EXTEND_VOTE_JOIN_SUCCESS, payload: res.data })
        // console.log('====extend vote join 3');
    }else{        
        yield put({ type: actionExtend.ACTION.EXTEND_VOTE_JOIN_FAIL, payload: res.data })
        // console.log('====extend vote join 4');
    }
}

function* extendVoteQuit(action:IAction) {
    // console.log('====extend vote join 1');
    var res = yield call(serviceExtend.extendVoteQuit, action.payload)
    // console.log('====extend vote join 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionExtend.ACTION.EXTEND_VOTE_QUIT_SUCCESS, payload: res.data })
        // console.log('====extend vote join 3');
    }else{        
        yield put({ type: actionExtend.ACTION.EXTEND_VOTE_QUIT_FAIL, payload: res.data })
        // console.log('====extend vote join 4');
    }
}


export default function* extend() {
    // console.log('====extend Sagas 0');
    yield all([
        takeEvery(actionExtend.ACTION.EXTEND_LINEUP_JOIN, extendLineupJoin),
        takeEvery(actionExtend.ACTION.EXTEND_LINEUP_QUIT, extendLineupQuit),
        takeEvery(actionExtend.ACTION.EXTEND_VOTE_JOIN, extendVoteJoin),
        takeEvery(actionExtend.ACTION.EXTEND_VOTE_QUIT, extendVoteQuit),
    ])
}




