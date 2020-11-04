import React, { useState } from 'react'
import { PageRound } from '../../component/widget'
import UserList from './list'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { admin as actionAdmin } from 'redux/action'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Dispatch } from 'redux';

const DivPageNav = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // background-color: red;
    `
const StyledInputJump = styled.input`
    // background-color: red;
    width:30px;
`
function page(props: IState2Prop & IDispatch2Prop & IProps & IRouterProp) {

  function handlePageJump(e:any) {
    console.log(e.key)
    console.log(e.target.value)
    if (e.key === 'Enter') {
      props.nav(e.target.value)
      e.target.value = ''
    }
  }

  return (
    <div>
      <DivPageNav>
        {/* <Link to={`${match.url}/add`}><button>add</button></Link> */}
        <PageRound current={props.userPageCurrent} ext={props.userPaginateExt} totalDocs={props.userTotalDocs} pageSize={props.userPageSize} nav={props.nav}></PageRound>
        {props.userTotalDocs / props.userPageSize > 10 ? <StyledInputJump type="text" name="jump" onKeyDown={handlePageJump} /> : null}
        <select onChange={(e) => { props.changePageSize(e.target.value) }} value={'' + props.userPageSize}>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='50'>50</option>
        </select>
      </DivPageNav>
      <UserList></UserList>
    </div>
  );
}
interface IProps extends RouteComponentProps<any>{
  
}
interface IRouterProp {
  history: any,
  match: any,
}
interface IState2Prop {
  words: any,
  user: any,
  userPageSize: number,
  userPageCurrent: number,
  userTotalDocs: number,
  userPaginateExt: number,
}
interface IDispatch2Prop {
  changePageSize: (v:any) => void,
  nav: (v:any) => void,
}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  words: state.locale.words,
  user: state.user,
  userPageSize: state.admin.userPageSize,
  userPageCurrent: state.admin.userPageCurrent,
  userTotalDocs: state.admin.userTotalDocs,
  userPaginateExt: state.admin.userPaginateExt,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  changePageSize: (v) => dispatch(actionAdmin.Creator.userChangePageSize(v)),
  nav: (v) => dispatch(actionAdmin.Creator.userNav(v))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(page)
