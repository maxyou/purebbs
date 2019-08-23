import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { extend as actionExtend } from '@/redux/action'
// import { AddLineup, AddVote } from '@/biz/extend'
import AddLineup from './lineup/add'
import AddVote from './vote/add'


const StyledDivExtendChoose = styled.div`
    // background-color: lightgreen;
    display:flex;
    justify-content: space-between;
    align-items: center;    
`
function switchExtendChoice(choice){
    switch(choice){
        case 'vote': 
            return <AddVote></AddVote>
        case 'lineup': 
            return <AddLineup></AddLineup>
    }

}
function Add(props) {
    
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
                <fieldset>
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
                </fieldset>

                <hr></hr>
                {
                    switchExtendChoice(props.extend.addChoice)
                }

            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    words: state.locale.words,
    extend: state.extend,
})

const mapDispatchToProps = dispatch => ({
    init: (v) => dispatch(actionExtend.Creator.extendAddChoiceInit(v)),
    update: (v) => dispatch(actionExtend.Creator.extendAddChoiceUpdate(v)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Add)