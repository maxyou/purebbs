// import { delay } from 'redux-saga'
// import 'babel-polyfill';
import "regenerator-runtime/runtime";
import { put, takeEvery, all, call } from 'redux-saga/effects'
import {post as servicePost} from '../../../service'
// console.log('servicePost:')
// console.log(servicePost)
import {post as actionPost} from '../../action'
import {IAction} from '../../common'

function* postAdd(action:IAction) {
    // console.log('====post Sagas 1');
    var res = yield call(servicePost.postAdd, action.payload)
    // console.log('====post Sagas 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionPost.ACTION.POST_ADD_SUCCESS, payload: res.data })
        // console.log('====post Sagas 3');
    }else{        
        yield put({ type: actionPost.ACTION.POST_ADD_FAIL, payload: res.data })
        // console.log('====post Sagas 4');
    }
}
function* postGet(action:IAction) {
    // console.log('====post get 1');
    var res = yield call(servicePost.postGet, action.payload)
    // console.log('====post get 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        // console.log('====post get 3');
        yield put({ type: actionPost.ACTION.POST_GET_SUCCESS, payload: res.data })
    }else{        
        // console.log('====post get 4');
        yield put({ type: actionPost.ACTION.POST_GET_FAIL, payload: res.data })
    }
}
function* postFindByIdAndDelete(action:IAction) {
    // console.log('====post delete 1');
    var res = yield call(servicePost.postFindByIdAndDelete, action.payload)
    // console.log('====post get 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionPost.ACTION.POST_DELETE_SUCCESS, payload: res.data })
        // console.log('====post delete 3');
    }else{        
        yield put({ type: actionPost.ACTION.POST_DELETE_FAIL, payload: res.data })
        // console.log('====post delete 4');
    }
}
function* postFindByIdAndUpdate(action:IAction) {
    // console.log('====post update 1');
    var res = yield call(servicePost.postFindByIdAndUpdate, action.payload)
    // console.log('====post update 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionPost.ACTION.POST_UPDATE_SUCCESS, payload: res.data })
        // yield put({ type: actionPost.ACTION.POST_GET})
        // console.log('====post get 3');
    }else{        
        yield put({ type: actionPost.ACTION.POST_UPDATE_FAIL, payload: res.data })
        // console.log('====post get 4');
    }
}

function* postAttachById(action:IAction) {
    // console.log('==== post attach Sagas 1');
    var res = yield call(servicePost.postAttachById, action.payload)
    // console.log('====post Sagas 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionPost.ACTION.POST_ATTACH_SUCCESS, payload: res.data })
        // console.log('==== post attach Sagas 3');
    }else{        
        yield put({ type: actionPost.ACTION.POST_ATTACH_FAIL, payload: res.data })
        // console.log('==== post attach Sagas 4');
    }
}


export default function* post() {
    // console.log('====post Sagas 0');
    yield all([
        takeEvery(actionPost.ACTION.POST_ADD, postAdd),
        takeEvery(actionPost.ACTION.POST_GET, postGet),
        takeEvery(actionPost.ACTION.POST_DELETE_BY_ID, postFindByIdAndDelete),
        // takeEvery(actionPost.ACTION.POST_UPDATE_BY_ID, postFindByIdAndUpdate),
        takeEvery(actionPost.ACTION.POST_ATTACH_BY_ID, postAttachById),
    ])
}




