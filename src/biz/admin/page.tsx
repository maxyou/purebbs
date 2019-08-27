import React, { useState } from 'react'
import PageRound from './paginate'
import UserList from './list'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { admin as actionAdmin } from '@/redux/action'

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
function page(props) {

  function handlePageJump(e) {
    console.log(e.key)
    console.log(e.target.value)
    if (e.key == 'Enter') {
      props.nav(e.target.value)
      e.target.value = ''
    }
  }

  return (
    <div>
      <DivPageNav>
        {/* <Link to={`${match.url}/add`}><button>add</button></Link> */}
        <PageRound></PageRound>
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

const mapStateToProps = state => ({
  words: state.locale.words,
  user: state.user,
  userPageSize: state.admin.userPageSize,
  // postPageCurrent: state.post.postPageCurrent,
  userTotalDocs: state.admin.userTotalDocs,

})

const mapDispatchToProps = dispatch => ({
  changePageSize: (v) => dispatch(actionAdmin.Creator.userChangePageSize(v)),
  nav: (v) => dispatch(actionAdmin.Creator.userNav(v))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(page)
