const ACTION : {[index: string]: string} = {
    
    USER_LOGIN: 'user_login',
    USER_LOGIN_SUCCESS: 'user_login_success',
    USER_LOGIN_FAIL: 'user_login_fail',
    
    USER_LOGOUT: 'user_logout',
    USER_LOGOUT_SUCCESS: 'user_logout_success',
    USER_LOGOUT_FAIL: 'user_logout_fail',
    
    USER_REGISTER: 'user_register',
    USER_REGISTER_SUCCESS: 'user_register_success',
    USER_REGISTER_FAIL: 'user_register_fail',
    
    USER_GET_STATUS: 'user_get_status',
    USER_GET_STATUS_SUCCESS: 'user_get_status_success',    
    USER_GET_STATUS_FAIL: 'user_get_status_fail',

    USER_GET_OTHER_INFO: 'user_get_other_infor',
    USER_GET_OTHER_INFO_SUCCESS: 'user_get_other_infor_success',    
    USER_GET_OTHER_INFO_FAIL: 'user_get_other_infor_fail',

    // USER_UPLOAD_AVATAR: 'user_upload_avatar',
    // USER_UPLOAD_AVATAR_SUCCESS: 'user_upload_avatar_success',
    // USER_UPLOAD_AVATAR_FAIL: 'user_upload_avatar_fail',

    USER_UPDATE_BY_ID: 'user_update_by_id',
    USER_UPDATE_BY_ID_SUCCESS: 'user_update_by_id_success',
    USER_UPDATE_BY_ID_FAIL: 'user_update_by_id_fail',

    USER_AVATAR_UPDATE_BY_ID: 'user_avatar_update_by_id',
    USER_AVATAR_UPDATE_BY_ID_SUCCESS: 'user_avatar_update_by_id_success',
    USER_AVATAR_UPDATE_BY_ID_FAIL: 'user_avatar_update_by_id_fail',

    USER_CHANGE_PASSWORD: 'user_change_password',
    USER_CHANGE_PASSWORD_SUCCESS: 'user_change_password_success',
    USER_CHANGE_PASSWORD_FAIL: 'user_change_password_fail',

    USER_RESET_PASSWORD: 'user_reset_password',
    USER_RESET_PASSWORD_SUCCESS: 'user_reset_password_success',
    USER_RESET_PASSWORD_FAIL: 'user_reset_password_fail',

    USER_RESET_PASSWORD_NEW: 'user_reset_password_new',
    USER_RESET_PASSWORD_NEW_SUCCESS: 'user_reset_password_new_success',
    USER_RESET_PASSWORD_NEW_FAIL: 'user_reset_password_new_fail',

}

const Creator:{[index: string]: {<T>(v:T):{type:string, payload: T}}} = {    
    userFindByIdAndUpdate: (v) => ({ type: ACTION.USER_UPDATE_BY_ID, payload: v }),
    userAvatarFindByIdAndUpdate: (v) => ({ type: ACTION.USER_AVATAR_UPDATE_BY_ID, payload: v }),
    userChangePassword: (v) => ({ type: ACTION.USER_CHANGE_PASSWORD, payload: v }),
    userResetPassword: (v) => ({ type: ACTION.USER_RESET_PASSWORD, payload: v }),
    userResetPasswordNew: (v) => ({ type: ACTION.USER_RESET_PASSWORD_NEW, payload: v }),
    // userUploadAvatar: (v) => ({ type: ACTION.USER_UPLOAD_AVATAR, payload: v }),
    userGetStatus: (v) => ({ type: ACTION.USER_GET_STATUS, payload: v }),
    userOtherInfoGet: (v) => ({ type: ACTION.USER_GET_OTHER_INFO, payload: v }),
    userLogin: (v) => ({ type: ACTION.USER_LOGIN, payload: v }),
    userLogout: (v) => ({ type: ACTION.USER_LOGOUT, payload: v }),
    userRegister: (v) => ({ type: ACTION.USER_REGISTER, payload: v }),
}
export default {
    ACTION,
    Creator
}

