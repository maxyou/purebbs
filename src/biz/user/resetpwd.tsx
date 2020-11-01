import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { withRouter, Link } from 'react-router-dom'
import { user as actionUser } from 'redux/action'
import { time } from 'tool'
import {FieldSet} from 'component/style'

const StyledDivLogin = styled.div`
    // margin: 10px;
    // border:1px solid #dede00;
    // height: 30px;
    // display: flex;
    // flex-wrap: nowrap;
    // justify-content: space-around;
    // background-color: lightblue;
`
const ResetPassword = function (props: IState2Prop & IDispatch2Prop & IRouterProp) {

  function handleSubmit(e:any) {
    e.preventDefault()
    props.resetPassword({ name: name })
  }


  useEffect(() => {
    console.log('register useEffect')

    async function backToHome() {
      await time.delay(5000)
      props.history.push('/post')
    }

    if (props.user.resetPwdResult) {

      setMessage(props.user.resetPwdResult.message)

      if (props.user.resetPwdResult.code == 0) {
        console.log('useEffect to redirect to /post')
        console.log('props.user.resetPwdResult.code == 0')
        backToHome();
      }else if(props.user.resetPwdResult.code == -1){
        console.log('useEffect to redirect to /post')
        console.log(props.user.resetPwdResult.code)        
        console.log('props.user.resetPwdResult.code != 0')
        backToHome();
      }
    }

    return function cleanup() {
      props.user.resetPwdResult = null
    }
  }, [props.user.resetPwdResult])

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  return (
    <StyledDivLogin>
      <FieldSet.StyledFieldSet>
        <legend>{props.words.user_resetPassword}</legend>
        <form style={{ display: 'inline' }} onSubmit={handleSubmit} method="post">
          <span>{props.words.user_name}:</span>
          <input type="text" name="name" onChange={e => setName(e.target.value)} value={name} />
          <input type="submit" value={props.words.user_sendPasswordResetEmail} /><br />
          {/* <span>通过邮箱重置:</span>
        <input type="text" name="email" onChange={e => setEmail(e.target.value)} value={email} />
        <input type="submit" value="向我发送重置邮件" /><br />         */}
        </form>
        {message}
      </FieldSet.StyledFieldSet>
    </StyledDivLogin>
  );
}

interface IRouterProp {
  history: any,
  match: any,
}
interface IState2Prop {
  user: any,
  words: any,
}
interface IDispatch2Prop {
  resetPassword: (v?:any) => void,
}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  words: state.locale.words,
  user: state.user,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  resetPassword: (v) => dispatch(actionUser.Creator.userResetPassword(v))
})

export default withRouter(
  (connect(
      mapStateToProps,
      mapDispatchToProps
  ) as any) (ResetPassword)
)