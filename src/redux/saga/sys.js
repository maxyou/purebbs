// import { delay } from 'redux-saga'
// import 'babel-polyfill';
import "regenerator-runtime/runtime";
import { put, takeEvery, all, call } from 'redux-saga/effects'
import {sys as serviceSys} from '@/service'
import {sys as actionSys} from '../action'


function* categoryGet(action) {
    // console.log('====sys categoryGet 1');
    var res = yield call(serviceSys.categoryGet, action.payload)
    // console.log('====sys categoryGet 2'+JSON.stringify(res.data));
    if(res.data.code===0){
        yield put({ type: actionSys.ACTION.SYS_CATEGORY_GET_SUCCESS, payload: res.data })
        // console.log('====sys categoryGet 3');
    }else{        
        yield put({ type: actionSys.ACTION.SYS_CATEGORY_GET_FAIL, payload: res.data })
        // console.log('====sys categoryGet 4');
    }
}


export default function* sys() {
    // console.log('====sys Sagas 0');
    yield all([
        takeEvery(actionSys.ACTION.SYS_CATEGORY_GET, categoryGet),
    ])
}




