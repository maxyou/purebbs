import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { user as actionUser } from '@/redux/action'
import { time } from '@/tool'

const StyledDivLogin = styled.div`
    // margin: 10px;
    // border:1px solid #dede00;
    // height: 30px;
    // display: flex;
    // flex-wrap: nowrap;
    // justify-content: space-around;
    // background-color: lightblue;
`
const ResetPasswordNew = function (props) {

  console.log(props)

  function handleSubmit(e) {
    e.preventDefault()

    if (password != passwordAgain) {
      setPrompt(props.words.user_inconsist_pwd_twice)
      return
    } else {
      setPrompt('')
    }

    props.resetPasswordNew({
      // name: name,
      password: password,
      resetPasswordCode: props.match.params.id
    })
  }

  useEffect(() => {
    console.log('register useEffect')

    async function backToHome() {
      await time.delay(3000)
      props.history.push('/post')
    }

    if (props.user.resetPwdNewResult) {

      setMessage(props.user.resetPwdNewResult.message)

      if (props.user.resetPwdNewResult.code == 0) {
        console.log('useEffect to redirect to /post')
        backToHome();
      }
    }

    return function cleanup() {
      props.user.resetPwdNewResult = null
    }
  }, [props.user.resetPwdNewResult])

  const [message, setMessage] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [prompt, setPrompt] = useState('')

  return (
    <StyledDivLogin>
      <fieldset>
        <legend>{props.words.user_resetPassword}</legend>
        <form style={{ display: 'inline' }} onSubmit={handleSubmit} method="post">
          {/* <span>你好:</span><br/> */}
          {props.words.user_newPwd}: <input type="password" name="password" onChange={e => setPassword(e.target.value)} value={password} /><br />
          {props.words.user_newPwdAgain}: <input type="password" name="passwordAgain" onChange={e => setPasswordAgain(e.target.value)} value={passwordAgain} /><br />
          <input type="submit" value={props.words.cntnt_submit} /><br />
        </form>
        <div>{prompt}</div>
        <div>{message}</div>
      </fieldset>
    </StyledDivLogin>
  );
}

const mapStateToProps = state => ({
  words: state.locale.words,
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  resetPasswordNew: (v) => dispatch(actionUser.Creator.userResetPasswordNew(v))
})

export default withRouter(
  (connect(
      mapStateToProps,
      mapDispatchToProps
  ) as any) (ResetPasswordNew)
)