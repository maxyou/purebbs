import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { extend as actionExtend } from '@/redux/action'
import { detail as actionDetail } from '@/redux/action'
var moment = require('moment')

const StyledDivSetting = styled.div`
    padding-left: 20px;    
`
const StyledDivOption = styled.div`
    background-color: lightblue;
    padding-left: 20px;   
    // background-color: blue;
    display:flex;
    justify-content: space-between;
    align-items: center;  
`
const StyledDivVoter = styled.div`
    background-color: lightgreen;
    padding-left: 40px;  
`

// const StyledDivOptions = styled.div`
//     padding-left: 20px;   
//     // background-color: blue;
//     display:flex;
//     justify-content: space-between;
//     align-items: center;    
// `

function usePrevious(value): any {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}


function Vote(props) {

    // const [message, setMessage] = useState('')
    const [anonymous, setAnonymous] = useState(false)

    const [singleVote, setSingleVote] = useState(null)
    const [multiVote, setMultiVote] = useState<boolean[]>([])


    const { voteJoinning, voteQuitting } = props
    const prevProps = usePrevious({ voteJoinning, voteQuitting })

    useEffect(
        () => {
            if (prevProps) {
                if (
                    (prevProps.voteJoinning == true && props.voteJoinning == false)
                    || (prevProps.voteQuitting == true && props.voteQuitting == false)
                ) {
                    props.detailPostGet({
                        //   condition: { postId: props.post.postId },
                        //   select: 'postId extend'
                        condition: { postId: props.post.data.postId },
                        select: 'title content postId author authorId avatarFileName commentNum updated created extend anonymous'
                    })
                }
            }
        }, [props.voteJoinning, props.voteQuitting]
    )

    function getVoter(index) {

        console.log('------get voter------')
        console.log(index)

        if (props.extendFromServer && props.extendFromServer.voteData) {
            console.log('------get voter------1')
            var voteData = props.extendFromServer.voteData
            if (voteData[index]) {
                console.log('------get voter------2')

                var voter: string[] = []
                console.log(JSON.stringify(voteData[index]))
                voteData[index].forEach((v) => {
                    voter.push(v.name)
                })

                return voter
            }

        }
    }

    function findMeInVoteData(voteData) {

        if (voteData) {
            return voteData.some(function (item, index, array) {
                if (item) {
                    return item.some(function (itemInner, index, array) {
                        return itemInner._id == props.user._id
                    })
                }
            })
        } else {
            return false
        }

    }

    function JoinQuitButton() {
        console.log('JoinQuitButton')
        // console.log(props.user)

        if (!props.user.isLogin) {
            console.log('not login')
            return null
        }

        // var currentTime = Date.now()
        var currentTime = new Date()
        var expireTime = new Date(props.extendFromServer.addVote.expireTime)
        console.log('---------JoinQuitButton---------compare time--------')
        console.log(currentTime)
        console.log(JSON.stringify(currentTime))
        console.log(expireTime)
        console.log(JSON.stringify(expireTime))
        // if(Date.now() > new Date(props.extendFromServer.addVote.expireTime).getTime()){
        if (currentTime > expireTime) {
            console.log('expired')
            return (
                <div>
                    <hr></hr>
                    <button disabled>{props.words.ext_expired}</button>
                    {/* <span>当前：{JSON.stringify(currentTime.getTime())}，截止时间：{JSON.stringify(expireTime.getTime())}</span><br/> */}
                    <span>{props.words.ext_expire_time}：{expireTime.toString()}</span>
                    {/* <hr></hr>
                    <button onClick={join}>加入投票</button>
                    {props.extendFromServer.addVote.anonymous
                            ?<span>
                                <label htmlFor="anonymous">选择匿名:</label>
                                <input type="checkbox" id="anonymous" name="anonymous" 
                                    onChange={(e) => setAnonymous(e.target.checked)} checked={anonymous} />
                            </span>
                            :null
                        }
                        <button onClick={quit}>取消投票</button> */}
                </div>
            )
        }

        if (props.extendFromServer.hasCtxUser || props.extendFromServer && props.extendFromServer.voteData && findMeInVoteData(props.extendFromServer.voteData)) {
            return (
                <div>
                    <hr></hr>
                    <button onClick={quit}>{props.words.ext_quit_vote}</button>
                </div>
            )
        }

        return (<div>
            <hr></hr>
            <button onClick={join}>{props.words.ext_join_vote}</button>
            {props.extendFromServer.addVote.anonymous
                ? <span>
                    <label htmlFor="anonymous">{props.words.ext_choose_anonymous}:</label>
                    <input type="checkbox" id="anonymous" name="anonymous"
                        onChange={(e) => setAnonymous(e.target.checked)} checked={anonymous} />
                </span>
                : null
            }
        </div>)
    }

    function join() {
        console.log('-------join----------1')

        console.log(props.post)
        props.extendVoteJoin({
            postId: props.post.data.postId,
            _id: props.post.data._id,
            anonymous: anonymous,
            // message: message,
            singleVote: singleVote,
            multiVote: multiVote
        })
        // setMessage('')
        setSingleVote(null)
        setMultiVote([])
    }

    function quit() {
        console.log('-------state.detail.post----------')
        console.log(props.post)
        props.extendVoteQuit({
            postId: props.post.data.postId,
            _id: props.post.data._id,
        })
    }
    function radioChange(v, index, e) {

        if (props.extendFromServer.hasCtxUser || findMeInVoteData(props.extendFromServer.voteData)) {
            return
        }

        console.log('radioChange:')
        console.log(v)
        console.log(index)
        console.log(e.target.checked)

        setSingleVote(index)
    }
    function checkboxChange(v, index, e) {

        if (props.extendFromServer.hasCtxUser || findMeInVoteData(props.extendFromServer.voteData)) {
            return
        }

        console.log('checkboxChange:')
        // console.log(v)
        // console.log(index)
        console.log(e.target.checked)

        var newMultiVote: boolean[] = [...multiVote]
        newMultiVote[index] = e.target.checked

        console.log(multiVote)
        setMultiVote(newMultiVote)
        console.log(multiVote)
        // console.log(multiVote[0])
        // console.log(multiVote[1])
        // console.log(multiVote[2])
        // console.log(multiVote[index]?true:false)

    }
    return (
        <div>
            <fieldset>
                <legend>{props.words.ext_vote}</legend>

                <span>{props.words.cmn_setting}</span>
                <StyledDivSetting>
                    {/* <span>是否允许匿名:</span><input readOnly type="checkbox" id="anonymous" name="anonymous" checked={props.extendFromServer.addVote.anonymous} /> */}
                    <span>{props.words.ext_if_allow_anonymous}:{props.extendFromServer.addVote.anonymous ? <span>{props.words.cmn_yes}</span> : <span>{props.words.cmn_no}</span>}</span>
                    <div>
                        <input readOnly type="radio" value="single" name="ifMulti" checked={props.extendFromServer.addVote.ifMulti == 'single'} />{props.words.ext_vote_single}
                        <input readOnly type="radio" value="multiple" name="ifMulti" checked={props.extendFromServer.addVote.ifMulti == 'multiple'} />{props.words.ext_vote_multiple}
                    </div>
                    <div>
                        {/* <span>截止时间:</span>{new Date(props.extendFromServer.addVote.expireTime)}<br />                             */}
                        <span>{props.words.ext_expire_time}:</span>{props.extendFromServer.addVote.expireTime}
                    </div>
                </StyledDivSetting>

                <hr></hr>
                {
                    props.extendFromServer && props.extendFromServer.addVote ?
                        props.extendFromServer.addVote.options.map((v, index) =>
                            <div key={index}>
                                <div>
                                    <StyledDivOption>
                                        <div>
                                            {index + 1}.{v}
                                        </div>
                                        <div>
                                            {
                                                props.extendFromServer.addVote.ifMulti == 'single'
                                                    ?
                                                    <div>
                                                        <div>
                                                            <input type="radio" value={index} name="single" onChange={(e) => radioChange(v, index, e)} checked={singleVote == index} />
                                                        </div>

                                                    </div>
                                                    :
                                                    <div>
                                                        <div>
                                                            <input type="checkbox" value={index} name="multiple"
                                                                onChange={(e) => checkboxChange(v, index, e)} checked={multiVote[index] ? true : false} />
                                                        </div>

                                                    </div>
                                            }
                                        </div>
                                    </StyledDivOption>
                                </div>
                                <StyledDivVoter>
                                    {JSON.stringify(getVoter(index))}
                                </StyledDivVoter>
                            </div>
                        )
                        : null
                }
                {/* <hr></hr>
                <span>{props.words.ext_already_voted}:</span>
                <StyledDivSetting>
                    {JSON.stringify(props.extendFromServer.voteData)}
                </StyledDivSetting> */}

                <div>
                    {JoinQuitButton()}
                </div>
                {/* <hr></hr>
                {JSON.stringify(singleVote)}                    
                <hr></hr>
                {JSON.stringify(multiVote)}                    
                <hr></hr> */}
            </fieldset>

        </div>
    )
}


const mapStateToProps = state => ({
    voteJoinning: state.extend.voteJoinning,
    voteQuitting: state.extend.voteQuitting,
    extendFromServer: state.extend.extendFromServer,
    post: state.detail.post,
    user: state.user,
    words: state.locale.words,
})

const mapDispatchToProps = dispatch => ({
    extendVoteJoin: (v) => dispatch(actionExtend.Creator.extendVoteJoin(v)),
    extendVoteQuit: (v) => dispatch(actionExtend.Creator.extendVoteQuit(v)),
    detailPostGet: (v) => dispatch(actionDetail.Creator.detailPostGet(v)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Vote)