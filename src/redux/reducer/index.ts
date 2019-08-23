import {combineReducers} from 'redux'
// import counter from './counter'
import admin from './admin'
import user from './user'
import post from './post/post'
import detail from './detail/detail'
import locale from './locale'
import extend from './extend'
import sys from './sys'
import { user as actionUser } from '../action'

const appReducer = combineReducers({
    admin,
    user,
    post,
    detail,
    locale,
    extend,
    sys,
})

const rootReducer = (state:any, action:any) => {
    //https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
    
    switch (action.type) {
        case actionUser.ACTION.USER_LOGOUT:          
            state = undefined
        default:
            return appReducer(state, action)
      }
  }

export default rootReducer