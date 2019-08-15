// import { delay } from 'redux-saga'
// import 'babel-polyfill';
import "regenerator-runtime/runtime";
import { put, takeEvery, all, call } from 'redux-saga/effects'
import {detail as serviceDetail} from '@/service'
import {detail as actionDetail, extend as actionExtend} from '../../action'


function* detailPostGet(action) {
    // console.log('====detail post get 1');
    var res = yield call(serviceDetail.detailPostGet, action.payload)
    // console.log('====detail post get 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        // console.log('====detail post get 3');
        yield put({ type: actionDetail.ACTION.DETAIL_POST_GET_SUCCESS, payload: res.data })
        yield put({ type: actionExtend.ACTION.EXTEND_DATA_GET_SUCCESS, payload: res.data }) //为隔离起见，数据复制到redux.state.extend
    }else{        
        // console.log('====detail post get 4');
        yield put({ type: actionDetail.ACTION.DETAIL_POST_GET_FAIL, payload: res.data })
    }
}

function* detailCommentGet(action) {
    // console.log('====detail comment get 1');
    var res = yield call(serviceDetail.detailCommentGet, action.payload)
    // console.log('====detail post get 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        // console.log('====detail comment get 3');
        yield put({ type: actionDetail.ACTION.DETAIL_COMMENT_GET_SUCCESS, payload: res.data })
    }else{        
        // console.log('====detail comment get 4');
        yield put({ type: actionDetail.ACTION.DETAIL_COMMENT_GET_FAIL, payload: res.data })
    }
}

function* detailCommentAdd(action) {
    // console.log('====detail comment add Sagas 1');
    var res = yield call(serviceDetail.detailCommentAdd, action.payload)
    // console.log('====post Sagas 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionDetail.ACTION.DETAIL_COMMENT_ADD_SUCCESS, payload: res.data })
        // console.log('====detail comment add Sagas 3');
    }else{        
        yield put({ type: actionDetail.ACTION.DETAIL_COMMENT_ADD_FAIL, payload: res.data })
        // console.log('====detail comment add Sagas 4');
    }
}

function* detailCommentDeleteById(action) {
    // console.log('====detail comment delete Sagas 1');
    var res = yield call(serviceDetail.detailCommentDeleteById, action.payload)
    // console.log('====post Sagas 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionDetail.ACTION.DETAIL_COMMENT_DELETE_SUCCESS, payload: res.data })
        // console.log('====detail comment delete Sagas 3');
    }else{        
        yield put({ type: actionDetail.ACTION.DETAIL_COMMENT_DELETE_FAIL, payload: res.data })
        // console.log('====detail comment delete Sagas 4');
    }
}

function* detailCommentUpdateById(action) {
    // console.log('====detail comment update Sagas 1');
    var res = yield call(serviceDetail.detailCommentUpdateById, action.payload)
    // console.log('====post Sagas 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionDetail.ACTION.DETAIL_COMMENT_UPDATE_SUCCESS, payload: res.data })
        // console.log('====detail comment update Sagas 3');
    }else{        
        yield put({ type: actionDetail.ACTION.DETAIL_COMMENT_UPDATE_FAIL, payload: res.data })
        // console.log('====detail comment update Sagas 4');
    }
}

function* detailPostUpdateById(action) {
    // console.log('====detail post update Sagas 1');
    var res = yield call(serviceDetail.detailPostUpdateById, action.payload)
    // console.log('====post Sagas 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionDetail.ACTION.DETAIL_POST_UPDATE_SUCCESS, payload: res.data })
        // console.log('====detail post update Sagas 3');
    }else{        
        yield put({ type: actionDetail.ACTION.DETAIL_POST_UPDATE_FAIL, payload: res.data })
        // console.log('====detail post update Sagas 4');
    }
}

function* detailPostAttachById(action) {
    // console.log('====detail post attach Sagas 1');
    var res = yield call(serviceDetail.detailPostAttachById, action.payload)
    // console.log('====post Sagas 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionDetail.ACTION.DETAIL_POST_ATTACH_SUCCESS, payload: res.data })
        // console.log('====detail post attach Sagas 3');
    }else{        
        yield put({ type: actionDetail.ACTION.DETAIL_POST_ATTACH_FAIL, payload: res.data })
        // console.log('====detail post attach Sagas 4');
    }
}

function* detailCommentAttachById(action) {
    // console.log('====detail comment attach Sagas 1');
    var res = yield call(serviceDetail.detailCommentAttachById, action.payload)
    // console.log('====post Sagas 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionDetail.ACTION.DETAIL_COMMENT_ATTACH_SUCCESS, payload: res.data })
        // console.log('====detail comment attach Sagas 3');
    }else{        
        yield put({ type: actionDetail.ACTION.DETAIL_COMMENT_ATTACH_FAIL, payload: res.data })
        // console.log('====detail comment attach Sagas 4');
    }
}

export default function* detail() {
    // console.log('====detail post Sagas 0');
    yield all([
        takeEvery(actionDetail.ACTION.DETAIL_COMMENT_GET, detailCommentGet),
        takeEvery(actionDetail.ACTION.DETAIL_COMMENT_ADD, detailCommentAdd),
        takeEvery(actionDetail.ACTION.DETAIL_COMMENT_DELETE_BY_ID, detailCommentDeleteById),
        takeEvery(actionDetail.ACTION.DETAIL_COMMENT_UPDATE_BY_ID, detailCommentUpdateById),
        takeEvery(actionDetail.ACTION.DETAIL_POST_UPDATE_BY_ID, detailPostUpdateById),
        takeEvery(actionDetail.ACTION.DETAIL_POST_ATTACH_BY_ID, detailPostAttachById),
        takeEvery(actionDetail.ACTION.DETAIL_COMMENT_ATTACH_BY_ID, detailCommentAttachById),
        takeEvery(actionDetail.ACTION.DETAIL_POST_GET, detailPostGet),
    ])
}




