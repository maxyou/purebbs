import React, { useState } from 'react'
import { connect } from 'react-redux'
import List from './list'
import PageRound from './paginate'
import styled from 'styled-components'
import { detail as actionDetail } from '@/redux/action'

const StyledDivComment = styled.div`
    margin-top: 10px;
    // background-color: blue;
`
const StyledDivList = styled.div`
    // margin-top: 1px;
    // padding: 1px;
    // background-color: lightgreen;
`
const StyledDivTemp = styled.div`
    margin: 1px;
    padding: 1px;
    // background-color: yellow;
`

const StyledDivPageCrtl = styled.div`
    // background-color: red;
    display:flex;
    justify-content: flex-end;
    align-items: center;
`
const StyledDivPageRound = styled.div`
    // background-color: red;
    display:${(props) => props.show ? 'flex' : 'none'}
    // display:flex;
    justify-content: flex-end;
    align-items: center;
    // margin: 10px;
    // border:2px solid #dede00;
`
const StyledInputJump = styled.input`
    // background-color: red;
    width:30px;
`
function comment(props) {
  
  // const onChange = (e) => { e.target.value}

  if (props.commentListResult && (props.commentListResult.totalDocs > props.commentPageSize)) {
    console.log('yellow')
    console.log(props.commentListResult.data.length)
  } else {
    console.log(props.commentPageSize)
    console.log('blue')
  }

  function handlePageJump(e){
    console.log(e.key)
    console.log(e.target.value)
    if(e.key=='Enter'){
      props.nav(e.target.value)
      e.target.value=''
    }
  }  

  return (
    <StyledDivComment>
      <StyledDivPageCrtl>
        <StyledDivPageRound show={props.commentListResult && (props.commentListResult.totalDocs > props.commentPageSize)}>
          <PageRound></PageRound>
        </StyledDivPageRound>
        {props.commentTotalDocs/props.commentPageSize>10?<StyledInputJump type="text" name="jump" onKeyDown={handlePageJump} />:null}
        {/* <StyledInputJump type="text" name="jump" onKeyDown={handlePageJump} /> */}
        <select onChange={(e) => { props.changePageSize( e.target.value )}} value={''+props.commentPageSize}>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='50'>50</option>          
        </select>
      </StyledDivPageCrtl>
      <StyledDivList>
        {/* <StyledDivTemp>aaa</StyledDivTemp> */}
        <List></List>
      </StyledDivList>
    </StyledDivComment>
  );
}


const mapStateToProps = state => ({
  commentListResult: state.detail.commentListResult,
  commentPageSize: state.detail.commentPageSize,
  commentTotalDocs: state.detail.commentTotalDocs,
})

const mapDispatchToProps = dispatch => ({  
  changePageSize: (v) => dispatch(actionDetail.Creator.detailCommentChangePageSize(v)),
  nav: (v) => dispatch(actionDetail.Creator.detailCommentNav(v))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(comment)