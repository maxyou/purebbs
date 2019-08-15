import React, { useState } from 'react'
import { admin as actionAdmin } from '@/redux/action'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { AvatarImg } from '@/component/user'
import { time } from '@/tool'
const StyledDivCard = styled.div`
    width:100%;
    height:170px;
    // background-color: #c2c456;
    `

function card(props) {

  const gotoEdit = () => {
    props.edit(props.user)
    props.history.push('/admin/edit/')
  }

  return (
    <StyledDivCard>
      <fieldset>
        <legend>{props.user.name}</legend>
        
        <div>{props.words.user_avatar}:<AvatarImg width='35px' src={'user/avatar/' + props.user.avatarFileName} /></div>
        {/* <div>{props.words.user_name}:{props.user.name}</div> */}
        <div>{props.words.user_role}:{props.user.role}</div>
        <div>{props.words.user_email}:{props.user.email}</div>
        <div>{props.words.cmn_created}:{time.fromNow(props.user.created)}</div>
        {props.user.name == 'admin' ? null : <button onClick={gotoEdit}>{props.words.cmn_edit}</button>}
      </fieldset>
    </StyledDivCard>
  );
}


const mapStateToProps = state => ({
  words: state.locale.words,
})

const mapDispatchToProps = dispatch => ({
  edit: (v) => dispatch(actionAdmin.Creator.userEdit(v)),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(card))
