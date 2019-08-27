import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { AvatarImg } from '@/component/user'
import { time } from '@/tool'
const StyledDivCard = styled.div`
    width:100%;
    height:150px;
    // background-color: #c2c456;
    `

 function me(props) {

  const gotoEdit = ()=>{
    // props.edit(props.user)
    props.history.push('/user/me/edit/')
  }

  return (
    <StyledDivCard>
      <AvatarImg width='35px' src={props.user.avatarPath} />      
      <div>{props.words.user_name}: {props.user.name}</div>
      <div>{props.words.user_role}: {props.user.role}</div>
      <div>{props.words.user_email}: {props.user.email}</div>
      <div>{props.words.cmn_created}: {time.fromNow(props.user.created)}</div>
      <button onClick={gotoEdit}> {props.words.cmn_edit}</button>      
    </StyledDivCard>
  );
}


const mapStateToProps = state => ({
  user: state.user,
  words: state.locale.words,
})

const mapDispatchToProps = dispatch => ({
  // edit: (v) => dispatch(actionAdmin.Creator.userEdit(v)),
})

export default withRouter(
  (connect(
      mapStateToProps,
      mapDispatchToProps
  ) as any) (me)
)