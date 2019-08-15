// import { delay } from 'redux-saga'
// import 'babel-polyfill';
import "regenerator-runtime/runtime";
import { put, takeEvery, all, call } from 'redux-saga/effects'
import {admin as serviceAdmin} from '@/service'
// console.log('serviceAdmin:')
// console.log(serviceAdmin)
import {admin as actionAdmin} from '../action'

function* userAdd(action) {
    // console.log('====user Sagas 1');
    var res = yield call(serviceAdmin.userAdd, action.payload)
    // console.log('====user Sagas 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionAdmin.ACTION.ADMIN_USER_ADD_SUCCESS, payload: res.data })
        // console.log('====user Sagas 3');
    }else{        
        yield put({ type: actionAdmin.ACTION.ADMIN_USER_ADD_FAIL, payload: res.data })
        // console.log('====user Sagas 4');
    }
}
function* userGet(action) {
    // console.log('====user get 1');
    var res = yield call(serviceAdmin.userGet, action.payload)
    // console.log('====user get 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        // console.log('====user get 3');
        yield put({ type: actionAdmin.ACTION.ADMIN_USER_GET_SUCCESS, payload: res.data })
    }else{        
        // console.log('====user get 4');
        yield put({ type: actionAdmin.ACTION.ADMIN_USER_GET_FAIL, payload: res.data })
    }
}
function* userFindByIdAndDelete(action) {
    // console.log('====user get 1');
    var res = yield call(serviceAdmin.userFindByIdAndDelete, action.payload)
    // console.log('====user get 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionAdmin.ACTION.ADMIN_USER_DELETE_SUCCESS, payload: res.data })
        // console.log('====user get 3');
    }else{        
        yield put({ type: actionAdmin.ACTION.ADMIN_USER_DELETE_FAIL, payload: res.data })
        // console.log('====user get 4');
    }
}
function* userFindByIdAndUpdate(action) {
    // console.log('====user update 1');
    var res = yield call(serviceAdmin.userFindByIdAndUpdate, action.payload)
    // console.log('====user update 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionAdmin.ACTION.ADMIN_USER_UPDATE_SUCCESS, payload: res.data })
        // yield put({ type: actionAdmin.ACTION.ADMIN_USER_GET})
        // console.log('====user get 3');
    }else{        
        yield put({ type: actionAdmin.ACTION.ADMIN_USER_UPDATE_FAIL, payload: res.data })
        // console.log('====user get 4');
    }
}
function* userAvatarFindByIdAndUpdate(action) {
    // console.log('====user avatar update 1');
    var res = yield call(serviceAdmin.userAvatarFindByIdAndUpdate, action.payload)
    // console.log('====user avatar update 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionAdmin.ACTION.ADMIN_USER_AVATAR_UPDATE_SUCCESS, payload: res.data })
        // yield put({ type: actionAdmin.ACTION.ADMIN_USER_GET})
        // console.log('====user avatar get 3');
    }else{        
        yield put({ type: actionAdmin.ACTION.ADMIN_USER_AVATAR_UPDATE_FAIL, payload: res.data })
        // console.log('====user get 4');
    }
}


export default function* admin() {
    // console.log('====user Sagas 0');
    yield all([
        takeEvery(actionAdmin.ACTION.ADMIN_USER_ADD, userAdd),
        takeEvery(actionAdmin.ACTION.ADMIN_USER_GET, userGet),
        takeEvery(actionAdmin.ACTION.ADMIN_USER_DELETE_BY_ID, userFindByIdAndDelete),
        takeEvery(actionAdmin.ACTION.ADMIN_USER_UPDATE_BY_ID, userFindByIdAndUpdate),
        takeEvery(actionAdmin.ACTION.ADMIN_USER_AVATAR_UPDATE_BY_ID, userAvatarFindByIdAndUpdate),
    ])
}




