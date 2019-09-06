import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { AvatarImg } from '@/component/user'
import { calc, time } from '@/tool'
import { user as actionUser } from '@/redux/action'

const StyledDivCard = styled.div`
    // width:100%;
    // height:150px;
    // background-color: #c2c456;
    `

function other(props) {

  console.log(props)

  useEffect(
    () => {
      props.userOtherInfoGet({
        _id: props.match.params.id,
      })
    }, []
  )

  const sendMsg = () => {
    // props.edit(props.user)
    // props.history.push('/user/me/edit/')
  }

  return (
    <StyledDivCard>
      <fieldset>
        <legend>{props.words.user_personalInfo}</legend>
        {props.other.code == 0 ?
          <div>
            <AvatarImg width='35px' src={calc.getAvatarPathFromUser(props.other.data)} />
            <div>{props.words.user_name}: {props.other.data.name}</div>
            <div>{props.words.user_role}: {props.other.data.role}</div>
            {/* <div>{props.words.user_email}:{props.user.email}</div> */}
            <div>{props.words.cmn_created}: {time.fromNow(props.other.data.created)}</div>
            {/* <button onClick={sendMsg}>发送私信</button> */}
          </div>
          : null
        }
      </fieldset>
    </StyledDivCard>
  );
}


const mapStateToProps = state => ({
  other: state.user.other,
  words: state.locale.words,
})

const mapDispatchToProps = dispatch => ({
  userOtherInfoGet: (v) => dispatch(actionUser.Creator.userOtherInfoGet(v)),
})


export default withRouter(
  (connect(
      mapStateToProps,
      mapDispatchToProps
  ) as any) (other)
)