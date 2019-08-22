const ACTION : {[index: string]: string} = {
    //post
    POST_ADD: 'post_add',
    POST_ADD_SUCCESS: 'post_add_success',
    POST_ADD_FAIL: 'post_add_fail',

    POST_GET: 'post_get',
    POST_GET_SUCCESS: 'post_get_success',
    POST_GET_FAIL: 'post_get_fail',
    
    POST_DELETE_BY_ID: 'post_delete_one',
    POST_DELETE_SUCCESS: 'post_delete_success',
    POST_DELETE_FAIL: 'post_delete_fail',

    POST_ATTACH_BY_ID: 'post_attach',
    POST_ATTACH_SUCCESS: 'post_attach_success',
    POST_ATTACH_FAIL: 'post_attach_fail',

    POST_NAV: 'post_nav',
    POST_CHANGE_PAGE_SIZE: 'post_change_page_size',
    
    POST_CATEGORY_NAV: 'post_category_nav',
}

const Creator:{[index: string]: {<T>(v:T):{type:string, payload: T}}} = {    
    postNav: (v) => ({ type: ACTION.POST_NAV, payload: v }),
    postChangePageSize: (v) => ({ type: ACTION.POST_CHANGE_PAGE_SIZE, payload: v }),
    postAdd: (v) => ({ type: ACTION.POST_ADD, payload: v }),
    postGet: (v) => ({ type: ACTION.POST_GET, payload: v }),
    postFindByIdAndDelete: (v) => ({ type: ACTION.POST_DELETE_BY_ID, payload: v }),
    postCategoryNav: (v) => ({ type: ACTION.POST_CATEGORY_NAV, payload: v }),
    postFindByIdAndAttach: (v) => ({ type: ACTION.POST_ATTACH_BY_ID, payload: v }),
}
export default {
    ACTION,
    Creator
}
