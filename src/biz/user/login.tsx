import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { user as actionUser } from '@/redux/action'
import ResetPwd from './resetpwd'

const StyledDivLogin = styled.div`
    // margin: 10px;
    // border:1px solid #dede00;
    // height: 30px;
    // display: flex;
    // flex-wrap: nowrap;
    // justify-content: space-around;
    // background-color: lightblue;
`
const Login = function (props) {

  function handleSubmit(e) {
    console.log('login submit')
    e.preventDefault()
    props.login({ name: name, password: password, code: code })
  }

  useEffect(() => {
    console.log('login useEffect')
    if (props.user.isLogin) {
      console.log('useEffect to redirect to /post')
      props.history.push('/post')
    }
  }, [props.user.isLogin])

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')

  return (
    <StyledDivLogin>
      <fieldset>
        <legend>{props.words.user_login}</legend>

        <form style={{ display: 'inline' }} onSubmit={handleSubmit} method="post">

          <span >{props.words.user_name}: </span>
          <input type="text" name="name" onChange={e => setName(e.target.value)} value={name} /><br />

          <span >{props.words.user_password}: </span>
          <input type="password" name="password" onChange={e => setPassword(e.target.value)} value={password} /><br />

          <span >{props.words.cmn_verifyCode}: </span>
          <input type="text" name="code" onChange={e => setCode(e.target.value)} value={code} /><br />

          <img src="/tool/verify" title="看不清？点击刷新"
            onClick={(e:any) => e.target.src = ('/tool/verify?mt=' + Math.random())} /><br />
          <input type="submit" value={props.words.user_login} />

        </form>

        <div>{props.user && props.user.result && props.user.result.message}</div>

      </fieldset>

      {/* <fieldset>
        <legend>{props.words.user_resetPassword}</legend> */}

        <ResetPwd></ResetPwd>

      {/* </fieldset> */}

    </StyledDivLogin>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  words: state.locale.words,
})

const mapDispatchToProps = dispatch => ({
  login: (v) => dispatch(actionUser.Creator.userLogin(v))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)