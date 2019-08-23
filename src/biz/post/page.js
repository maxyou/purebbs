import React, { useState } from 'react'
import PageRound from './paginate'
import PostList from './list'
import { Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { post as actionPost } from '@/redux/action'
import Board from "./board"

const DivPageHead = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    `
const DivPageAdd = styled.div`
  visibility: ${props => props.isLogin ? 'visible' : 'hidden'};
`
const StyledDivPageCrtl = styled.div`
    // background-color: red;
    display:flex;
    justify-content: flex-end;
    align-items: center;
`
const StyledInputJump = styled.input`
    // background-color: red;
    width:30px;
`
const StyledDivCategory = styled.div`
    // background-color: lightgreen;
    padding-top: 10px;
    padding-left: 20px;
    display:flex;
    justify-content: flex-start;
    align-items: flex-end;
`
const StyledSpanCategory = styled.span`
    // background-color: lightyellow;
    // border:2px solid #dede00;
    // border-radius:
    border: ${props=>{
      if(props.selected){
        return '1px solid #00f'
      }else{
        return '0px solid #dede00'
      }
    }};
    margin-right: 20px;
    width: 60px;
    font-size: ${props=>{
      if(props.selected){
        return 'medium'
      }else{
        return 'medium'
      }
    }};
    display:flex;
    justify-content: center;
    align-items: center;
`
const StyledLink = styled(Link)`
  text-decoration:none;
`
function page(props) {

  function handlePageJump(e){
    console.log(e.key)
    console.log(e.target.value)
    if(e.key=='Enter'){
      props.nav(e.target.value)
      e.target.value=''
    }
  }  

  return (
    <div>
      <Board></Board>
      {/* <StyledDivCategory>
          <StyledSpanCategory onClick={()=>props.categoryNav(category.ALL.idStr)} 
            selected={props.category==category.ALL.idStr}><StyledLink to={'#'}>{category.ALL.name}</StyledLink></StyledSpanCategory>
          <StyledSpanCategory onClick={()=>props.categoryNav(category.DEV_WEB.idStr)} 
            selected={props.category==category.DEV_WEB.idStr}><StyledLink to={'#'}>{category.DEV_WEB.name}</StyledLink></StyledSpanCategory>
          <StyledSpanCategory onClick={()=>props.categoryNav(category.DEV_CLIENT.idStr)} 
            selected={props.category==category.DEV_CLIENT.idStr}><StyledLink to={'#'}>{category.DEV_CLIENT.name}</StyledLink></StyledSpanCategory>
          <StyledSpanCategory onClick={()=>props.categoryNav(category.PM.idStr)} 
            selected={props.category==category.PM.idStr}><StyledLink to={'#'}>{category.PM.name}</StyledLink></StyledSpanCategory>
          <StyledSpanCategory onClick={()=>props.categoryNav(category.JOB.idStr)} 
            selected={props.category==category.JOB.idStr}><StyledLink to={'#'}>{category.JOB.name}</StyledLink></StyledSpanCategory>
          <StyledSpanCategory onClick={()=>props.categoryNav(category.OTHER.idStr)} 
            selected={props.category==category.OTHER.idStr}><StyledLink to={'#'}>{category.OTHER.name}</StyledLink></StyledSpanCategory>
      </StyledDivCategory> */}
      <DivPageHead>
        {/* {props.user.isLogin?<Link to={`${props.match.url}/add`}><button>{props.words.cntnt_addPost}</button></Link>:null}         */}
        <DivPageAdd isLogin={props.user.isLogin}><Link to={`${props.match.url}/add`}><button>{props.words.cntnt_addPost}</button></Link></DivPageAdd>
        <StyledDivPageCrtl>
          <PageRound></PageRound>
          {props.postTotalDocs/props.postPageSize>10?<StyledInputJump type="text" name="jump" onKeyDown={handlePageJump} />:null}
          <select onChange={(e) => { props.changePageSize(e.target.value) }} value={'' + props.postPageSize}>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='50'>50</option>
          </select>
        </StyledDivPageCrtl>
      </DivPageHead>
      <PostList></PostList>
    </div>
  );
}

const mapStateToProps = state => ({
  words: state.locale.words,
  user: state.user,
  postPageSize: state.post.postPageSize,
  // postPageCurrent: state.post.postPageCurrent,
  postTotalDocs: state.post.postTotalDocs,
  category: state.post.category,
})

const mapDispatchToProps = dispatch => ({
  changePageSize: (v) => dispatch(actionPost.Creator.postChangePageSize(v)),
  categoryNav: (v) => dispatch(actionPost.Creator.postCategoryNav(v)),
  nav: (v) => dispatch(actionPost.Creator.postNav(v))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(page)
