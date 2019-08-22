const ACTION : {[index: string]: string} = {

    EXTEND_ADD_CHOICE_INIT: 'extend_add_choice_init',
    EXTEND_ADD_VOTE_INIT: 'extend_add_vote_init',
    EXTEND_ADD_LINEUP_INIT: 'extend_add_lineup_init',

    EXTEND_ADD_CHOICE_UPDATE: 'extend_add_choice_update',
    EXTEND_ADD_VOTE_UPDATE: 'extend_add_vote_update',
    EXTEND_ADD_LINEUP_UPDATE: 'extend_add_lineup_update',


    EXTEND_LINEUP_JOIN: 'extend_lineup_join',
    EXTEND_LINEUP_JOIN_SUCCESS: 'extend_lineup_join_success',
    EXTEND_LINEUP_JOIN_FAIL: 'extend_lineup_join_fail',

    EXTEND_LINEUP_QUIT: 'extend_lineup_quit',
    EXTEND_LINEUP_QUIT_SUCCESS: 'extend_lineup_quit_success',
    EXTEND_LINEUP_QUIT_FAIL: 'extend_lineup_quit_fail',

    EXTEND_VOTE_JOIN: 'extend_vote_join',
    EXTEND_VOTE_JOIN_SUCCESS: 'extend_vote_join_success',
    EXTEND_VOTE_JOIN_FAIL: 'extend_vote_join_fail',

    EXTEND_VOTE_QUIT: 'extend_vote_quit',
    EXTEND_VOTE_QUIT_SUCCESS: 'extend_vote_quit_success',
    EXTEND_VOTE_QUIT_FAIL: 'extend_vote_quit_fail',

    EXTEND_DATA_GET_SUCCESS: 'extend_data_get_success',
    EXTEND_SERVER_DATA_INIT: 'extend_server_data_init',
}
const Creator:{[index: string]: {<T>(v:T):{type:string, payload: T}}} = {    
    extendAddChoiceInit: (v) => ({ type: ACTION.EXTEND_ADD_CHOICE_INIT, payload: v }),
    extendAddVoteInit: (v) => ({ type: ACTION.EXTEND_ADD_VOTE_INIT, payload: v }),
    extendAddLineupInit: (v) => ({ type: ACTION.EXTEND_ADD_LINEUP_INIT, payload: v }),

    extendAddChoiceUpdate: (v) => ({ type: ACTION.EXTEND_ADD_CHOICE_UPDATE, payload: v }),
    extendAddVoteUpdate: (v) => ({ type: ACTION.EXTEND_ADD_VOTE_UPDATE, payload: v }),
    extendAddLineupUpdate: (v) => ({ type: ACTION.EXTEND_ADD_LINEUP_UPDATE, payload: v }),

    extendLineupJoin: (v) => ({ type: ACTION.EXTEND_LINEUP_JOIN, payload: v }),
    extendLineupQuit: (v) => ({ type: ACTION.EXTEND_LINEUP_QUIT, payload: v }),

    extendVoteJoin: (v) => ({ type: ACTION.EXTEND_VOTE_JOIN, payload: v }),
    extendVoteQuit: (v) => ({ type: ACTION.EXTEND_VOTE_QUIT, payload: v }),

    extendServerDataInit: (v) => ({ type: ACTION.EXTEND_SERVER_DATA_INIT, payload: v }),
}
export default {
    ACTION,
    Creator
}