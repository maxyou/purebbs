import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { extend as actionExtend } from 'redux/action'
import { Dispatch } from 'redux';
import {FieldSet} from 'component/style'

function Add(props:IState2Prop & IDispatch2Prop) {

    useEffect(() => {
        console.log('props.init() in lineup add mount')
        props.init()

        return function cleanup() {
            console.log('props.init() in lineup add unmount')
            props.init()
        }
    }, [])

    return (
        <div>
            <FieldSet.StyledFieldSet>
                <legend>{props.words.ext_setup_lineup}</legend>
                <div>
                    <label htmlFor="anonymous">{props.words.ext_allow_anonymous}</label>
                    <input type="checkbox" id="anonymous" name="anonymous"
                        onChange={(e) => props.update({ ...props.addLineup, anonymous: e.target.checked })} checked={props.addLineup && props.addLineup.anonymous ? props.addLineup.anonymous : false} />
                </div>
                <div>
                    <span>{props.words.ext_expire_time}</span>
                    <span onChange={(event:any) => props.update({ ...props.addLineup, expireTime: event.target.value })}>
                        <input type="datetime-local" name="bdaytime" ></input>
                    </span>
                </div>
            </FieldSet.StyledFieldSet>
            {/* {JSON.stringify(lineup)} */}
        </div>
    )
}
interface IState2Prop {
    addLineup: any,
    words: any,
  }
  interface IDispatch2Prop {
    init: (v?:any) => void,
    update: (v?:any) => void,
  }
  const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
    words: state.locale.words,
    addLineup: state.extend.addLineup, //由于addLineup相关设置信息要提供给post.add发送到服务器，所以将其提升到redux.extend中
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
    init: (v) => dispatch(actionExtend.Creator.extendAddLineupInit(v)),
    update: (v) => dispatch(actionExtend.Creator.extendAddLineupUpdate(v)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Add)