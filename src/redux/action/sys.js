const ACTION = {    
    SYS_CATEGORY_GET: 'sys_category_get',
    SYS_CATEGORY_GET_SUCCESS: 'sys_category_get_success',
    SYS_CATEGORY_GET_FAIL: 'sys_category_get_fail',
}

module.exports = {
    ACTION,
    Creator:{
        categoryGet: (v) => ({ type: ACTION.SYS_CATEGORY_GET, payload: v }),
    }
}
