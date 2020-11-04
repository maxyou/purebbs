import { sys as actionSys } from '../action'

interface IState{
  categoryLoading: boolean,
  categoryGetResult:object,
  category:string[]
}

const initState:IState = {
  categoryLoading: false,
  categoryGetResult:{},
  category:[]
}

const getCategory = (result:any) => (result && result.data && result.data.category) || []

export default function sys(state:IState = initState, action:{type:string, payload:any}):IState {
  switch (action.type) {
    case actionSys.ACTION.SYS_CATEGORY_GET:
      console.log('sys category get')
      return { ...state, categoryLoading: true }
    case actionSys.ACTION.SYS_CATEGORY_GET_SUCCESS:
      console.log('sys category get success')
      return { ...state, categoryGetResult: action.payload, category:getCategory(action.payload), categoryLoading: false }
    case actionSys.ACTION.SYS_CATEGORY_GET_FAIL:
      console.log('sys category get success')
      return { ...state, categoryLoading: false }

    default:
      return state
  }
}
