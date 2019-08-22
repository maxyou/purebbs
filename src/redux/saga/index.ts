import "regenerator-runtime/runtime";
import { all } from 'redux-saga/effects'
import admin from './admin'
import extend from './extend'
import sys from './sys'
import user from './user'
import post from './post/post'
import detail from './detail/detail'

export default function* rootSaga() {
    yield all([
        extend(),
        sys(),
        admin(),
        user(),
        post(),
        detail(),
    ])
}