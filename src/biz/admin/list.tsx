import React, { Component, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { admin as actionAdmin } from 'redux/action'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import { Dispatch } from 'redux';
import Card from './card'

const StyledDivList = styled.div`
  margin-top: 1px;
  background-color: white;
`


function useIdAsKey(userListResult:any) {
  if (userListResult && userListResult.data && userListResult.data.length >= 0) {
    return userListResult.data.map((v:any) => ({ ...v, key: v._id }))
  }
  // console.log(array)
  return []
}

function usePrevious(value:any):any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


const UserList: React.FC<IState2Prop & IDispatch2Prop> = function (props: IState2Prop & IDispatch2Prop) {

  const { userAdding, userUpdatting, userDeletting, userPageCurrent, userPageSize } = props
  const prevProps:IState2Prop = usePrevious({ userAdding, userUpdatting, userDeletting, userPageCurrent, userPageSize })

  useEffect(
    () => {
      if (
        (!prevProps)
        || (prevProps.userAdding == true && props.userAdding == false)
        || (prevProps.userUpdatting == true && props.userUpdatting == false)
        || (prevProps.userDeletting == true && props.userDeletting == false)
        || (prevProps.userPageCurrent != props.userPageCurrent)
        || (prevProps.userPageSize != props.userPageSize)
      ) {
        props.get({
          query: {

          },
          options: {
            offset: props.userPageSize * (props.userPageCurrent - 1),
            limit: props.userPageSize,
            sort: { userId: -1 },
            select: 'name email created role avatarFileName'
          }
        })
      }
    }, [props.userAdding, props.userUpdatting, props.userDeletting, props.userPageCurrent, userPageSize]
  )

  const dataSource = useIdAsKey(props.userListResult)
  // console.log(dataSource)

  return (
    <div>
        {
          dataSource.map((v:any) => <StyledDivList key={v.key}>
            <Card user={v}></Card>
          </StyledDivList>)
        }
    </div>
  )
}


interface IState2Prop {
  userPageSize: number,
  userPageCurrent: number,
  userListResult: object,
  userListLoading: boolean,
  userAdding: boolean,
  userDeletting: boolean,
  userUpdatting: boolean,

}
interface IDispatch2Prop {
  get: (v?:any) => void,
  findByIdAndDelete: (v?:any) => void,
  findByIdAndUpdate: (v:any) => void,
}

const mapStateToProps:{(arg0:any):IState2Prop} = state => ({
  userPageSize: state.admin.userPageSize,
  userPageCurrent: state.admin.userPageCurrent,
  userListResult: state.admin.userListResult,
  userListLoading: state.admin.userListLoading,
  userAdding: state.admin.userAdding,
  userDeletting: state.admin.userDeletting,
  userUpdatting: state.admin.userUpdatting,
})

const mapDispatchToProps:{(dispatch:Dispatch):IDispatch2Prop} = (dispatch:Dispatch) => ({
  get: (v) => dispatch(actionAdmin.Creator.userGet(v)),
  findByIdAndDelete: (v) => dispatch(actionAdmin.Creator.userFindByIdAndDelete(v)),
  findByIdAndUpdate: (v) => dispatch(actionAdmin.Creator.userFindByIdAndUpdate(v)),
})

export default withRouter(
  (connect(
      mapStateToProps,
      mapDispatchToProps
  ) as any) (UserList)
)