const ACTION : {[index: string]: string} = {
    //user
    ADMIN_USER_ADD2: '2',
    ADMIN_USER_ADD: 'admin_user_add',
    ADMIN_USER_ADD_SUCCESS: 'admin_user_add_success',
    ADMIN_USER_ADD_FAIL: 'admin_user_add_fail',

    ADMIN_USER_GET: 'admin_user_get',
    ADMIN_USER_GET_SUCCESS: 'admin_user_get_success',
    ADMIN_USER_GET_FAIL: 'admin_user_get_fail',
    
    ADMIN_USER_DELETE_BY_ID: 'admin_user_delete_one',
    ADMIN_USER_DELETE_SUCCESS: 'admin_user_delete_success',
    ADMIN_USER_DELETE_FAIL: 'admin_user_delete_fail',

    ADMIN_USER_UPDATE_BY_ID: 'admin_user_update_one',
    ADMIN_USER_UPDATE_SUCCESS: 'admin_user_update_success',
    ADMIN_USER_UPDATE_FAIL: 'admin_user_update_fail',

    ADMIN_USER_AVATAR_UPDATE_BY_ID: 'admin_user_avatar_update_one',
    ADMIN_USER_AVATAR_UPDATE_SUCCESS: 'admin_user_avatar_update_success',
    ADMIN_USER_AVATAR_UPDATE_FAIL: 'admin_user_avatar_update_fail',

    ADMIN_USER_NAV: 'admin_user_nav',
    ADMIN_USER_CHANGE_PAGE_SIZE: 'admin_user_change_page_size',

    ADMIN_USER_EDIT: 'admin_user_edit',

}
const Creator:{[index: string]: {<T>(v:T):{type:string, payload: T}}} = {    
    userEdit: (v) => ({ type: ACTION.ADMIN_USER_EDIT, payload: v }),
    userNav: (v) => ({ type: ACTION.ADMIN_USER_NAV, payload: v }),
    userAdd: (v) => ({ type: ACTION.ADMIN_USER_ADD, payload: v }),
    userGet: (v) => ({ type: ACTION.ADMIN_USER_GET, payload: v }),
    userFindByIdAndDelete: (v) => ({ type: ACTION.ADMIN_USER_DELETE_BY_ID, payload: v }),
    userFindByIdAndUpdate: (v) => ({ type: ACTION.ADMIN_USER_UPDATE_BY_ID, payload: v }),
    userAvatarFindByIdAndUpdate: (v) => ({ type: ACTION.ADMIN_USER_AVATAR_UPDATE_BY_ID, payload: v }),
    userChangePageSize: (v) => ({ type: ACTION.ADMIN_USER_CHANGE_PAGE_SIZE, payload: v }),
}
export default {
    ACTION,
    Creator
}
