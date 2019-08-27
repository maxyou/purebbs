import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { extend as actionExtend } from '@/redux/action'
var moment = require('moment');

const StyledInput = styled.input`
    width: 400px;
`


function add(props) {

    // const [ifMulti, setIfMulti] = useState('single')

    useEffect(() => {
        console.log('props.init() in vote add mount')
        props.init()

        return function cleanup() {
            console.log('props.init() in vote add unmount')
            props.init()
        }
    }, [])

    // const [options, setOptions] = useState([''])
    function changeOptions(v, index) {
        var newOptions = props.addVote.options.map((option, position) => {
            if (position == index) {
                return v
            } else {
                return option
            }
        })
        // setOptions(newOptions)
        props.update({ ...props.addVote, options: newOptions })
    }
    function deleteOption(index) {
        if (props.addVote.options.length == 1) {
            props.update({ ...props.addVote, options: [''] })
            return
        }
        var newOptions = props.addVote.options.filter((option, position) => {
            return position != index
        })
        // setOptions(newOptions)
        props.update({ ...props.addVote, options: newOptions })
    }
    function insertOption(index) {
        var newOptions:string[] = []
        props.addVote.options.forEach((option, position) => {
            newOptions.push(option)
            if (index == position) {
                newOptions.push('')
            }
        })
        // setOptions(newOptions)
        props.update({ ...props.addVote, options: newOptions })
    }

    return (
        <div>
            <fieldset>
                <legend>{props.words.ext_setup_vote}</legend>
                <div>
                    <label htmlFor="anonymous">{props.words.ext_allow_anonymous}</label>
                    <input type="checkbox" id="anonymous" name="anonymous"
                        onChange={(e) => props.update({ ...props.addVote, anonymous: e.target.checked })} checked={props.addVote && props.addVote.anonymous ? props.addVote.anonymous : false} />
                </div>

                <div>
                    <span>{props.words.ext_single_multiple}</span>
                    <span onChange={(event:any) => props.update({ ...props.addVote, ifMulti: event.target.value })}>
                        <input type="radio" value="single" name="ifMulti" />{props.words.ext_vote_single}
                            <input type="radio" value="multiple" name="ifMulti" />{props.words.ext_vote_multiple}
                        </span>
                </div>
                <div>
                    <span>{props.words.ext_expire_time}</span>
                    <span onChange={(event:any) => props.update({ ...props.addVote, expireTime: event.target.value })}>
                    {/* <span onChange={event => props.update({ ...props.addVote, expireTime: event.target.value, expireTimeUTC: new Date(event.target.value).getTime() })}> */}
                        {/* <input type="date" name="bday" /> */}
                        <input type="datetime-local" name="bdaytime" ></input>
                        </span>
                </div>
                <hr></hr>
                <span>{props.words.ext_vote_options}</span>
                {
                    props.addVote && props.addVote.options ?
                        props.addVote.options.map((v, index) => {
                            return (<div key={index}>
                                {index + 1}: <StyledInput type="text" name={index} onChange={e => changeOptions(e.target.value, index)} value={v} />
                                <button onClick={() => deleteOption(index)}>{props.words.cmn_delete}</button>
                                <button onClick={() => insertOption(index)}>{props.words.cmn_insert}</button>
                            </div>)
                        })
                        : null
                }
            </fieldset>
            {/* {JSON.stringify(vote)} */}
        </div>
    )
}

const mapStateToProps = state => ({
    words: state.locale.words,
    addVote: state.extend.addVote, //由于addVote相关设置信息要提供给post.add发送到服务器，所以将其提升到redux.extend中
})

const mapDispatchToProps = dispatch => ({
    init: (v) => dispatch(actionExtend.Creator.extendAddVoteInit(v)),
    update: (v) => dispatch(actionExtend.Creator.extendAddVoteUpdate(v)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(add)