import React, { useState, useEffect } from 'react';
import { detail as actionDetail } from 'redux/action'
import Post from './post'
import Add from './add'
import Comment from './comment'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Dispatch } from 'redux';

const StyledDivComment = styled.div<{show:boolean}>`
    display:${(props) => props.show ? 'block' : 'none'}
    // background-color:${(props) => props.show ? 'yellow' : 'blue'}
    // margin: 10px;
    // border:2px solid #dede00;
`
function Detail(props:IState2Prop & IDispatch2Prop) {

    useEffect(
        () => {
            return function cleanup() {
                props.detailPostCommentsClear('')
            }
        },[]
    )


    return (

        <div>
            <Post></Post>
            <StyledDivComment show={props.commentListResult && (props.commentListResult.totalDocs > 0)}>
                <Comment></Comment>
            </StyledDivComment>
            {props.user.isLogin ? <Add></Add> : null}
        </div>
    )
}
interface IState2Prop {
    user: any,
    commentListResult: any,
  }
interface IDispatch2Prop {
    detailPostCommentsClear: (v:any) => void,
}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
    user: state.user,
    commentListResult: state.detail.commentListResult,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
    detailPostCommentsClear: (v) => dispatch(actionDetail.Creator.detailPostCommentsClear(v)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail)