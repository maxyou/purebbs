import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { user as actionUser } from 'redux/action'
import { Dispatch } from 'redux';
import {FieldSet} from 'component/style'

const StyledDivCard = styled.div`
    width:100%;
    // background-color: white;
    `
const StyledDivCrop = styled.div<{display:string}>`
    width: 100%;
    // height: 450px;
    // position: absolute;
    display: ${props => props.display};    
    // background-color: red;
`
const StyledInput = styled.input`
    margin: 10px;
    padding: 10px;
    display: none;
    // background-color: lightblue;
`
function PwdEdit(props: IState2Prop & IDispatch2Prop & IRouterProp) {

  const [oldPwd, setOldPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [newPwdAgain, setNewPwdAgain] = useState('')

  function handleSubmit(e:any) {
    e.preventDefault();
    console.log('handleSubmit + findByIdAndUpdate')
    props.userChangePassword(
      {
        _id: props.user._id,
        name: props.user.name,
        oldPwd: oldPwd,
        newPwd: newPwd,
      }
    )
    console.log('handleSubmit + findByIdAndUpdate---1')
    console.log('handleSubmit + findByIdAndUpdate---2')
    props.history.goBack()
    console.log('handleSubmit + findByIdAndUpdate---3')
  }

  function handleCancel(e:any) {
    e.preventDefault();
    console.log('handleSubmit + props.history.goBack()----1')
    props.history.goBack()
    console.log('handleSubmit + props.history.goBack()----2')
  }

  return (
    <StyledDivCard>
      <FieldSet.StyledFieldSet>
        <legend>{props.words.user_changePassword}</legend>
        <div><form onSubmit={handleSubmit} method="post">
          {props.words.user_oldPwd}: <input type="password" name="oldPwd" onChange={(e) => setOldPwd(e.target.value)} value={oldPwd} /><br />
          {props.words.user_newPwd}: <input type="password" name="newPwd" onChange={(e) => setNewPwd(e.target.value)} value={newPwd} /><br />
          {props.words.user_newPwdAgain}: <input type="password" name="newPwdAgain" onChange={(e) => setNewPwdAgain(e.target.value)} value={newPwdAgain} /><br />
          <input type="submit" value={props.words.cmn_cancel} onClick={handleCancel} />
          <input type="submit" value={props.words.cntnt_submit} />
        </form></div>
      </FieldSet.StyledFieldSet>
    </StyledDivCard>
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
  userChangePassword: (v?:any) => void,
}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  user: state.user,
  words: state.locale.words,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  userChangePassword: (v) => dispatch(actionUser.Creator.userChangePassword(v)),
})

export default withRouter(
  (connect(
      mapStateToProps,
      mapDispatchToProps
  ) as any) (PwdEdit)
)