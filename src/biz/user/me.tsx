import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { AvatarImg } from 'component/user'
import { time } from 'tool'
import { sys } from 'tool'
import { Dispatch } from 'redux';
import { user as actionUser } from 'redux/action'
import {FieldSet} from 'component/style'

const StyledDivCard = styled.div`
    width:100%;
    height:150px;
    // background-color: #c2c456;
    `
function usePrevious(value:any): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
const Me: React.FC<IState2Prop & IDispatch2Prop & IProps & IRouterProp> = function (props: IState2Prop & IDispatch2Prop & IProps & IRouterProp) {

  const { userAvatarUpdatting, userUpdatting } = props
  const prevProps: IState2Prop = usePrevious({ userAvatarUpdatting, userUpdatting })

  useEffect(
    () => {
      // console.log('me------------------------')
      // if (prevProps) {
      //   console.log('prevProps.userAvatarUpdatting:')
      //   console.log(prevProps.userAvatarUpdatting)
      // }
      // console.log('props.userAvatarUpdatting:')
      // console.log(props.userAvatarUpdatting)
      // console.log('------------------------me')
      if (prevProps) {
        if(prevProps.userAvatarUpdatting === true && props.userAvatarUpdatting === false){
          sys.reloadPage()
        }
        if(prevProps.userUpdatting === true && props.userUpdatting === false){          
          // console.log('me------------------------')
          // console.log('find userUpdatting from true to false')
          // console.log('------------------------me')
          props.userGetStatus()
        }
      }
    }, [props.userAvatarUpdatting, props.userUpdatting]
  )

  const gotoEdit = () => {
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
      {props.user.source === 'register' ? <button onClick={gotoEdit}> {props.words.cmn_edit}</button> : null}
    </StyledDivCard>
  );
}

interface IProps extends RouteComponentProps<any> {
  user: any,
}
interface IRouterProp {
  history: any,
  match: any,
}
interface IState2Prop {
  user: any,
  words: any,
  userAvatarUpdatting: boolean,
  userUpdatting: boolean,
}
interface IDispatch2Prop {
  userGetStatus: (v?:any) => void,
}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  user: state.user,
  userAvatarUpdatting: state.user.userAvatarUpdatting,
  userUpdatting: state.user.userUpdatting,
  words: state.locale.words,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  userGetStatus: (v) => dispatch(actionUser.Creator.userGetStatus(v)),
})

export default withRouter(
  (connect(
    mapStateToProps,
    mapDispatchToProps
  ) as any)(Me)
)