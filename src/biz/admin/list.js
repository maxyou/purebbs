import React, { Component, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { admin as actionAdmin } from '@/redux/action'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import Card from './card'

const StyledDivList = styled.div`
  margin-top: 1px;
  background-color: white;
`


function useIdAsKey(userListResult) {
  if (userListResult && userListResult.data && userListResult.data.length >= 0) {
    return userListResult.data.map((v) => ({ ...v, key: v._id }))
  }
  // console.log(array)
  return []
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


function userList(props) {

  const { userAdding, userUpdatting, userDeletting, userPageCurrent, userPageSize } = props
  const prevProps = usePrevious({ userAdding, userUpdatting, userDeletting, userPageCurrent, userPageSize })

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
          dataSource.map((v) => <StyledDivList key={v.key}>
            <Card user={v}></Card>
          </StyledDivList>)
        }
    </div>
  )
}

const mapStateToProps = state => ({
  userPageSize: state.admin.userPageSize,
  userPageCurrent: state.admin.userPageCurrent,
  userListResult: state.admin.userListResult,
  userListLoading: state.admin.userListLoading,
  userAdding: state.admin.userAdding,
  userDeletting: state.admin.userDeletting,
  userUpdatting: state.admin.userUpdatting,
})

const mapDispatchToProps = dispatch => ({
  get: (v) => dispatch(actionAdmin.Creator.userGet(v)),
  findByIdAndDelete: (v) => dispatch(actionAdmin.Creator.userFindByIdAndDelete(v)),
  findByIdAndUpdate: (v) => dispatch(actionAdmin.Creator.userFindByIdAndUpdate(v)),
})
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(userList))
