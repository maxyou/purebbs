import { locale as actionLocale } from '../action'
import en from '@/locale/en-us.js'
import zh from '@/locale/zh-cn.js'

var moment = require('moment');

function mapLanguage(language){
    const code = language.substring(0,2)
    console.log('mapLanguage:'+code)
    switch (code){
        case 'en':
            moment.locale('en-us');                 
            return en
        case 'zh':
            moment.locale('zh-cn');                 
            return zh
    }
}

const initState = {
    language: 'zh',
    words: zh
}
moment.locale('zh-cn')

export default function locale(state = initState, action) {
    
    switch (action.type) {

        case actionLocale.ACTION.LANGUAGE_SET:
            console.log('reducer: after locale set')
            console.log(action.payload)       
            return { ...state, language: action.payload, words: mapLanguage(action.payload)}
        case actionLocale.ACTION.LANGUAGE_RESET:
            console.log('reducer: after locale reset')
            return { ...initState}

        default:
            return state
    }
}
