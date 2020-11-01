import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { extend as actionExtend } from 'redux/action'
// import { AddLineup, AddVote } from 'biz/extend'
import AddLineup from './lineup/add'
import AddVote from './vote/add'
import { Dispatch } from 'redux';
import {FieldSet} from 'component/style'

const StyledDivExtendChoose = styled.div`
    // background-color: lightgreen;
    display:flex;
    justify-content: space-between;
    align-items: center;    
`
function switchExtendChoice(choice:string){
    switch(choice){
        case 'vote': 
            return <AddVote></AddVote>
        case 'lineup': 
            return <AddLineup></AddLineup>
    }

}
function Add(props:IState2Prop & IDispatch2Prop) {
    
    useEffect(() => {        
        console.log('props.init() in home add mount')
        props.init()
        
        return function cleanup() {
          console.log('props.init() in home add unmount')
          props.init()
        }
      }, [])

    return (
        <div>
            <div>
                <FieldSet.StyledFieldSet>
                    <legend>{props.words.ext_extend}</legend>
                    <StyledDivExtendChoose>
                        <div>
                            <span>{props.words.ext_choose}</span>
                            <select name="choice" onChange={(e) => props.update(e.target.value)} value={props.extend.addChoice}>
                                <option value="">not choose</option>
                                <option value="vote">Vote</option>
                                <option value="lineup">LineUp</option>
                            </select><br />
                        </div>
                        {/* <StyledDivRemove> */}
                        
                        {props.extend.addChoice?<button onClick={(e) => props.update('')}>{props.words.cmn_remove}</button>:null}
                            
                        {/* </StyledDivRemove> */}
                    </StyledDivExtendChoose>
                    <span>{props.extend.addChoice?`${props.words.ext_you_choosed}${props.extend.addChoice}`:null}</span>
                </FieldSet.StyledFieldSet>

                <hr></hr>
                {
                    switchExtendChoice(props.extend.addChoice)
                }

            </div>

        </div>
    )
}
interface IState2Prop {
    user: any,
    words: any,
    extend: any,
  }
  interface IDispatch2Prop {
    init: (v?:any) => void,
    update: (v?:any) => void,
  }
  const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
    user: state.user,
    words: state.locale.words,
    extend: state.extend,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
    init: (v) => dispatch(actionExtend.Creator.extendAddChoiceInit(v)),
    update: (v) => dispatch(actionExtend.Creator.extendAddChoiceUpdate(v)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Add)