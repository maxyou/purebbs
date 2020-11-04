import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { extend as actionExtend } from 'redux/action'
import { detail as actionDetail } from 'redux/action'
import { AvatarImg, UserTip } from 'component/user';
import { calc, time } from 'tool'
import { Dispatch } from 'redux';
import {FieldSet} from 'component/style'

const SytledSpanUserTipContainer = styled.span`
  position: relative;
  :hover span{
    visibility: visible;
  }

`

const StyledDivSetting = styled.div`
    padding-left: 20px;    
`
const StyledDivColor = styled.div<{setColor:number}>`
    background-color:${props => {
        // console.log('StyledDivColor')
        // console.log(props)
        // console.log(props.setColor)
        // console.log(props.key)
        // console.log(props.key%2)
        if (props.setColor % 2) {
            return 'lightblue'
        } else {
            return 'lightgreen'
        }
    }};
`

function usePrevious(value:any): any {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}


function Lineup(props:IState2Prop & IDispatch2Prop) {

    const [message, setMessage] = useState('')
    const [anonymous, setAnonymous] = useState(false)


    const { lineupJoinning, lineupQuitting } = props
    const prevProps = usePrevious({ lineupJoinning, lineupQuitting })

    useEffect(
        () => {
            if (prevProps) {
                if (
                    (prevProps.lineupJoinning === true && props.lineupJoinning === false)
                    || (prevProps.lineupQuitting === true && props.lineupQuitting === false)
                ) {
                    props.detailPostGet({
                        //   condition: { postId: props.post.postId },
                        //   select: 'postId extend'
                        condition: { postId: props.post.data.postId },
                        select: 'title content postId author authorId avatarFileName commentNum updated created extend anonymous source oauth'
                    })
                }
            }

        }, [props.lineupJoinning, props.lineupQuitting]
    )


    function JoinQuitButton() {
        // console.log('JoinQuitButton')
        // console.log(props.user)

        if (!props.user.isLogin) {
            // console.log('not login')
            return null
        }


        // var currentTime = Date.now()
        var currentTime = new Date()
        var expireTime = new Date(props.extendFromServer.addLineup.expireTime)
        if (currentTime > expireTime) {
            // console.log('expired')
            return (
                <div>
                    <hr></hr>
                    <button disabled>{props.words.ext_expired}</button>
                    {/* <span>当前：{JSON.stringify(currentTime.getTime())}，截止时间：{JSON.stringify(expireTime.getTime())}</span><br/> */}
                    <span>{props.words.ext_expire_time}：{expireTime.toString()}</span>
                    {/* <hr></hr>
                    <button onClick={join}>加入接龙</button>
                    {props.extendFromServer.addLineup.anonymous
                            ?<span>
                                <label htmlFor="anonymous">选择匿名:</label>
                                <input type="checkbox" id="anonymous" name="anonymous" 
                                    onChange={(e) => setAnonymous(e.target.checked)} checked={anonymous} />
                            </span>
                            :null
                        }
                        <button onClick={quit}>取消接龙</button> */}
                </div>
            )
        }

        if (props.extendFromServer.hasCtxUser || props.extendFromServer.lineupData.some((v:any) => { return v._id === props.user._id })) {
            console.log('quit button')
            return (
                <div>
                    <hr></hr>
                    <button onClick={quit}>{props.words.ext_quit_lineup}</button>
                </div>
            )
        } else {
            console.log('join button')
            return (
                <div>
                    <hr></hr>
                    <span>{props.words.ext_lineup_message}</span><input type="text" onChange={e => setMessage(e.target.value)} value={message} />
                    <button onClick={join}>{props.words.ext_join_lineup}</button>

                    {props.extendFromServer.addLineup.anonymous
                        ? <span>
                            <label htmlFor="anonymous">{props.words.ext_choose_anonymous}:</label>
                            <input type="checkbox" id="anonymous" name="anonymous"
                                onChange={(e) => setAnonymous(e.target.checked)} checked={anonymous} />
                        </span>
                        : null
                    }

                </div>
            )
        }

    }

    function join() {
        console.log('-------state.detail.post----------')
        console.log(props.post)
        props.extendLineupJoin({
            postId: props.post.data.postId,
            _id: props.post.data._id,
            anonymous: anonymous,
            message: message
        })
        setMessage('')
    }

    function quit() {
        console.log('-------state.detail.post----------')
        console.log(props.post)
        props.extendLineupQuit({
            postId: props.post.data.postId,
            _id: props.post.data._id,
        })
    }
    return (
        <div>
            <FieldSet.StyledFieldSet>
                <legend>{props.words.ext_lineup}</legend>

                <span>{props.words.cmd_setting}</span>
                <StyledDivSetting>
                    {/* <span>是否允许匿名:</span><input readOnly type="checkbox" id="anonymous" name="anonymous" checked={props.extendFromServer.addLineup.anonymous} /> */}
                    <span>{props.words.ext_if_allow_anonymous}:{props.extendFromServer.addLineup.anonymous ? <span>{props.words.cmn_yes}</span> : <span>{props.words.cmn_no}</span>}</span>
                    <div>
                        <span>{props.words.ext_expire_time}:</span>{props.extendFromServer.addLineup.expireTime}
                    </div>
                </StyledDivSetting>

                <hr></hr>
                <span>{props.words.ext_already_lineupped}:</span>
                <StyledDivSetting>
                    {props.extendFromServer.lineupData.map((v:any, index:number) =>
                        <StyledDivColor setColor={index} key={index}>
                            {index + 1}.
                            <SytledSpanUserTipContainer>
                                <AvatarImg width='30px' radius={'15px'} src={calc.calcAvatarPath(v, v.anonymous, v._id === props.user._id)} />
                                <UserTip
                                    avatarPath={calc.calcAvatarPath(v, false, v._id === props.user._id)}
                                    name={v.name}
                                    intro={v._id === props.user._id ? props.words.cntnt_this_is_me : props.words.cntnt_this_is_anonymous}
                                    topLeft={{ top: '0px', left: '70px' }}
                                ></UserTip>
                            </SytledSpanUserTipContainer>
                            {v.name}: {v.message}
                        </StyledDivColor>
                    )}
                </StyledDivSetting>

                <div>
                    {JoinQuitButton()}
                </div>

            </FieldSet.StyledFieldSet>

        </div>
    )
}

interface IState2Prop {
    user: any,
    words: any,
    post: any,
    extendFromServer:any,
    lineupQuitting:boolean,
    lineupJoinning:boolean
  }
  interface IDispatch2Prop {
    extendLineupJoin: (v?:any) => void,
    extendLineupQuit: (v?:any) => void,
    detailPostGet: (v:any) => void,
  }
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
    lineupJoinning: state.extend.lineupJoinning,
    lineupQuitting: state.extend.lineupQuitting,
    extendFromServer: state.extend.extendFromServer,
    post: state.detail.post,
    user: state.user,
    words: state.locale.words,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
    extendLineupJoin: (v) => dispatch(actionExtend.Creator.extendLineupJoin(v)),
    extendLineupQuit: (v) => dispatch(actionExtend.Creator.extendLineupQuit(v)),
    detailPostGet: (v) => dispatch(actionDetail.Creator.detailPostGet(v)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lineup)