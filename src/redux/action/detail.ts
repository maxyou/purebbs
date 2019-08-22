const ACTION : {[index: string]: string} = {
    
    DETAIL_POST_COMMENTS_CLEAR: 'detail_post_comments_clear',

    //detail
    DETAIL_POST_GET: 'detail_post_get',
    DETAIL_POST_GET_SUCCESS: 'detail_post_get_success',
    DETAIL_POST_GET_FAIL: 'detail_post_get_fail',
    
    //comment
    DETAIL_COMMENT_ADD: 'detail_comment_add',
    DETAIL_COMMENT_ADD_SUCCESS: 'detail_comment_add_success',
    DETAIL_COMMENT_ADD_FAIL: 'detail_comment_add_fail',

    DETAIL_COMMENT_GET: 'detail_comment_get',
    DETAIL_COMMENT_GET_SUCCESS: 'detail_comment_get_success',
    DETAIL_COMMENT_GET_FAIL: 'detail_comment_get_fail',

    DETAIL_COMMENT_NAV: 'detail_comment_nav',
    DETAIL_COMMENT_CHANGE_PAGE_SIZE: 'detail_comment_change_page_size',
    
    DETAIL_COMMENT_DELETE_BY_ID: 'detail_comment_delete_one',
    DETAIL_COMMENT_DELETE_SUCCESS: 'detail_comment_delete_success',
    DETAIL_COMMENT_DELETE_FAIL: 'detail_comment_delete_fail',

    DETAIL_COMMENT_UPDATE_BY_ID: 'detail_comment_update_one',
    DETAIL_COMMENT_UPDATE_SUCCESS: 'detail_comment_update_success',
    DETAIL_COMMENT_UPDATE_FAIL: 'detail_comment_update_fail',

    DETAIL_POST_UPDATE_BY_ID: 'detail_post_update_one',
    DETAIL_POST_UPDATE_SUCCESS: 'detail_post_update_success',
    DETAIL_POST_UPDATE_FAIL: 'detail_post_update_fail',

    //置顶点赞等不涉及帖子本身的操作，不修改帖子的update时间
    DETAIL_POST_ATTACH_BY_ID: 'detail_post_attach',
    DETAIL_POST_ATTACH_SUCCESS: 'detail_post_attach_success',
    DETAIL_POST_ATTACH_FAIL: 'detail_post_attach_fail',

    //comment
    DETAIL_COMMENT_ATTACH_BY_ID: 'detail_comment_attach',
    DETAIL_COMMENT_ATTACH_SUCCESS: 'detail_comment_attach_success',
    DETAIL_COMMENT_ATTACH_FAIL: 'detail_comment_attach_fail',
}
const Creator:{[index: string]: {<T>(v:T):{type:string, payload: T}}} = {    
    detailPostCommentsClear: (v) => ({ type: ACTION.DETAIL_POST_COMMENTS_CLEAR, payload: v }),
    detailPostGet: (v) => ({ type: ACTION.DETAIL_POST_GET, payload: v }),
    detailCommentNav: (v) => ({ type: ACTION.DETAIL_COMMENT_NAV, payload: v }),
    detailCommentChangePageSize: (v) => ({ type: ACTION.DETAIL_COMMENT_CHANGE_PAGE_SIZE, payload: v }),
    detailCommentAdd: (v) => ({ type: ACTION.DETAIL_COMMENT_ADD, payload: v }),
    detailCommentDelete: (v) => ({ type: ACTION.DETAIL_COMMENT_DELETE_BY_ID, payload: v }),
    detailCommentUpdate: (v) => ({ type: ACTION.DETAIL_COMMENT_UPDATE_BY_ID, payload: v }),
    detailCommentGet: (v) => ({ type: ACTION.DETAIL_COMMENT_GET, payload: v }),
    detailPostFindByIdAndUpdate: (v) => ({ type: ACTION.DETAIL_POST_UPDATE_BY_ID, payload: v }),
    detailPostFindByIdAndAttach: (v) => ({ type: ACTION.DETAIL_POST_ATTACH_BY_ID, payload: v }),
    detailCommentFindByIdAndAttach: (v) => ({ type: ACTION.DETAIL_COMMENT_ATTACH_BY_ID, payload: v }),
}
export default {
    ACTION,
    Creator
}
