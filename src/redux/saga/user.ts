// import { delay } from 'redux-saga'
// import 'babel-polyfill';
import "regenerator-runtime/runtime";
import { put, takeEvery, all, call } from 'redux-saga/effects'
import {user as serviceUser} from '../../service'
import {user as actionUser} from '../action'
import {IAction} from '../common'

function* userGetStatus(action:IAction) {
    // console.log('====userGetStatus Sagas 1');
    var res = yield call(serviceUser.getStatus, action.payload)
    // console.log('====userGetStatus Sagas 2 res:'+JSON.stringify(res));
    // console.log(res);
    if(res.data.code===0){
        yield put({ type: actionUser.ACTION.USER_GET_STATUS_SUCCESS, payload: res.data })
        // console.log('====userGetStatus Sagas 3');
    }else{        
        yield put({ type: actionUser.ACTION.USER_GET_STATUS_FAIL, payload: res.data })
        // console.log('====userGetStatus Sagas 4');
    }
}
function* userGetOtherInfo(action:IAction) {
    // console.log('====userGetOtherInfo Sagas 1');
    var res = yield call(serviceUser.getOtherInfo, action.payload)
    // console.log('====userGetOtherInfo Sagas 2 res:'+JSON.stringify(res));
    if(res.data.code===0){
        yield put({ type: actionUser.ACTION.USER_GET_OTHER_INFO_SUCCESS, payload: res.data })
        // console.log('====userGetOtherInfo Sagas 3');
    }else{        
        yield put({ type: actionUser.ACTION.USER_GET_OTHER_INFO_FAIL, payload: res.data })
        // console.log('====userGetOtherInfo Sagas 4');
    }
}
function* userLogin(action:IAction) {
    // console.log('====userLogin Sagas 1');
    var res = yield call(serviceUser.login, action.payload)
    // console.log('====userLogin Sagas 2 res:'+JSON.stringify(res));
    if(res.data.code===0){
        yield put({ type: actionUser.ACTION.USER_LOGIN_SUCCESS, payload: res.data })
        // console.log('====userLogin Sagas 3');
    }else{        
        yield put({ type: actionUser.ACTION.USER_LOGIN_FAIL, payload: res.data })
        // console.log('====userLogin Sagas 4');
    }
}
function* userRegister(action:IAction) {
    // console.log('====userRegister Sagas 1');
    var res = yield call(serviceUser.register, action.payload)
    // console.log('====userRegister Sagas 2 res:'+JSON.stringify(res));
    if(res.data.code===0){
        yield put({ type: actionUser.ACTION.USER_REGISTER_SUCCESS, payload: res.data })
        // console.log('====userRegister Sagas 3');
    }else{        
        yield put({ type: actionUser.ACTION.USER_REGISTER_FAIL, payload: res.data })
        // console.log('====userRegister Sagas 4');
    }
}
function* userLogout(action:IAction) {
    // console.log('====user logout 1');
    var res = yield call(serviceUser.logout, action.payload)
    // console.log('====post get 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        // console.log('====user logout 3');
        yield put({ type: actionUser.ACTION.USER_LOGOUT_SUCCESS, payload: res.data })
    }else{        
        // console.log('====user logout 4');
        yield put({ type: actionUser.ACTION.USER_LOGOUT_FAIL, payload: res.data })
    }
}
// function* userUploadAvatar(action) {
//     console.log('====user upload 1');
//     var res = yield call(serviceUser.uploadAvatar, action.payload)
//     // console.log('====post get 2'+JSON.stringify(res.data));
//     if(res.data.code===0){
//         console.log('====user upload 3');
//         yield put({ type: actionUser.ACTION.USER_UPLOAD_AVATAR_SUCCESS, payload: res.data })
//         yield put({ type: actionUser.ACTION.USER_GET_STATUS})
//     }else{        
//         console.log('====user upload 4');
//         yield put({ type: actionUser.ACTION.USER_UPLOAD_AVATAR_FAIL, payload: res.data })
//     }
// }
function* userUpdateAvatar(action:IAction) {
    // console.log('====user upload avatar 1');
    var res = yield call(serviceUser.updateAvatar, action.payload)
    // console.log('====post get 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        // console.log('====user upload avatar 3');
        yield put({ type: actionUser.ACTION.USER_AVATAR_UPDATE_BY_ID_SUCCESS, payload: res.data })
    }else{        
        // console.log('====user upload avatar 4');
        yield put({ type: actionUser.ACTION.USER_AVATAR_UPDATE_BY_ID_FAIL, payload: res.data })
    }
}
function* userUpdate(action:IAction) {
    // console.log('====user update 1');
    var res = yield call(serviceUser.userUpdate, action.payload)
    // console.log('====post get 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        // console.log('====user update 3');
        yield put({ type: actionUser.ACTION.USER_UPDATE_BY_ID_SUCCESS, payload: res.data })
        // yield put({ type: actionUser.ACTION.USER_GET_STATUS})
    }else{        
        // console.log('====user update 4');
        yield put({ type: actionUser.ACTION.USER_UPDATE_BY_ID_FAIL, payload: res.data })
    }
}

function* userChangePassword(action:IAction) {
    // console.log('====user userChangePassword 1');
    var res = yield call(serviceUser.userChangePassword, action.payload)
    // console.log('====post get 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        // console.log('====user userChangePassword 3');
        yield put({ type: actionUser.ACTION.USER_CHANGE_PASSWORD_SUCCESS, payload: res.data })
    }else{        
        // console.log('====user userChangePassword 4');
        yield put({ type: actionUser.ACTION.USER_CHANGE_PASSWORD_FAIL, payload: res.data })
    }
}

function* userResetPassword(action:IAction) {
    // console.log('====user userResetPasswordpdate 1');
    var res = yield call(serviceUser.userResetPassword, action.payload)
    // console.log('====post get 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        // console.log('====user userResetPassword 3');
        yield put({ type: actionUser.ACTION.USER_RESET_PASSWORD_SUCCESS, payload: res.data })
    }else{        
        // console.log('====user userResetPassword 4');
        yield put({ type: actionUser.ACTION.USER_RESET_PASSWORD_FAIL, payload: res.data })
    }
}

function* userResetPasswordNew(action:IAction) {
    // console.log('====user userResetPasswordNew 1');
    var res = yield call(serviceUser.userResetPasswordNew, action.payload)
    // console.log('====post get 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        // console.log('====user userResetPasswordNew 3');
        yield put({ type: actionUser.ACTION.USER_RESET_PASSWORD_NEW_SUCCESS, payload: res.data })
    }else{        
        // console.log('====user userResetPasswordNew 4');
        yield put({ type: actionUser.ACTION.USER_RESET_PASSWORD_NEW_FAIL, payload: res.data })
    }
}



export default function* user() {
    // console.log('====post Sagas 0');
    yield all([
        takeEvery(actionUser.ACTION.USER_RESET_PASSWORD_NEW, userResetPasswordNew),
        takeEvery(actionUser.ACTION.USER_RESET_PASSWORD, userResetPassword),
        takeEvery(actionUser.ACTION.USER_CHANGE_PASSWORD, userChangePassword),
        takeEvery(actionUser.ACTION.USER_AVATAR_UPDATE_BY_ID, userUpdateAvatar),
        takeEvery(actionUser.ACTION.USER_UPDATE_BY_ID, userUpdate),
        takeEvery(actionUser.ACTION.USER_GET_STATUS, userGetStatus),
        takeEvery(actionUser.ACTION.USER_GET_OTHER_INFO, userGetOtherInfo),
        takeEvery(actionUser.ACTION.USER_LOGIN, userLogin),
        takeEvery(actionUser.ACTION.USER_REGISTER, userRegister),
        takeEvery(actionUser.ACTION.USER_LOGOUT, userLogout),
    ])
}




