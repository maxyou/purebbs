const ACTION : {[index: string]: string} = {
    SYS_CATEGORY_GET: 'sys_category_get',
    SYS_CATEGORY_GET_SUCCESS: 'sys_category_get_success',
    SYS_CATEGORY_GET_FAIL: 'sys_category_get_fail',
}

const Creator:{[index: string]: {<T>(v:T):{type:string, payload: T}}} = {    
    categoryGet: (v) => ({ type: ACTION.SYS_CATEGORY_GET, payload: v }),
}
export default {
    ACTION,
    Creator
}
