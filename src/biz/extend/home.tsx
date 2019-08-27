import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { extend as actionExtend } from '@/redux/action'
// import { AddLineup, AddVote } from '@/biz/extend'
import Lineup from './lineup'
import Vote from './vote'


const StyledDivExtendChoose = styled.div`
    background-color: lightgreen;
    display:flex;
    justify-content: space-between;
    align-items: center;    
`
function switchExtendChoice(choice){
    console.log(choice)
    switch(choice){
        case 'vote':         
            return <Vote></Vote>
        case 'lineup': 
            return <Lineup></Lineup>
    }

}
function Home(props) {    

    useEffect(() => {
        
        return function cleanup() {
          props.extendServerDataInit()
        }
      }, [])

    return (
        <div>
            <div>
                {switchExtendChoice(props.extendFromServer?props.extendFromServer.addChoice:null)}
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    words: state.locale.words,
    extendFromServer: state.extend.extendFromServer,
})

const mapDispatchToProps = dispatch => ({
    extendServerDataInit: (v) => dispatch(actionExtend.Creator.extendServerDataInit(v)),
    init: (v) => dispatch(actionExtend.Creator.extendAddChoiceInit(v)),
    update: (v) => dispatch(actionExtend.Creator.extendAddChoiceUpdate(v)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)