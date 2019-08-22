const ACTION : {[index: string]: string} = { 
    LANGUAGE_SET: 'language_set',
    LANGUAGE_RESET: 'language_reset',
}

const Creator:{[index: string]: {<T>(v:T):{type:string, payload: T}}} = {    
    languageSet: (v) => ({ type: ACTION.LANGUAGE_SET, payload: v }),
    languageReset: (v) => ({ type: ACTION.LANGUAGE_RESET, payload: v }),
}
export default {
    ACTION,
    Creator
}
