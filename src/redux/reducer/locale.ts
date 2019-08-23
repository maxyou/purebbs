import { locale as actionLocale } from '../action'
import en from '../../locale/en-us'
import zh from '../../locale/zh-cn'

var moment = require('moment');

function mapLanguage(language:string) {
    const code = language.substring(0, 2)
    console.log('mapLanguage:' + code)
    switch (code) {
        case 'en':
            moment.locale('en-us');
            return en
        case 'zh':
            moment.locale('zh-cn');
            return zh
        default:
            moment.locale('en-us');
            return en
    }
}
interface IState {
    language: string,
    words: object
}
const initState: IState = {
    language: 'zh',
    words: zh
}
moment.locale('zh-cn')

export default function locale(state: IState = initState, action: { type: string, payload: any }): IState {

    switch (action.type) {

        case actionLocale.ACTION.LANGUAGE_SET:
            console.log('reducer: after locale set')
            console.log(action.payload)
            return { ...state, language: action.payload, words: mapLanguage(action.payload) }
        case actionLocale.ACTION.LANGUAGE_RESET:
            console.log('reducer: after locale reset')
            return { ...initState }

        default:
            return state
    }
}
