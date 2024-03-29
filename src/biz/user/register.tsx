import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { user as actionUser } from 'redux/action'
import ResetPwd from './resetpwd'
import {FieldSet} from 'component/style'
import { calc } from 'tool'

const appConfig = require('../../config')

const StyledDivLogin = styled.div`
    // margin: 10px;
    // border:1px solid #dede00;
    // height: 30px;
    // display: flex;
    // flex-wrap: nowrap;
    // justify-content: space-around;
    // background-color: lightblue;
`
const Register = function (props: IState2Prop & IDispatch2Prop & IRouterProp) {

  function handleSubmit(e:any) {
    e.preventDefault()
    
    if(password!==passwordAgain){
      setPrompt(props.words.user_inconsist_pwd_twice)
      return
    }else{
      setPrompt('')
    }

    props.register({ name: name, password: password, email:email, code: code })
  }

  useEffect(() => {
    setRandom(Math.random())
  },[])

  useEffect(() => {
    console.log('register useEffect')
    if (props.user.isLogin) {
      console.log('useEffect to redirect to /post')
      props.history.push('/post')
    }
  }, [props.user.isLogin])

  const [random, setRandom] = useState(0)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [prompt, setPrompt] = useState('')

  return (
    <StyledDivLogin>
      <FieldSet.StyledFieldSet>
        <legend>{props.words.user_register}</legend>
        <form style={{ display: 'inline' }} onSubmit={handleSubmit} method="post">
          <div >{props.words.user_name}: </div>
          <input type="text" name="name" onChange={e => setName(e.target.value)} value={name} /><br />
          <div >{props.words.user_password}: </div>
          <input type="password" name="password" onChange={e => setPassword(e.target.value)} value={password} /><br />
          <div >{props.words.user_passwordAgain}: </div>
          <input type="password" name="passwordAgain" onChange={e => setPasswordAgain(e.target.value)} value={passwordAgain} /><br />
          <div >{props.words.user_email}{props.words.user_register_email_optional}: </div>
          <input type="email" name="email" onChange={e => setEmail(e.target.value)} value={email} /><br />
          <div >{props.words.cmn_verifyCode}: </div>
          <input type="text" name="code" onChange={e => setCode(e.target.value)} value={code} /><br />
          <img src={calc.getVerifyPath(random)} title="看不清？点击刷新"
            onClick={(e:any) => e.target.src = (calc.getVerifyPath(Math.random()))} /><br />
          <input type="submit" value={props.words.user_register} />
        </form>
        <div>{prompt}</div>
        <div>{props.user && props.user.result && props.user.result.message}</div>
      </FieldSet.StyledFieldSet>
      <FieldSet.StyledFieldSet>
        <legend>{props.words.user_oauth_login}</legend>

        <a href={`https://github.com/login/oauth/authorize?client_id=${appConfig.oauth_github.client_id}&state=123456&redirect_uri=${appConfig.oauth_github.redirect_uri}`}>
          GitHub
        </a>

      </FieldSet.StyledFieldSet>
      {/* <FieldSet.StyledFieldSet>
        <legend>{props.words.user_resetPassword}</legend>
        <ResetPwd></ResetPwd>
      </FieldSet.StyledFieldSet> */}
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
  register: (v?:any) => void,
}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  user: state.user,
  words: state.locale.words,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  register: (v) => dispatch(actionUser.Creator.userRegister(v))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
