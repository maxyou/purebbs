import React, { useState } from 'react'
import PageRound from './paginate'
import PostList from './list'
import { NavLink, Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { post as actionPost } from 'redux/action'
import Board from "./board"

const DivPageHead = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    `
const DivPageAdd = styled.div<{isLogin:boolean}>`
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
const StyledSpanCategory = styled.span<{selected:boolean}>`
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
const page: React.FC<IState2Prop & IDispatch2Prop & IRouterProp> = function (props: IState2Prop & IDispatch2Prop & IRouterProp) {

  function handlePageJump(e:{target:any, key:string}){
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
interface IRouterProp {
  history: any,
  match: any,
}
interface IState2Prop {
  user: any,
  words: any,
  postPageSize: number,
  postTotalDocs: number,
}
interface IDispatch2Prop {
  changePageSize: (v?:any) => void,
  categoryNav: (v?:any) => void,
  nav: (v:any) => void,
}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  words: state.locale.words,
  user: state.user,
  postPageSize: state.post.postPageSize,
  // postPageCurrent: state.post.postPageCurrent,
  postTotalDocs: state.post.postTotalDocs,
  // category: state.post.category,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  changePageSize: (v) => dispatch(actionPost.Creator.postChangePageSize(v)),
  categoryNav: (v) => dispatch(actionPost.Creator.postCategoryNav(v)),
  nav: (v) => dispatch(actionPost.Creator.postNav(v))
})

export default withRouter(
  (connect(
    mapStateToProps,
    mapDispatchToProps
  ) as any)(page)
)
