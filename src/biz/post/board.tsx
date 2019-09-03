import React, { useState } from 'react'
import { Component, useEffect, useRef } from 'react'
import { Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { post as actionPost, sys as actionSys } from '@/redux/action'
import { ICategoryItem } from '@/redux/common'

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
function usePrevious(value): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const board: React.FC<IState2Prop & IDispatch2Prop> = function (props: IState2Prop & IDispatch2Prop) {

  const { category, categoryCurrent } = props
  const prevProps: IState2Prop = usePrevious({ category, categoryCurrent })

  useEffect(
    () => {
      if (
        (!prevProps)
        || (prevProps.category != props.category)
        || (prevProps.categoryCurrent != props.categoryCurrent)
      ) {
        props.categoryGet()
      }
    }, []
  )

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

    </StyledDivCategory>
  );
}
interface IState2Prop {
  user: any,
  words: any,  
  categoryCurrent: string,
  category: ICategoryItem[],
}
interface IDispatch2Prop {
  categoryNav: (v?) => void,
  categoryGet: (v?) => void,
}
const mapStateToProps = state => ({
  words: state.locale.words,
  user: state.user,
  category: state.sys.category,
  categoryCurrent: state.post.categoryCurrent,
})

const mapDispatchToProps = dispatch => ({
  categoryNav: (v) => dispatch(actionPost.Creator.postCategoryNav(v)),
  categoryGet: (v) => dispatch(actionSys.Creator.categoryGet(v)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(board)
