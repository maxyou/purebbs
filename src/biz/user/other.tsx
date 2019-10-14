import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { AvatarImg } from '@/component/user'
import PostList from './postlist'
import { calc, time } from '@/tool'
import { user as actionUser } from '@/redux/action'
import { Dispatch } from 'redux';

const StyledDivCard = styled.div`
    // width:100%;
    // height:150px;
    // background-color: #c2c456;
    `

const other: React.FC<IState2Prop & IDispatch2Prop & IProps & IRouterProp> = function (props: IState2Prop & IDispatch2Prop & IProps & IRouterProp) {

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
      {props.other && props.other.data ?<PostList id={props.other.data._id}></PostList>:null}
      
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
  other: any,
  words: any,
}
interface IDispatch2Prop {
  userOtherInfoGet: (v?) => void,
}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  other: state.user.other,
  words: state.locale.words,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  userOtherInfoGet: (v) => dispatch(actionUser.Creator.userOtherInfoGet(v)),
})


export default withRouter(
  (connect(
      mapStateToProps,
      mapDispatchToProps
  ) as any) (other)
)