import React, { useState } from 'react'
import { admin as actionAdmin } from 'redux/action'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { AvatarImg } from 'component/user'
import { time } from 'tool'
import { Dispatch } from 'redux';
import {FieldSet} from 'component/style'

const StyledDivCard = styled.div`
    width:100%;
    height:170px;
    // background-color: #c2c456;
    `

const card: React.FC<IState2Prop & IDispatch2Prop & IProps & IRouterProp> = function (props: IState2Prop & IDispatch2Prop & IProps & IRouterProp) {

  const gotoEdit = () => {
    props.edit(props.user)
    props.history.push('/admin/edit/')
  }

  return (
    <StyledDivCard>
      <FieldSet.StyledFieldSet>
        <legend>{props.user.name}</legend>

        <div>{props.words.user_avatar}:<AvatarImg width='35px' src={'user/avatar/' + props.user.avatarFileName} /></div>
        {/* <div>{props.words.user_name}:{props.user.name}</div> */}
        <div>{props.words.user_role}:{props.user.role}</div>
        <div>{props.words.user_email}:{props.user.email}</div>
        <div>{props.words.cmn_created}:{time.fromNow(props.user.created)}</div>
        {props.user.name === 'admin' ? null : <button onClick={gotoEdit}>{props.words.cmn_edit}</button>}
      </FieldSet.StyledFieldSet>
    </StyledDivCard>
  );
}

interface IProps extends RouteComponentProps<any>{
  user: any,
}
interface IRouterProp {
  history: any,
  match: any,
}
interface IState2Prop {
  words: any,
}
interface IDispatch2Prop {
  edit: (v:any) => void,
}

const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  words: state.locale.words,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  edit: (v) => dispatch(actionAdmin.Creator.userEdit(v)),
})


export default withRouter<IProps, any>(
  (connect(
    mapStateToProps,
    mapDispatchToProps
  ) as any)(card)
)