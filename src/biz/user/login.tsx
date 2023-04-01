import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { user as actionUser, post as actionPost, locale as actionLocale, detail as actionDetail } from 'redux/action'
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
const Login = function (props: IState2Prop & IDispatch2Prop & IRouterProp) {

  function handleSubmit(e:any) {
    console.log('login submit')
    e.preventDefault()
    props.login({ name: name, password: password, code: code })
  }

  useEffect(() => {
    setRandom(Math.random())
  },[])

  useEffect(() => {
    console.log('login useEffect')
    if (props.user.isLogin) {

      let setting = props.user.setting
      console.log('setting--------------')
      console.log(setting)
      if(setting.language){
        props.languageSet(setting.language)
      }
      if(setting.postPageSize){
        props.changePageSize(setting.postPageSize)
      }
      if(setting.commentPageSize){
        props.changeCommentPageSize(setting.commentPageSize)
      }
      
      console.log('useEffect to redirect to /post')
      props.history.push('/post')
    }
  }, [props.user.isLogin])

  const [random, setRandom] = useState(0)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')

  return (
    <StyledDivLogin>
      <FieldSet.StyledFieldSet>
        <legend>{props.words.user_login}</legend>

        <form style={{ display: 'inline' }} onSubmit={handleSubmit} method="post">

          <div >{props.words.user_name}: </div>
          <input type="text" name="name" onChange={e => setName(e.target.value)} value={name} /><br />

          <div >{props.words.user_password}: </div>
          <input type="password" name="password" onChange={e => setPassword(e.target.value)} value={password} /><br />

          <div >{props.words.cmn_verifyCode}: </div>
          <input type="text" name="code" onChange={e => setCode(e.target.value)} value={code} /><br />

          <img src={calc.getVerifyPath(random)} title="看不清？点击刷新"
            onClick={(e:any) => e.target.src = (calc.getVerifyPath(Math.random()))} /><br />
          <input type="submit" value={props.words.user_login} />

        </form>

        <div>{props.user && props.user.result && props.user.result.message}</div>

      </FieldSet.StyledFieldSet>
      <FieldSet.StyledFieldSet>
        <legend>{props.words.user_oauth_login}</legend>

        <a href={`https://github.com/login/oauth/authorize?client_id=${appConfig.oauth_github.client_id}&state=123456&redirect_uri=${appConfig.oauth_github.redirect_uri}`}>
          GitHub
        </a>

      </FieldSet.StyledFieldSet>
      {/* <FieldSet.StyledFieldSet>
        <legend>{props.words.user_resetPassword}</legend> */}

        <ResetPwd></ResetPwd>

      {/* </FieldSet.StyledFieldSet> */}

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
  login: (v?:any) => void,
  changePageSize: (v?:any) => void,
  languageSet: (v:any) => void,
  changeCommentPageSize: (v:any) => void,
}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  user: state.user,
  words: state.locale.words,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  login: (v) => dispatch(actionUser.Creator.userLogin(v)),
  changePageSize: (v) => dispatch(actionPost.Creator.postChangePageSize(v)),
  languageSet: (v) => dispatch(actionLocale.Creator.languageSet(v)),
  changeCommentPageSize: (v) => dispatch(actionDetail.Creator.detailCommentChangePageSize(v)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
