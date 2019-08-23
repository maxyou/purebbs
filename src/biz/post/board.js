import React, { useState } from 'react'
import { Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { post as actionPost } from '@/redux/action'

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

function board(props) {

  function currentMatch(current, idStr){
    if(current==idStr){
      return true
    }
    if(!current && idStr==props.category[0].idStr){
      return true
    }
    return false
  }  


  return (
    <StyledDivCategory>

    {props.category?props.category.map((v)=>{
        // console.log('in board')
        // console.log(v)
        return (<StyledSpanCategory onClick={()=>props.categoryNav(v.idStr)} selected={currentMatch(props.categoryCurrent,v.idStr)} key={v.idStr}>
            <StyledLink to={'#'}>{v.name}</StyledLink>
        </StyledSpanCategory>)
    }):null}


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
      
    </StyledDivCategory>
  );
}

const mapStateToProps = state => ({
  words: state.locale.words,
  user: state.user,
  category: state.sys.category,
  categoryCurrent: state.post.categoryCurrent,
})

const mapDispatchToProps = dispatch => ({
  categoryNav: (v) => dispatch(actionPost.Creator.postCategoryNav(v)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(board)
