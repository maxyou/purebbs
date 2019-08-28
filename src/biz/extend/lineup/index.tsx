import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { extend as actionExtend } from '@/redux/action'
import { detail as actionDetail } from '@/redux/action'


const StyledDivSetting = styled.div`
    padding-left: 20px;    
`
const StyledDivColor = styled.div`
    background-color:${props=>{
        // console.log('StyledDivColor')
        // console.log(props)
        // console.log(props.setColor)
        // console.log(props.key)
        // console.log(props.key%2)
        if(props.setColor%2){
            return 'lightblue'
        }else{
            return 'lightgreen'
        }
    }};
`

function usePrevious(value):any {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}


function Lineup(props) {

    const [message, setMessage] = useState('')
    const [anonymous, setAnonymous] = useState(false)


    const { lineupJoinning, lineupQuitting } = props
    const prevProps = usePrevious({ lineupJoinning, lineupQuitting })

    useEffect(
        () => {
            if(prevProps){
                if (
                    (prevProps.lineupJoinning == true && props.lineupJoinning == false)
                    || (prevProps.lineupQuitting == true && props.lineupQuitting == false)
                ) {
                    props.detailPostGet({
                        //   condition: { postId: props.post.postId },
                        //   select: 'postId extend'
                        condition: { postId: props.post.data.postId },
                        select: 'title content postId author authorId avatarFileName commentNum updated created extend anonymous'
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
        if(currentTime > expireTime){
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

        if (props.extendFromServer.hasCtxUser || props.extendFromServer.lineupData.some((v) => { return v._id == props.user._id })) {
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
                            ?<span>
                                <label htmlFor="anonymous">{props.words.ext_choose_anonymous}:</label>
                                <input type="checkbox" id="anonymous" name="anonymous" 
                                    onChange={(e) => setAnonymous(e.target.checked)} checked={anonymous} />
                            </span>
                            :null
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
            <fieldset>
                <legend>{props.words.ext_lineup}</legend>

                    <span>{props.words.cmd_setting}</span>
                    <StyledDivSetting>
                        {/* <span>是否允许匿名:</span><input readOnly type="checkbox" id="anonymous" name="anonymous" checked={props.extendFromServer.addLineup.anonymous} /> */}
                        <span>{props.words.ext_if_allow_anonymous}:{props.extendFromServer.addLineup.anonymous?<span>{props.words.cmn_yes}</span>:<span>{props.words.cmn_no}</span>}</span>
                    </StyledDivSetting>

                    <hr></hr>
                    <span>{props.words.ext_already_lineupped}:</span>
                    <StyledDivSetting>
                        {props.extendFromServer.lineupData.map((v, index) =>
                            <StyledDivColor setColor={index} key={index}>
                            {/* <div> */}
                                {index+1}.{v.name}:{v.message}
                            </StyledDivColor>
                        )}
                    </StyledDivSetting>

                    <div>
                        {JoinQuitButton()}
                    </div>

            </fieldset>

        </div>
    )
}


const mapStateToProps = state => ({
    lineupJoinning: state.extend.lineupJoinning,
    lineupQuitting: state.extend.lineupQuitting,
    extendFromServer: state.extend.extendFromServer,
    post: state.detail.post,
    user: state.user,
    words: state.locale.words,
})

const mapDispatchToProps = dispatch => ({
    extendLineupJoin: (v) => dispatch(actionExtend.Creator.extendLineupJoin(v)),
    extendLineupQuit: (v) => dispatch(actionExtend.Creator.extendLineupQuit(v)),
    detailPostGet: (v) => dispatch(actionDetail.Creator.detailPostGet(v)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lineup)