const ACTION = {    
    LANGUAGE_SET: 'language_set',
    LANGUAGE_RESET: 'language_reset',
}

module.exports = {
    ACTION,
    Creator:{
        languageSet: (v) => ({ type: ACTION.LANGUAGE_SET, payload: v }),
        languageReset: (v) => ({ type: ACTION.LANGUAGE_RESET, payload: v }),
    }
}
